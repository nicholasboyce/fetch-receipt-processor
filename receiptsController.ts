import { RequestHandler } from "express-serve-static-core";

const getReceiptPoints: RequestHandler = async (req, res) => {
    res.send({message: 'Yay!'});
};

const processReceipt: RequestHandler = async (req, res) => {
    res.send({message: 'Yay!'});
};

export const receiptsController = {
    getReceiptPoints,
    processReceipt
};