import { Router } from 'express';
import * as emprestimoController from '../controllers/emprestimo.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.use(authMiddleware);

/**
 * @openapi
 * /api/emprestimo:
 *   post:
 *     tags: [Emprestimo]
 *     summary: Abre uma emprestimo para o cliente autenticado (RN01)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [obraId, dataPrevistaDevolucao]
 *             properties:
 *               obraId: { type: integer, example: 1 }
 *               dataPrevistaDevolucao:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-09-10T12:00:00.000Z"
 *     responses:
 *       201:
 *         description: emprestimo criada; o obra passa a 'emprestado'
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Emprestimo'
 *       400:
 *         description: obra indisponível (RN01) ou data inválida
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespostaErro'
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
router.post('/', emprestimoController.abrir);
router.get('/', emprestimoController.listar);
router.get('/:id', emprestimoController.buscarEmprestimoPorId);

/**
 * @openapi
 * /api/emprestimos/{id}/devolver:
 *   patch:
 *     tags: [Emprestimo]
 *     summary: Devolve o obra e finaliza o contrato (RN02)
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
 *         description: Devolvido; o obra volta a 'Disponivel'
 *       400:
 *         description: emprestimo já finalizada ou cancelada
 *       401:
 *         description: Token ausente, inválido ou expirado
 *       403:
 *         description: A emprestimo pertence a OUTRO cliente
 *       404:
 *         description: emprestimo não encontrada
 */
router.patch('/:id/devolver', emprestimoController.devolver);
router.patch('/:id/cancelar', emprestimoController.cancelar);

export default router;