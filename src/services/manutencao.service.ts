import { prisma } from '../config/prisma';
import { AppError } from '../middlewares/error.middleware';

interface RegistrarManutencaoInput {
  obraId: number;
  descricaoServico: string;
  valorCusto: number;
}


export async function registrarManutencao(dados: RegistrarManutencaoInput) {
  return prisma.$transaction(async (tx) => {
    const obra = await tx.obra.findUnique({ where: { id: dados.obraId} });

    if (!obra) {
      throw new AppError('obra não encontrado.', 404);
    }
    if (obra.statusDisponibilidade === 'Emprestado') {
      throw new AppError('Não é possível registar a manutenção em uma obra que está atualmente emprestasda.', 400);
    }


    await tx.obra.update({
      where: { id: dados.obraId },
      data: { statusDisponibilidade: 'Manutencao' },
    });

    const manutencao = await tx.manutencao.create({
      data: dados,
      include: { obra: true },
    });

    return manutencao;
  });
}

export async function listarManutencoes() {
  return prisma.manutencao.findMany({
    include: { obra: true },
    orderBy: { id: 'desc' },
  });
}


export async function concluirManutencao(id: number) {
  return prisma.$transaction(async (tx) => {
    const manutencao = await tx.manutencao.findUnique({
      where: { id },
      include: { obra: true },
    });

    if (!manutencao) {
      throw new AppError('Registo de manutenção não encontrado.', 404);
    }
    if (manutencao.obra.statusDisponibilidade !== 'Manutencao') {
      throw new AppError('Esta obra não está atualmente em manutenção.', 400);
    }

    const ObraAtualizado = await tx.obra.update({
      where: { id: manutencao.obraId },
      data: { statusDisponibilidade: 'Disponivel' },
    });

    return ObraAtualizado;
  });
}