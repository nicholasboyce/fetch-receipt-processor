import { Router } from "express";
import { receiptsController } from "./receiptsController";

const receiptsRouter = Router();

receiptsRouter.get('/:id/points', receiptsController.getReceiptPoints);
receiptsRouter.post('/process', receiptsController.processReceipt);

export {
    receiptsRouter
};