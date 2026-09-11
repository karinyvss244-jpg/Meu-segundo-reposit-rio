import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';

// AppError representa um erro "esperado" da aplicação (regra de negócio violada,
// recurso não encontrado, credenciais inválidas...). Em vez de cada service
// responder diretamente pelo "res" do Express (o que misturaria as camadas), ele
// apenas lança (throw) um AppError com a mensagem e o código HTTP certos.
export class AppError extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode: number = 400) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'AppError';
  }
}

// Middleware de erro do Express: repare que tem EXATAMENTE 4 parâmetros
// (err, req, res, next) — é essa assinatura que o Express usa para reconhecer
// que esta função trata erros, e não uma rota normal.
export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ erro: err.message });
    return;
  }

  
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      res.status(409).json({
        erro: 'Já existe um registo com um valor único em conflito (ex.: CPF, e-mail ou placa duplicados).',
      });
      return;
    }
    if (err.code === 'P2025') {
      res.status(404).json({ erro: 'Registo não encontrado.' });
      return;
    }
  }

  console.error(err);
  res.status(500).json({ erro: 'Erro interno do servidor.' });
}