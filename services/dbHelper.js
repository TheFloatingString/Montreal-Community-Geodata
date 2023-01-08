require('dotenv').config();

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
            '${name}',
            '${address}',
            '${city}',
            '${state}',
            '${country}'
            '${category}',
            '${openStatus}',
            '${latitude}',
            '${longitude}',
            '${dataSource}'
        );`

    psqlPool.query(customQuery);
}