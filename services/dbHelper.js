require('dotenv').config();
const scraperUtils = require('../services/scraperUtils')

// import { scrapeAnagraph } from '../services/scraperUtils'

const pgEscape = require('pg-escape');

const fs = require('fs');
const csv = require('fast-csv');
const data = []

const pg = require('pg');
const config = require('../config');
const escape = require('pg-escape');

const pool = new pg.Pool(config.db);


function replaceSpecialChar(string) {
    if (string==null) {
        return -99;
    }
    else {
        // return 1;
        // return string.replace("/", "").replace("'", "");
        return string.replace("/", "'/").replace("'", "''");
    }
}

function returnNullIfEmptyString(dataInput) {
    if (dataInput == null) {
        return dataInput;
    } 
    else if (dataInput.length == 0) {
        return null;
    }
    else {
        return dataInput;
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
            // for (let i=0; i<data.length; i++) {
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

async function addAnagraphToDb(psqlPool) {

    const jsonResp = await scraperUtils.scrapeAnagraph();
    console.log(jsonResp.features.length);
    console.log(jsonResp.features[0]);

    for (let i=0; i<jsonResp.features.length; i++) {
        // try {
            // console.log(i);
            addOrganization(
                psqlPool,
                jsonResp.features[i].properties.name,
                jsonResp.features[i].properties.address,
                jsonResp.features[i].properties.district,
                null,
                null,
                jsonResp.features[i].properties.categoryen,
                null,
                jsonResp.features[i].geometry.coordinates[1].toString(),
                jsonResp.features[i].geometry.coordinates[0].toString(),
                "Anagraph Foodmap"
            )
        // } catch (e) {
            // console.log(`error at item ${i}`)
            // console.log(e);
        // }    
    }

    console.log("completed running process to upload Anagraph data points.")
}

// addDonnesMontrealToDb(pool);
addAnagraphToDb(pool);

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


    // console.log("HELLO!!!")
    // console.log(
    //     name,
    //     address,
    //     city,
    //     state,
    //     country,
    //     category,
    //     openStatus,
    //     latitude,
    //     longitude,
    //     dataSource
    // )

    // console.log(psqlPool);

    // console.log(escape("INSERT INTO organizations(name, address, city, state, country, category, openStatus, latitude, longitude, dataSource) VALUES(%L, %L, %L, %L, %L, %L, %L, %L, %L, %L)", name, address, city, state, country, category, openStatus, latitude, longitude, dataSource));


    // console.log(typeof(name));
    // console.log(escape("VALUES(%L, %L, %L)", 'my Restaurant', name, address));
    // console.log("sandwhich bottom:")
    // console.log(latitude);
    // console.log(typeof(latitude));
    // console.log(escape("VALUES(%L, %L, %L, %L, %L, %L, %L, %L)", name, address, city, state, country, category, openStatus, latitude));

    // console.log(escape("VALUES(%L, %L, %L)", toString(name), toString(address), toString(city)));
    // console.log("WOOHOO!")

    let customQuery = escape("INSERT INTO organizations(name, address, city, state, country, category, openStatus, latitude, longitude, dataSource) VALUES(%L, %L, %L, %L, %L, %L, %L, %L, %L, %L)", name, address, city, state, country, category, openStatus, latitude, longitude, dataSource);

    psqlPool.query(escape(customQuery));

}