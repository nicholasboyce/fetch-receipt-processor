import { Kysely } from "kysely";


export const up = async (db: Kysely<any>) => {
    await db.schema.createTable('receipt')
        .addColumn('id', 'uuid', (col) => col.primaryKey())
        .addColumn('retailer', 'varchar(200)', (col) => col.notNull())
        .addColumn('purchaseDate', 'varchar(10)', (col) => col.notNull())
        .addColumn('purchaseTime', 'varchar(5)', (col) => col.notNull())
        .addColumn('total', 'varchar(5)', (col) => col.notNull())
        .addColumn('points', 'integer', (col) => col.notNull())
        .execute();

    await db.schema.createTable('item')
        .addColumn('id', 'uuid', (col) => col.notNull())
        .addColumn('shortDescription', 'varchar(300)', (col) => col.notNull())
        .addColumn('price', 'varchar(5)', (col) => col.notNull())
        .execute();
};

export const down = async (db: Kysely<any>) => {
    await db.schema.dropTable('receipt').execute();
    await db.schema.dropTable('item').execute();
};