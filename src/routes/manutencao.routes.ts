import { Router } from 'express';
import * as manutencaoController from '../controllers/manutencao.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.use(authMiddleware); 

router.post('/', manutencaoController.registrar);
/**
 * @openapi
 * /api/manutencao:
 *   get:
 *     tags: [Manutenções]
 *     summary: Lista o catálogo de manutencao (rota pública)
 *     parameters:
 *       - name: disponibilidade
 *         in: query
 *         required: false
 *         description: Filtra pelo status do manutencao
 *         schema:
 *           type: string
 *           enum: [Disponivel, emprestado, Manutencao]
 *         example: Disponivel
 *     responses:
 *       200:
 *         description: Lista de manutencao (com a categoria incluída)
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Manutenção'
 */
router.get('/', manutencaoController.listar);

router.patch('/:id/concluir', manutencaoController.concluir);

export default router;