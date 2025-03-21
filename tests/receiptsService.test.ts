import { describe, test, before, after, beforeEach } from 'node:test';
import assert from 'node:assert';
import { z } from 'zod';
import { components } from '../receiptsService';
import receipts from "./resources/receipts.json";

describe('Components of receipts service', () => {
    test('processes retailer properly', async () => {
        let retailer = receipts[0].retailer; // 'Target'
        assert.strictEqual(components.processRetailer(retailer), 6);

        retailer = receipts[1].retailer; // 'M&M Corner Market'
        assert.strictEqual(components.processRetailer(retailer), 14);

        retailer = receipts[2].retailer; // 'Walgreens'
        assert.strictEqual(components.processRetailer(retailer), 9);

        retailer = receipts[3].retailer; // 'Target'
        assert.strictEqual(components.processRetailer(retailer), 6);
    });

    test('processes total properly', async () => {
        let total = receipts[0].total; // '35.35'
        assert.strictEqual(components.processTotal(total), 0);

        total = receipts[1].total; // '9.00'
        assert.strictEqual(components.processTotal(total), 75);

        total = receipts[2].total; // '2.65'
        assert.strictEqual(components.processTotal(total), 0);

        total = receipts[3].total; // '1.25'
        assert.strictEqual(components.processTotal(total), 25);
    });

    test('processes items properly', async () => {
        let items = receipts[0].items;
        assert.strictEqual(components.processItems(items), 16);

        items = receipts[1].items;
        assert.strictEqual(components.processItems(items), 10);

        items = receipts[2].items;
        assert.strictEqual(components.processItems(items), 6);

        items = receipts[3].items;
        assert.strictEqual(components.processItems(items), 0);
    });

    test.todo('processes date properly', async () => {});

    test.todo('processes time properly', async () => {});
});