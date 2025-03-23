import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT;
const POSTGRESDB_NAME = process.env.NODE_ENV === 'test' ? 'fetchtestdb' : process.env.POSTGRESDB_NAME;
const POSTGRESDB_HOST = process.env.NODE_ENV === 'test' ? 'localhost' : process.env.POSTGRESDB_HOST;
const POSTGRESDB_USER = process.env.NODE_ENV === 'test' ? 'root' : process.env.POSTGRESDB_USER;
const SESSION_SECRET = process.env.SESSION_SECRET || 'secret';
const POSTGRESDB_PORT = process.env.NODE_ENV === 'test' ? 5434 : Number(process.env.POSTGRESDB_PORT);
const POSTGRESDB_PASSWORD = process.env.NODE_ENV === 'test' ? 'password' : process.env.POSTGRESDB_PASSWORD;
const APP_HOST = process.env.APP_HOST;


export default {
    PORT,
    POSTGRESDB_NAME,
    POSTGRESDB_HOST,
    POSTGRESDB_USER,
    POSTGRESDB_PORT,
    POSTGRESDB_PASSWORD,
    SESSION_SECRET,
    APP_HOST
}