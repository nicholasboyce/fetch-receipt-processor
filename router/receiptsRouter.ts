import { Router } from "express";
import { receiptsController } from "../controller/receiptsController";
import { validateBody } from "../utils/middleware";
import { receiptReqBodySchema } from "../models/Receipt";

const receiptsRouter = Router();

receiptsRouter.get('/:id/points', receiptsController.getReceiptPoints);
receiptsRouter.post('/process', validateBody(receiptReqBodySchema), receiptsController.processReceipt);

export {
    receiptsRouter
};