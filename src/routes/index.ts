import { Router } from 'express';
import authRoutes from './auth.routes';
import clienteRoutes from './cliente.routes';
import obraRoutes from './obra.routes';
import emprestimoRoutes from './empretimo.routes';
import manutencaoRoutes from './manutencao.routes';

const routes = Router();

routes.use('/auth', authRoutes);
routes.use('/clientes', clienteRoutes);
routes.use('/obra', obraRoutes);
routes.use('/emprestimo', emprestimoRoutes);
routes.use('/manutencoes', manutencaoRoutes);

export { routes };