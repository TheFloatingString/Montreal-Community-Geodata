const { Builder, By } = require('selenium-webdriver');

const seleniumWebdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function scrapeDonneesMontreal() {

    let driver = new Builder().forBrowser('chrome')
    .setChromeOptions(new chrome.Options().addArguments('--headless'))
    .build();
    await driver.get("https://donnees.montreal.ca/ville-de-montreal/etablissements-alimentaires");

    let title = await driver.getTitle();
    console.log(title);

    // let h1 = await driver.findElement(By.css('h1'));
    // console.log(await h1.getText());

    // let tables = await driver.findElements(By.css('table'));
    // console.log(tables);

    let table = await driver.findElement(By.className('info block pb-12'))
    let tBody = await table.findElement(By.css('tbody'));

    let tRows = await tBody.findElements(By.css('tr'));

    let tRowCsv = tRows[1];
    // let tCell = tRowCsv.findElements(By.css('td'));


    console.log(await tRowCsv.getText());
    
    // console.log(await tCell.getText());

    // console.log(table);

    await driver.quit();

    return null;
}

scrapeDonneesMontreal();

function scrape211() {
    return null;
}

function scrapeAnagraph() {
    return null;
}