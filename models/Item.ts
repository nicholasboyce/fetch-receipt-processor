import { z } from 'zod';

export const itemSchema = z.object({
    id: z.string().uuid(),
    shortDescription: z.string().regex(new RegExp('^[\\w\\s\\-]+$')).trim(),
    price: z.string().regex(new RegExp('^\\d+\\.\\d{2}$'))
});

export const newItemSchema = itemSchema.omit({id: true});

export interface ItemTable extends z.infer<typeof itemSchema>{};

export const dbItemsSchema = itemSchema.array().min(1);
export interface dbItems extends z.infer<typeof dbItemsSchema>{};