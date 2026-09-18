import bcrypt from 'bcryptjs';
import { prisma } from '../src/config/prisma';
import process from 'process';

async function main() {
  console.log('Iniciando o seed da base de dados do Biblioteca_k...');

  const romance = await prisma.categoriaObra.create({
    data: { nome: 'romance', descricao: " Histórias centradas em relacionamentos, sentimentos e conflitos amorosos." }
  });
  const fantasia = await prisma.categoriaObra.create({
    data: { nome: 'Fantasia ', descricao: 'Apresenta mundos mágicos, criaturas fantásticas e elementos sobrenaturais.' },
  });
  const terror = await prisma.categoriaObra.create({
    data: { nome: 'terror', descricao: 'Histórias cheias de suspense e medo, destinadas a provocar reações intensas nos leitores.' },
  });
  console.log('Categorias criadas: Romance, Fantasia, Terror.');

  await prisma.obra.createMany({
    data: [
      { categoriaId: romance.id, titulo: 'Amor na Estrada', autor: 'ana souza', anoPublicacao: 2020, isbn: '123-4-567-8900-1', statusDisponibilidade: 'Disponivel' },
      { categoriaId: romance.id, titulo: 'sob o ceú da cidade', autor: 'lucas santana', anoPublicacao: 2019, isbn: '123-4-567-8900-2', statusDisponibilidade: 'Disponivel' },
      { categoriaId: fantasia.id, titulo: 'o reino das sombras', autor: 'lara martins', anoPublicacao: 2023, isbn: '123-4-567-8900-3', statusDisponibilidade: 'Disponivel' },
      { categoriaId: fantasia.id, titulo: 'a lenda do dragão', autor: 'carlos medeiros', anoPublicacao: 2022, isbn: '123-4-567-8900-4', statusDisponibilidade: 'Manutencao' },
      { categoriaId: terror.id, titulo: 'a casa dos sussurros', autor: 'marcos silva', anoPublicacao: 2023, isbn: '123-4-567-8900-5', statusDisponibilidade: 'Disponivel' },
    ],
  });
  console.log('5 obras criadas (4 disponíveis, 1 em manutenção).');

  const senhaHash = await bcrypt.hash('123456', 10);
  await prisma.biblioteca_K.create({
    data: {
      nome: 'Cliente Teste 2',
      email: 'Cliente2@teste.com',
      senha: senhaHash,
      telefone: '11199999999',
    },
  });
  console.log('Cliente de teste criado (email: Cliente2@teste.com, senha: 123456).');

  console.log('Seed concluído com sucesso!');
}

main()
  .catch((erro) => {
    console.error('Erro ao executar o seed:', erro);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });