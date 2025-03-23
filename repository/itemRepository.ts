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
    console.log(error.name);
    return null;
  }
};

export const itemRepository = {
  saveItems,
};
