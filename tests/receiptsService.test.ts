import { after, before, describe, test } from 'node:test';
import assert from 'node:assert';
import { components, receiptsService } from '../service/receiptsService';
import receipts from "./resources/receipts.json";
import { db } from '../database';
import { UUID } from 'node:crypto';

describe('Components of receipts service', () => {
    test('process retailer properly', async () => {
        let retailer = receipts[0].retailer; // 'Target'
        assert.strictEqual(components.processRetailer(retailer), 6);

        retailer = receipts[1].retailer; // 'M&M Corner Market'
        assert.strictEqual(components.processRetailer(retailer), 14);

        retailer = receipts[2].retailer; // 'Walgreens'
        assert.strictEqual(components.processRetailer(retailer), 9);

        retailer = receipts[3].retailer; // 'Target'
        assert.strictEqual(components.processRetailer(retailer), 6);
    });

    test('process total properly', async () => {
        let total = receipts[0].total; // '35.35'
        assert.strictEqual(components.processTotal(total), 0);

        total = receipts[1].total; // '9.00'
        assert.strictEqual(components.processTotal(total), 75);

        total = receipts[2].total; // '2.65'
        assert.strictEqual(components.processTotal(total), 0);

        total = receipts[3].total; // '1.25'
        assert.strictEqual(components.processTotal(total), 25);
    });

    test('process items properly', async () => {
        let items = receipts[0].items;
        assert.strictEqual(components.processItems(items), 16);

        items = receipts[1].items;
        assert.strictEqual(components.processItems(items), 10);

        items = receipts[2].items;
        assert.strictEqual(components.processItems(items), 6);

        items = receipts[3].items;
        assert.strictEqual(components.processItems(items), 0);
    });

    test('process date properly', async () => {
        let date = receipts[0].purchaseDate; // '2022-01-01'
        assert.strictEqual(components.processDate(date), 6);

        date = receipts[1].purchaseDate; // '2022-03-20'
        assert.strictEqual(components.processDate(date), 0);

        date = receipts[2].purchaseDate; // '2022-01-02'
        assert.strictEqual(components.processDate(date), 0);

        date = receipts[3].purchaseDate; // '2022-01-02'
        assert.strictEqual(components.processDate(date), 0);
    });

    test('process time properly', async () => {
        let time = receipts[0].purchaseTime; // '13:01'
        assert.strictEqual(components.processTime(time), 0);

        time = receipts[1].purchaseTime; // '14:33'
        assert.strictEqual(components.processTime(time), 10);

        time = receipts[2].purchaseTime; // '08:33'
        assert.strictEqual(components.processTime(time), 0);

        time = receipts[2].purchaseTime; // '13:13'
        assert.strictEqual(components.processTime(time), 0);
    });
});

test('Receipts service processes points from receipt properly', async () => {
    const points = [28, 109, 15, 31];

    for (let i = 0; i < receipts.length; i++) {
        assert.strictEqual(receiptsService.processReceipt(receipts[i]), points[i]);
    }
});

describe('Service functions which interact with repository', () => {

    before(async () => {
        await db.schema.createTable('receipt')
            .ifNotExists()
            .addColumn('id', 'uuid', (col) => col.primaryKey())
            .addColumn('retailer', 'varchar(200)', (col) => col.notNull())
            .addColumn('purchaseDate', 'varchar(10)', (col) => col.notNull())
            .addColumn('purchaseTime', 'varchar(5)', (col) => col.notNull())
            .addColumn('total', 'varchar(5)', (col) => col.notNull())
            .addColumn('points', 'integer', (col) => col.notNull())
            .execute(); 

        await db.schema.createTable('item')
            .ifNotExists()
            .addColumn('id', 'uuid', (col) => col.notNull())
            .addColumn('shortDescription', 'varchar(300)', (col) => col.notNull())
            .addColumn('price', 'varchar(5)', (col) => col.notNull())
            .execute();
    });

    test('save receipt with points and UUID correctly', async () => {
        const points = 28;
        const receipt = receipts[0];

        const response = await receiptsService.saveReceipt(receipt, points);

        assert.notStrictEqual(response, null);
        assert.ok(response?.id);
    });

    test('retrieve points associated with UUID correctly', async () => {
        const points = 109;
        const receipt = receipts[1];

        const idResponse = await receiptsService.saveReceipt(receipt, points);

        if (!idResponse) assert.fail();

        const pointsResponse = await receiptsService.getReceiptPoints(idResponse.id as UUID);

        assert.notStrictEqual(pointsResponse, null);
        assert.strictEqual(pointsResponse?.points, points);
    });

    after(async () => {
        await db.deleteFrom('receipt').execute();
        await db.deleteFrom('item').execute();
        await db.destroy();
    });
});