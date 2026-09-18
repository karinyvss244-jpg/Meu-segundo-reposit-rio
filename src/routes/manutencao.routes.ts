import { Router } from 'express';
import * as manutencaoController from '../controllers/manutencao.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.use(authMiddleware); 

router.post('/', manutencaoController.registrar);
router.get('/', manutencaoController.listar);
router.patch('/:id/concluir', manutencaoController.concluir);

export default router;