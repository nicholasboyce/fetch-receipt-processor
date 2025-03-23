import { RequestHandler } from 'express-serve-static-core';
import { validatedReceipt } from '../models/Receipt';
import { receiptsService } from '../service/receiptsService';
import { UUID } from 'crypto';

const getReceiptPoints: RequestHandler<{ id: UUID }> = async (req, res) => {
  const id = req.params.id;
  const points = await receiptsService.getReceiptPoints(id);
  points
    ? res.json(points)
    : res.status(404).json({ message: 'No receipt found for that ID.' });
};

const processReceipt: RequestHandler<any, any, validatedReceipt> = async (
  req,
  res,
) => {
  const receipt = req.body;
  const points = receiptsService.processReceipt(receipt);
  const savedData = await receiptsService.saveReceipt(receipt, points);
  savedData
    ? res.json(savedData)
    : res.status(400).json({ message: 'The receipt is invalid.' });
};

export const receiptsController = {
  getReceiptPoints,
  processReceipt,
};
