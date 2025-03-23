import express from 'express';
import 'express-async-errors';
import { receiptsRouter } from './router/receiptsRouter';
import { db } from './database';
import { up } from './migrations/migrate';
import { requestLogger } from './utils/middleware';

db.connection()
  .execute(async (db) => {
    await up(db);
  })
  .then(() => console.log('Connected to SQLite Database!'));

const app = express();

app.use(express.json());

app.disable('x-powered-by');
app.use(requestLogger);

app.use('/receipts', receiptsRouter);
app.use('*', async (_, res) => {
  res.status(404).send({ message: 'Not found' });
});

export default app;
