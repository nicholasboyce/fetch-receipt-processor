import { UUID } from 'crypto';
import { db } from '../database';
import { ReceiptTable as processedReceipt } from '../models/Receipt';
import { logger } from '../utils/logger';

const saveReceipt = async (
  receipt: processedReceipt,
): Promise<{ id: string } | null> => {
  try {
    return await db
      .insertInto('receipt')
      .values(receipt)
      .returning('id')
      .executeTakeFirstOrThrow();
  } catch (error) {
    if (error instanceof Error) {
      logger.error('Failed to save receipt.');
    }
    return null;
  }
};

const getReceiptPoints = async (
  id: UUID,
): Promise<{ points: number } | null> => {
  try {
    return await db
      .selectFrom('receipt')
      .where('id', '=', id)
      .select('points')
      .executeTakeFirstOrThrow();
  } catch (error) {
    if (error instanceof Error) {
      logger.error('Failed to retrieve points associated with id.');
    }
    return null;
  }
};

export const receiptsRepository = {
  saveReceipt,
  getReceiptPoints,
};
