import { z } from 'zod';
import { newReceiptSchema, itemSchema } from "./models/Receipt";
import { SavedReceipt } from './models/Receipt';

interface newReceipt extends z.infer<typeof newReceiptSchema>{};
interface item extends z.infer<typeof itemSchema>{};

const processRetailer = (retailer: string) : number => {
    let points = 0;

    for (let i = 0; i < retailer.length; i++) {
        let char = retailer.charCodeAt(i);
        let alphanum = (char > 47 && char < 58) // is it 0-9?
        || (char > 64 && char < 91) // is it A-Z?
        || (char > 96 && char < 123); // it it a-z?

        if (alphanum) {
            points += 1; 
        }
    }

    return points;
};

const processTotal = (total: string) : number => {
    let points = 0;
    const convertedTotal = Number.parseFloat(total);

    if (Number.isInteger(convertedTotal)) {
        points += 75;
    } else if (convertedTotal % 0.25 == 0) {
        points += 25;
    }

    return points;
};

const processItems = (items: item[]) : number => {
    let points = 0;

    return points;
};

const processDate = (date: string) : number => {
    let points = 0;

    return points;
};

const processTime = (time: string) : number => {
    let points = 0;

    return points;
};

const processReceipt = async (receipt: newReceipt) => {
    let points = 0;

    points += processRetailer(receipt.retailer);
    points += processTotal(receipt.total);
    points += processItems(receipt.items);
    points += processDate(receipt.purchaseDate);
    points += processTime(receipt.purchaseTime);

    return points;
};

export const receiptsService = {
    processReceipt
};

export const components = {
    processRetailer,
    processTotal,
    processItems,
    processDate,
    processTime
};