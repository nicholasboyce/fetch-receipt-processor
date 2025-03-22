import { describe, test } from 'node:test';
import assert from 'node:assert';
import { components, receiptsService } from '../receiptsService';
import receipts from "./resources/receipts.json";

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