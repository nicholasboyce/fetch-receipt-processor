import { UUID } from "crypto";
import { db } from "./database";
import { NewProcessedReceipt } from "./models/Receipt";

const saveReceipt = async (receipt: NewProcessedReceipt) : Promise<{id: string} | null> => {
    try {
        return await db.insertInto('receipt')
            .values(receipt)
            .returning('id')
            .executeTakeFirstOrThrow();
    } catch (error) {
        console.log(error);
        return null;
    }
};

const getReceiptPoints = async (id: UUID) : Promise<{points: number} | null> => {
    try {
        return await db.selectFrom('receipt')
            .where('id', '=', id)
            .select('points')
            .executeTakeFirstOrThrow();
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const receiptsRepository = {
    saveReceipt,
    getReceiptPoints
};