import {
    Insertable,
    Selectable,
} from 'kysely';

import { z } from 'zod';
import { newItemSchema } from './Item';

export const receiptSchema = z.object({
    id: z.string().uuid(),
    retailer: z.string().regex(new RegExp('^[\\w\\s\\-&]+$')),
    purchaseDate: z.string().date(),
    purchaseTime: z.string().time(), //TBU
    items: z.array(newItemSchema).min(1),
    total: z.string().regex(new RegExp('^\\d+\\.\\d{2}$')),
    points: z.number()
});

export const newReceiptSchema = receiptSchema.omit({ id: true, points: true });
export const dbReceiptSchema = receiptSchema.omit({ items: true });

export interface ReceiptTable extends z.infer<typeof dbReceiptSchema>{};

export type SavedReceipt = Selectable<ReceiptTable>;
export type NewProcessedReceipt = Insertable<ReceiptTable>;