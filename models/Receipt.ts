import {
    Insertable,
    Selectable,
} from 'kysely';

import { z } from 'zod';
// import { UUID } from 'crypto';

export const itemSchema = z.object({
    shortDescription: z.string().regex(new RegExp('^[\\w\\s\\-]+$')),
    price: z.string().regex(new RegExp('^\\d+\\.\\d{2}$'))
});

export const receiptSchema = z.object({
    id: z.string().uuid(),
    retailer: z.string().regex(new RegExp('^[\\w\\s\\-&]+$')),
    purchaseDate: z.string().date(),
    purchaseTime: z.string(), //TBU
    items: z.array(itemSchema).min(1),
    total: z.string().regex(new RegExp('^\\d+\\.\\d{2}$'))
});

export const newReceiptSchema = receiptSchema.omit({ id: true });

export interface ReceiptTable extends z.infer<typeof receiptSchema>{};

export type SavedReceipt = Selectable<ReceiptTable>;
export type NewProcessedReceipt = Insertable<ReceiptTable>;