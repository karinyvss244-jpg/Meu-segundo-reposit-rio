import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../config/prisma';
import { AppError } from '../middlewares/error.middleware';

interface LoginInput {
  email: string;
  senha: string;
}

export async function login(dados: LoginInput) {
  const Biblioteca_K = await prisma.biblioteca_K.findUnique({ where: { email: dados.email } });

  const senhaConfere = await bcrypt.compare(dados.senha, Biblioteca_K?.senha ?? '');

  
  if (!Biblioteca_K || !senhaConfere) {
    throw new AppError('E-mail ou senha inválidos.', 401);
  }

  const token = jwt.sign(
    { id: Biblioteca_K.id, email: Biblioteca_K.email },
    process.env.JWT_SECRET as string,
    { expiresIn: (process.env.JWT_EXPIRES_IN || '1d') as jwt.SignOptions['expiresIn'] }
  );

  return {
    token,
    Biblioteca_K: { id: Biblioteca_K.id, nome: Biblioteca_K.nome, email: Biblioteca_K.email },
  };
}