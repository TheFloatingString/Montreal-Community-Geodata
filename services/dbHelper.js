require('dotenv').config();

const fs = require('fs');
const csv = require('fast-csv');
const data = []

const pg = require('pg');
const config = require('../config')

const pool = new pg.Pool(config.db);


function removeSingleQuotes(string) {
    return string.replace("'", "''")
}

function returnNullIfEmptyString(dataInput) {
    if (dataInput.length == 0) {
        return null
    }
    else {
        return dataInput
    }
}

function addDonnesMontrealToDb(psqlPool) {

    // load CSV file
    fs.createReadStream('./public/static/data/businesses.csv')
        .pipe(csv.parse({ headers: true }))
        .on('error', error => console.log(error))
        .on('data', row => data.push(row))
        .on('end', () => {

            let counter = 0;

            for (let i=0; i<data.length; i++) {
                try {
                    addOrganization(
                        psqlPool,
                        data[i].name,
                        data[i].address,
                        data[i].city,
                        data[i].state.split(',')[0].trim(),
                        data[i].state.split(',')[1].trim(),
                        data[i].type,
                        data[i].statut,
                        returnNullIfEmptyString(data[i].latitude),
                        returnNullIfEmptyString(data[i].longitude),
                        'Données Montréal'
                    );
                    counter += 1;
                }
                catch (e) {
                    console.log(e)
                }
            }
            console.log(`looped through ${counter} items in the CSV file.`)
        });
}

addDonnesMontrealToDb(pool);

function addOrganization(
    psqlPool,
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
) {
    customQuery = `
        INSERT INTO organizations(
            name,
            address,
            city,
            state,
            country,
            openStatus,
            latitude,
            longitude,
            dataSource
        )
        VALUES (
            '${removeSingleQuotes(name)}',
            '${removeSingleQuotes(address)}',
            '${removeSingleQuotes(city)}',
            '${removeSingleQuotes(state)}',
            '${removeSingleQuotes(country)}'
            '${removeSingleQuotes(category)}',
            '${removeSingleQuotes(openStatus)}',
            '${removeSingleQuotes(latitude)}',
            '${removeSingleQuotes(longitude)}',
            '${removeSingleQuotes(dataSource)}'
        );`

    psqlPool.query(customQuery);
}