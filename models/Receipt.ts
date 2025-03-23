import { z } from 'zod';
import { newItemSchema } from './Item';

const validTime = (input: string) : boolean => {
  let valid = false;
  const hours = Number.parseInt(input.slice(0, 2));
  const mins = Number.parseInt(input.slice(3, 5));

  valid = (input.at(2) == ':') && (0 <= hours && hours <= 23) && (0 <= mins && mins <= 59); 

  return valid;
};

export const receiptSchema = z.object({
  id: z.string().uuid(),
  retailer: z.string().regex(new RegExp('^[\\w\\s\\-&]+$')),
  purchaseDate: z.string().date(),
  purchaseTime: z.string().trim().refine(validTime), 
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
