require('dotenv').config();

let env = process.env;

const pg = require('pg');
const config = require('../config')

const pool = new pg.Pool(config.db);

// Uncomment the following section to delete the table organizations

/*
const q_drop = `
DROP TABLE organizations;
`
pool.query(q_drop);
// */


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

const q_init = `
CREATE TABLE IF NOT EXISTS organizations(
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

INSERT INTO organizations(
    name,
    address,
    city,
    state,
    country,
    category,
    openStatus,
    latitude, 
    longitude,
    dataSource
)
VALUES (
    'Restaurant Name',
    '1 Main Street',
    'Montreal',
    'Quebec',
    'Canada',
    'food',
    'open',
    45,
    -73,
    'Données Montréal'
);
`

// pool.query(q_init).then((res, err) => {
    // console.log(err, res);
// });

// const q_select = `
// SELECT * FROM organizations
// `;

// pool.query(q_select).then((res, err) => {
//     console.log(res.rows);
// })

// console.log(getQuery(q_select));

pool.end();

// clearDatabase();

module.exports = { clearDatabase, printDatabase }