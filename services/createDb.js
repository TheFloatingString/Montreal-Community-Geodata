require('dotenv').config();

let env = process.env;

const pg = require('pg');
const config = require('../config')

const pool = new pg.Pool(config.db);

const clearDatabase = () => {

    const poolDb = new pg.Pool(config.db);

    const clearQuery = `

    DROP TABLE organizations;

    CREATE TABLE organizations(
        id          SERIAL PRIMARY KEY,
        name        VARCHAR(1000),
        address     VARCHAR(1000),
        city        VARCHAR(1000),
        state       VARCHAR(1000),
        country     VARCHAR(1000),
        category    VARCHAR(1000),
        openStatus  VARCHAR(1000),
        latitude    NUMERIC(20, 18),
        longitude   NUMERIC(20, 18),
        dataSource  VARCHAR(1000),
        createdAT   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    `

    poolDb.query(clearQuery);
    poolDb.end();

}


const printDatabase = () => {

    const poolDb = new pg.Pool(config.db);
    const printQuery = `SELECT * FROM organizations;`

    poolDb.query(printQuery);
    poolDb.end();
}


pool.end();


module.exports = { clearDatabase, printDatabase }