import { Router } from 'express';
import * as obraController from '../controllers/obra.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', obraController.listar); 
router.get('/:id', obraController.buscarPorId);
router.post('/', authMiddleware, obraController.criar); 
router.put('/:id', authMiddleware, obraController.atualizar); 

export default router;