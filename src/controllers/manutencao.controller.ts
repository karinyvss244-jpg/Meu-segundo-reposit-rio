import { Request, Response } from 'express';
import * as manutencaoService from '../services/manutencao.service';

export async function registrar(req: Request, res: Response): Promise<void> {
  const { obraId, descricaoServico, valorCusto } = req.body;
  const manutencao = await manutencaoService.registrarManutencao({ obraId, descricaoServico, valorCusto });
  res.status(201).json(manutencao);
}

export async function listar(_req: Request, res: Response): Promise<void> {
  const manutencoes = await manutencaoService.listarManutencoes();
  res.status(200).json(manutencoes);
}

export async function concluir(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  const obra = await manutencaoService.concluirManutencao(id);
  res.status(200).json({ mensagem: 'Manutenção concluída, obra disponível novamente.', obra });
}