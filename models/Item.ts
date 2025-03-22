import {
    Insertable,
    Selectable,
} from 'kysely';

import { z } from 'zod';

export const itemSchema = z.object({
    id: z.string().uuid(),
    shortDescription: z.string().regex(new RegExp('^[\\w\\s\\-]+$')).trim(),
    price: z.string().regex(new RegExp('^\\d+\\.\\d{2}$'))
});

export interface ItemTable extends z.infer<typeof itemSchema>{};

export const newItemSchema = itemSchema.omit({id: true});

export type Item = Selectable<ItemTable>;
export type NewItem = Insertable<ItemTable>;