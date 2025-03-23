import { z } from 'zod';
import { newItemSchema } from './Item';

export const receiptSchema = z.object({
  id: z.string().uuid(),
  retailer: z.string().regex(new RegExp('^[\\w\\s\\-&]+$')),
  purchaseDate: z.string().date(),
  purchaseTime: z.string(), //TBU
  items: z.array(newItemSchema).min(1),
  total: z.string().regex(new RegExp('^\\d+\\.\\d{2}$')),
  points: z.number(),
});

export const receiptReqBodySchema = receiptSchema.omit({
  id: true,
  points: true,
});
export const receiptDBSchema = receiptSchema.omit({ items: true });

export interface validatedReceipt
  extends z.infer<typeof receiptReqBodySchema> {}
export interface ReceiptTable extends z.infer<typeof receiptDBSchema> {}
