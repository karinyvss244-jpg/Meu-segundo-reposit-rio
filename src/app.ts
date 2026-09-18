import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import { routes } from './routes';
import { errorHandler } from './middlewares/error.middleware';

const app = express();

app.use(cors());
app.use(express.json());

import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/api-docs.json', (_req, res) => {
  res.json(swaggerSpec);
});

app.use('/api', routes);


app.get('/', (req, res) => {
  res.json({ mensagem: 'Biblioteca_K está no ar!' });
});

app.use(errorHandler);

export { app };