import { Router } from 'express';
import * as clienteController from '../controllers/cliente.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
/**
 * @openapi
 * /api/clientes:
 *   post:
 *     tags: [Clientes]
 *     summary: Cadastra um novo cliente (rota pública)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nome, cpf, email, senha, telefone]
 *             properties:
 *               nome: { type: string, example: "Marina Souza" }
 *               email: { type: string, format: email, example: "marina@teste.com" }
 *               senha: { type: string, example: "123456" }
 *               telefone: { type: string, example: "11988887777" }
 *     responses:
 *       201:
 *         description: Cliente criado (sem o campo senha)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cliente'
 *       409:
 *         description: E-mail já cadastrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespostaErro'
 */
router.post('/', clienteController.criar);

router.get('/', authMiddleware, clienteController.listar); 
/**
 * @openapi
 * /api/clientes/{id}:
 *   get:
 *     tags: [Clientes]
 *     summary: Busca um cliente pelo id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: integer }
 *         example: 1
 *     responses:
 *       200:
 *         description: Cliente encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cliente'
 *       401:
 *         description: Token ausente, inválido ou expirado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespostaErro'
 *       404:
 *         description: Cliente não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespostaErro'
 */
router.get('/:id', authMiddleware, clienteController.buscarPorId); 

export default router;