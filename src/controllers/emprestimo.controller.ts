import { Request, Response } from 'express';
import * as emprestimoService from '../services/emprestimo';


export async function abrir(req: Request, res: Response): Promise<void> {
  const clienteId = req.user!.id;
  const { obraId, dataPrevistaDevolucao } = req.body;

  const novaemprestimo = await emprestimoService.abrirempretimo(clienteId, { obraId, dataPrevistaDevolucao });

  res.status(201).json(novaemprestimo);
}

export async function listar(req: Request, res: Response): Promise<void> {
  const clienteId = req.user!.id;
  const emprestimos = await emprestimoService.listarEmprestimosDoCliente(clienteId);
  res.status(200).json(emprestimos);
}

export async function buscarEmprestimoPorId(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  const clienteId = req.user!.id;
  const emprestimo = await emprestimoService.buscarEmprestimoPorId(id, clienteId);
  res.status(200).json(emprestimo);
}

export async function devolver(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  const clienteId = req.user!.id;
  const resultado = await emprestimoService.devolverobra(id, clienteId);
  res.status(200).json({ mensagem: 'Obra devolvida com sucesso.', emprestimo: resultado });
}

export async function cancelar(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  const clienteId = req.user!.id;
  const resultado = await emprestimoService.cancelarempretimo(id, clienteId);
  res.status(200).json({ mensagem: 'Emprestimo cancelado com sucesso.', emprestimo: resultado });
}