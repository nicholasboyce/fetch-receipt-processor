import { UUID } from "crypto";
import { db } from "./database";
import { Item } from "./models/Item";

const saveItems = async (items: Item[]) => {
    try {
        return await db.insertInto('item')
            .values(items)
            .returningAll()
            .$assertType<Item>()
            .execute();
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const itemRepository = {
    saveItems
};