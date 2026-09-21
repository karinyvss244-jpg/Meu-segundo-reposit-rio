import { Router } from 'express';
import * as obraController from '../controllers/obra.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

/**
 * @openapi
 * /api/obra:
 *   get:
 *     tags: [Obra]
 *     summary: Lista o catálogo de obra (rota pública)
 *     parameters:
 *       - name: disponibilidade
 *         in: query
 *         required: false
 *         description: Filtra pelo status da obra
 *         schema:
 *           type: string
 *           enum: [Disponivel, Emprestada, Manutencao]
 *         example: Disponivel
 *     responses:
 *       200:
 *         description: Lista de obras (com a categoria incluída)
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Obra'
 */
router.get('/', obraController.listar); 
/**
 * @openapi
 * /api/obra/{id}:
 *   get:
 *     tags: [Obra]
 *     summary: Busca um obra pelo id
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
 *         description: obra encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Obra'
 *       401:
 *         description: Token ausente, inválido ou expirado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespostaErro'
 *       404:
 *         description: obra não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespostaErro'
 */
router.get('/:id', obraController.buscarPorId);
/**
 * @openapi
 * /api/obra:
 *   post:
 *     tags: [Obra]
 *     summary: Cadastra uma nova obra (rota pública)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [id, categoriaId, titulo, autor, isbn, anoPublicacao, statusDisponibilidade]
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 1
 *               categoriaId:
 *                 type: integer
 *                 example: 1
 *               titulo:
 *                 type: string
 *                 example: 'Amor na Estrada'
 *               autor:
 *                 type: string
 *                 example: 'ana souza'
 *               isbn:
 *                 type: string
 *                 example: '123-4-567-8900-1'
 *               anoPublicacao:
 *                 type: integer
 *                 example: 2020
 *               statusDisponibilidade:
 *                 type: string
 *                 example: 'Disponivel'
 *     responses:
 *       201:
 *         description: Obra criada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Obra'
 *       409:
 *         description: E-mail já cadastrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespostaErro'
 */
router.post('/', authMiddleware, obraController.criar);
router.put('/:id', authMiddleware, obraController.atualizar); 

export default router;