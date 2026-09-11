import { Request, Response } from 'express';
import * as clienteService from '../services/cliente.service';

export async function criar(req: Request, res: Response): Promise<void> {
  const { nome, email, senha, telefone } = req.body;

  const Biblioteca_K = await clienteService.criarCliente({ nome, email, senha, telefone });

  res.status(201).json(Biblioteca_K);
}

export async function listar(_req: Request, res: Response): Promise<void> {
  const Biblioteca_K = await clienteService.listarClientes();
  res.status(200).json(Biblioteca_K);
}

export async function buscarPorId(req: Request, res: Response): Promise<void> {
  
  const id = Number(req.params.id);

  const Biblioteca_K = await clienteService.buscarClientePorId(id);

  res.status(200).json(Biblioteca_K);
}