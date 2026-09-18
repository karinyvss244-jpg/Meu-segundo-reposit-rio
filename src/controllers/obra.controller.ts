import { Request, Response } from 'express';
import * as obraService from '../services/obra.service';

export async function criar(req: Request, res: Response): Promise<void> {
  const { categoriaId, titulo, autor, anoPublicacao,  isbn, } = req.body;
  const obraCriada = await obraService.criarObra({ categoriaId, titulo, autor, anoPublicacao, isbn });
  res.status(201).json(obraCriada);
}

export async function listar(req: Request, res: Response): Promise<void> {
  
  const disponibilidade = req.query.disponibilidade as string | undefined;
  const obras = await obraService.listarObras(disponibilidade);
  res.status(200).json(obras);
}

export async function buscarPorId(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  const obra = await obraService.buscarObraPorId(id);
  res.status(200).json(obra);
}

export async function atualizar(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  const obraAtualizada = await obraService.atualizarObra(id, req.body);
  res.status(200).json(obraAtualizada);
}