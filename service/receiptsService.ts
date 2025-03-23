import { receiptDBSchema, validatedReceipt } from '../models/Receipt';
import { dbItemsSchema, validatedItem } from '../models/Item';
import { receiptsRepository } from '../repository/receiptsRepository';
import { UUID } from 'crypto';
import { itemRepository } from '../repository/itemRepository';


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

const processItems = (items: validatedItem[]) : number => {
    let points = 0;

    points += Math.floor(items.length / 2) * 5;

    for (let i = 0; i < items.length; i++) {
        if (items[i].shortDescription.trim().length % 3 == 0) {
            points += Math.ceil(Number.parseFloat(items[i].price) * 0.2);
        }
    }

    return points;
};

const processDate = (date: string) : number => {
    let points = 0;

    const convertedDate = new Date(date);
    if (convertedDate.getDay() % 2 == 1) {
        points += 6;
    }

    return points;
};

const processTime = (time: string) : number => {
    let points = 0;

    const hours = Number.parseInt(time.slice(0, 3));
    if (13 < hours && hours < 16) {
        points += 10;
    } 

    return points;
};

const processReceipt = (receipt: validatedReceipt) => {
    let points = 0;

    points += processRetailer(receipt.retailer);
    points += processTotal(receipt.total);
    points += processItems(receipt.items);
    points += processDate(receipt.purchaseDate);
    points += processTime(receipt.purchaseTime);

    return points;
};

const saveReceipt = async (receipt: validatedReceipt, points: number) => {
    const id = crypto.randomUUID();
    const parsedReceiptResult = receiptDBSchema.safeParse({id, ...receipt, points}); // make sure obj spreading successful

    const updatedItems = receipt.items.map((curr_item) => ({...curr_item, id}));
    const parsedItemsResult = dbItemsSchema.safeParse(updatedItems);

    if (!parsedReceiptResult.success || !parsedItemsResult.success) {
        return null;
    }

    const savedReceiptID = await receiptsRepository.saveReceipt(parsedReceiptResult.data);
    if (!savedReceiptID) {
        return null;
    }

    const savedItems = await itemRepository.saveItems(parsedItemsResult.data);
    if (!savedItems) {
        return null;
    }

    return savedReceiptID;
};

const getReceiptPoints = async (id : UUID) => {
    const points = await receiptsRepository.getReceiptPoints(id);
    return points;
};

export const receiptsService = {
    processReceipt,
    saveReceipt,
    getReceiptPoints
};

export const components = {
    processRetailer,
    processTotal,
    processItems,
    processDate,
    processTime
};