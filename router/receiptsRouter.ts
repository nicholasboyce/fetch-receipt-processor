import { Router } from 'express';
import { receiptsController } from '../controller/receiptsController';
import { validateBody, validateRouteParams } from '../utils/middleware';
import { receiptReqBodySchema } from '../models/Receipt';
import { z } from 'zod';

const receiptsRouter = Router();

const idParamsSchema = z.object({
  id: z.string().uuid(),
});

receiptsRouter.get(
  '/:id/points',
  validateRouteParams(idParamsSchema),
  receiptsController.getReceiptPoints,
);
receiptsRouter.post(
  '/process',
  validateBody(receiptReqBodySchema),
  receiptsController.processReceipt,
);

export { receiptsRouter };
