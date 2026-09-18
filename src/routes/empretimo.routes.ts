import { Router } from 'express';
import * as emprestimoController from '../controllers/emprestimo.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.use(authMiddleware);

router.post('/', emprestimoController.abrir);
router.get('/', emprestimoController.listar);
router.get('/:id', emprestimoController.buscarEmprestimoPorId);
router.patch('/:id/devolver', emprestimoController.devolver);
router.patch('/:id/cancelar', emprestimoController.cancelar);

export default router;