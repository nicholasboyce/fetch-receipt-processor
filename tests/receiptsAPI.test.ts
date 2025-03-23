import supertest from "supertest";
import { after, before, describe, test } from 'node:test';
import assert from 'node:assert';
import receipts from "./resources/receipts.json";
import app from "../app";
import { db } from "../database";
import { z } from "zod";

const api = supertest(app);

describe('API returns', () => {

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

    test('200 status code and the ID assigned to the submitted receipt after successful POST request', async () => {
        const receipt = receipts[0];

        const response = await api
            .post('/receipts/process')
            .send(receipt)
            .expect(200)
            .expect('Content-Type', /application\/json/);

        const data = response.body;

        assert.ok(data.id);
        assert.ok(z.string().uuid().safeParse(data.id).success);
    });

    test('400 status code and message property says "The receipt is invalid." after failed POST request', async () => {
        const badReceipt = {
            "retailer": "Target",
            "purchaseDate": "2022-01-01",
            "purchaseTime": "13:01",
            "total": "35.35"
        }; // no items

        const response = await api
            .post('/receipts/process')
            .send(badReceipt)
            .expect(400)
            .expect('Content-Type', /application\/json/);

        const message = response.body.message;

        assert.strictEqual(message, "The receipt is invalid.");
    });

    test('200 status code and the number of points awarded (as an integer) for the receipt(\'s given ID) after successful GET request', async () => {
        const receipt = receipts[1];
        const points = 109;

        const postResponse = await api
            .post('/receipts/process')
            .send(receipt)
            .expect(200)
            .expect('Content-Type', /application\/json/);

        const id = postResponse.body.id;

        const getResponse = await api
            .get(`/receipts/${id}/points`)
            .expect(200)
            .expect('Content-Type', /application\/json/);

        const returnedPoints = getResponse.body.points;

        assert.ok(returnedPoints);
        assert.ok(z.number().int().safeParse(returnedPoints).success);
        assert.strictEqual(returnedPoints, points);
    });

    test('404 status code and message property says "No receipt found for that ID." after failed GET request', async () => {
        const badIds = [3, 'token', 'ruffman', 'iweuqieu-121232-43nad-askmd', crypto.randomUUID()];

        for (let i = 0; i < badIds.length; i++) {
            const getResponse = await api
                .get(`/receipts/${badIds[i]}/points`)
                .expect(404)
                .expect('Content-Type', /application\/json/);
            
            const message = getResponse.body.message;

            assert.strictEqual(message, "No receipt found for that ID.");
        }
    });

    after(async () => {
        await db.deleteFrom('receipt').execute();
        await db.deleteFrom('item').execute();
        await db.destroy();
    });
});