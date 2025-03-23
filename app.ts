import express from 'express';
import 'express-async-errors';
import session from 'express-session';
import { receiptsRouter } from './router/receiptsRouter';
import config from './utils/config';

const app = express();

app.use(express.json());
app.use(
    session({
        secret: config.SESSION_SECRET,
        saveUninitialized: false,
        resave: false,
        cookie: {
            maxAge: 60000 * 60 * 2
        },
        name: 'sessionId'
    })
);

app.disable('x-powered-by');

app.use('/receipts', receiptsRouter);
app.use('*', async (_, res) => {
    res.status(404).send({ message: 'Not found' });
});

export default app;