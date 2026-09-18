import { prisma } from '../config/prisma';
import { AppError } from '../middlewares/error.middleware';

interface AbrirLocacaoInput {
  obraId: number;
  dataPrevistaDevolucao: string;
}


export async function abrirempretimo(clienteId: number, dados: AbrirLocacaoInput) {
  return prisma.$transaction(async (tx) => {
    const obra = await tx.obra.findUnique({
      where: { id: dados.obraId },
      include: { categoria: true },
    });

    if (!obra) {
      throw new AppError('Obra não encontrada.', 404);
    }

    
    if (obra.statusDisponibilidade !== 'Disponivel') {
      throw new AppError('Esta obra não está disponível para locação no momento.', 400);
    }

    const dataRetirada = new Date();
    const dataPrevistaDevolucao = new Date(dados.dataPrevistaDevolucao);

    if (
      Number.isNaN(dataPrevistaDevolucao.getTime()) ||
      dataPrevistaDevolucao <= dataRetirada
    ) {
      throw new AppError('A data prevista de devolução deve ser uma data válida e futura.', 400);
    }

    const MS_POR_DIA = 0.50;
    const dias = Math.max(
      1,
      Math.ceil((dataPrevistaDevolucao.getTime() - dataRetirada.getTime()) / MS_POR_DIA)
    );
    const valorTotal = dias;

    
    await tx.obra.update({
      where: { id: obra.id },
      data: { statusDisponibilidade: 'Emprestado' },
    });

    const emprestimo = await tx.emprestimo.create({
      data: {
        clienteId,
        obraId: obra.id,
        dataRetirada,
        dataPrevistaDevolucao,
        valorTotal,
        statusContrato: 'Ativo',
      },
      include: { obra: { include: { categoria: true } } },
    });

    return emprestimo;
  });
}

export async function listarEmprestimosDoCliente(clienteId: number) {
  return prisma.emprestimo.findMany({
    where: { clienteId },
    include: { obra: { include: { categoria: true } } },
    orderBy: { id: 'desc' },
  });
}

export async function buscarEmprestimoPorId(id: number, clienteId: number) {
  const emprestimo = await prisma.emprestimo.findUnique({
    where: { id },
    include: { obra: { include: { categoria: true } } },
  });

  if (!emprestimo) {
    throw new AppError('Empréstimo não encontrada.', 404);
  }

  // 401 = "não sei quem você é" (tratado no authMiddleware, antes de chegar aqui).
  // 403 = "sei quem você é, mas não pode acessar ESTE recurso" — é o caso aqui.
  if (emprestimo.clienteId !== clienteId) {
    throw new AppError('Este empréstimo não pertence ao cliente autenticado.', 403);
  }

  return emprestimo;
}

// RN02 — Registra a devolução, finaliza o contrato e libera o veículo.
export async function devolverobra(id: number, clienteId: number) {
  return prisma.$transaction(async (tx) => {
    const emprestimo = await tx.emprestimo.findUnique({ where: { id } });

    if (!emprestimo) {
      throw new AppError('Empréstimo não encontrado.', 404);
    }
    if (emprestimo.clienteId !== clienteId) {
      throw new AppError('Este empréstimo não pertence ao cliente autenticado.', 403);
    }
    if (emprestimo.statusContrato !== 'Ativo') {
      throw new AppError('Este empréstimo já foi finalizado ou cancelado, não é possível devolvê-lo novamente.', 400);
    }

    await tx.obra.update({
      where: { id: emprestimo.obraId },
      data: { statusDisponibilidade: 'Disponivel' },
    });

    const emprestimoAtualizado = await tx.emprestimo.update({
      where: { id },
      data: { dataDevolucaoReal: new Date(), statusContrato: 'Finalizado' },
      include: { obra: { include: { categoria: true } } },
    });

    return emprestimoAtualizado;
  });
}


export async function cancelarempretimo(id: number, clienteId: number) {
  return prisma.$transaction(async (tx) => {
    const emprestimo = await tx.emprestimo.findUnique({ where: { id } });

    if (!emprestimo) {
      throw new AppError('Empréstimo não encontrado.', 404);
    }
    if (emprestimo.clienteId !== clienteId) {
      throw new AppError('Este empréstimo não pertence ao cliente autenticado.', 403);
    }
    if (emprestimo.statusContrato !== 'Ativo') {
      throw new AppError('Este empréstimo não pode mais ser cancelado.', 400);
    }

    await tx.obra.update({
      where: { id: emprestimo.obraId },
      data: { statusDisponibilidade: 'Disponivel' },
    });

    const emprestimoAtualizado = await tx.emprestimo.update({
      where: { id },
      data: { statusContrato: 'Cancelado' },
      include: { obra: { include: { categoria: true } } },
    });

    return emprestimoAtualizado ;
  });
}