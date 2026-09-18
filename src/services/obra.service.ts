import { prisma } from '../config/prisma';
import { AppError } from '../middlewares/error.middleware';

interface CriarObraInput {
    categoriaId: number;
    titulo: string;
    autor: string;
    anoPublicacao: number;
    isbn: string
}

interface AtualizarObraInput {
    categoriaId?: number;
    titulo?: string;
    autor?: string;
    anoPublicacao?: number;
    isbn?: string;
    statusDisponibilidade?: string;
}

export async function criarObra(dados: CriarObraInput) {

    const categoria = await prisma.categoriaObra.findUnique({
        where: { id: dados.categoriaId },
    });

    if (!categoria) {
        throw new AppError('Categoria de obra não encontrada.', 404);
    }


    const obra = await prisma.obra.create({
        data: dados,
        include: { categoria: true },
    });

    return obra;
}

export async function listarObras(statusDisponibilidade?: string) {

    return prisma.obra.findMany({
        where: statusDisponibilidade ? { statusDisponibilidade } : undefined,
        include: { categoria: true },
        orderBy: { id: 'asc' },
    });
}

export async function buscarObraPorId(id: number) {
    const obra = await prisma.obra.findUnique({
        where: { id },
        include: { categoria: true },
    });

    if (!obra) {
        throw new AppError('Obra não encontrada.', 404);
    }

    return obra;
}

export async function atualizarObra(id: number, dados: AtualizarObraInput) {

    await buscarObraPorId(id);

    return prisma.obra.update({
        where: { id },
        data: dados,
        include: { categoria: true },
    });
}