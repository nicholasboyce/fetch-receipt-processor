import { Router } from "express";
import { receiptsController } from "./receiptsController";
import { validateBody } from "./utils/middleware";
import { newReceiptSchema } from "./models/Receipt";

const receiptsRouter = Router();

receiptsRouter.get('/:id/points', receiptsController.getReceiptPoints);
receiptsRouter.post('/process', validateBody(newReceiptSchema), receiptsController.processReceipt);

export {
    receiptsRouter
};