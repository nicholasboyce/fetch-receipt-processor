import { Database } from './models/database';
import { Pool } from 'pg';
import { Kysely, PostgresDialect } from 'kysely';
import config from './utils/config';

const dialect = new PostgresDialect({
  pool: new Pool({
    database: config.POSTGRESDB_NAME,
    host: config.POSTGRESDB_HOST,
    user: config.POSTGRESDB_USER,
    port: config.POSTGRESDB_PORT,
    max: 10,
    password: config.POSTGRESDB_PASSWORD
  })
});

export const db = new Kysely<Database>({
  dialect,
});