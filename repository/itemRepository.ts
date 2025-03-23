import { db } from '../database';
import { dbItems, ItemTable as dbItem } from '../models/Item';

const saveItems = async (items: dbItems) => {
  try {
    return await db
      .insertInto('item')
      .values(items)
      .returningAll()
      .$assertType<dbItem>()
      .execute();
  } catch (error) {
    if (error instanceof Error) {
      console.log('Failed to save items.');
    }
    return null;
  }
};

export const itemRepository = {
  saveItems,
};
