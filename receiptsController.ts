import { RequestHandler } from "express-serve-static-core";
import { newReceiptSchema } from "./models/Receipt";
import { z } from "zod";
import { receiptsService } from "./receiptsService";

interface newReceiptRequest extends z.infer<typeof newReceiptSchema>{};

const getReceiptPoints: RequestHandler = async (req, res) => {
    res.send({message: 'Yay!'});
};

const processReceipt: RequestHandler<any, any, newReceiptRequest> = async (req, res) => {
    const receipt = req.body;
    const points = receiptsService.processReceipt(receipt);

    res.json({ points });
};

export const receiptsController = {
    getReceiptPoints,
    processReceipt
};