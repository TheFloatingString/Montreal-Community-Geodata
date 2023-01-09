const { Builder, By } = require('selenium-webdriver');

const seleniumWebdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

// Config


async function scrapeDonneesMontreal() {

    /** TODO: work in progress */

    let driver = new Builder().forBrowser('chrome')
    .setChromeOptions(new chrome.Options().addArguments('--headless'))
    .build();
    await driver.get("https://donnees.montreal.ca/ville-de-montreal/etablissements-alimentaires");

    let title = await driver.getTitle();
    // console.log(title);

    let table = await driver.findElement(By.className('info block pb-12'))
    let tBody = await table.findElement(By.css('tbody'));

    let tRows = await tBody.findElements(By.css('tr'));
    let tRowCsv = tRows[1];

    let tCells = await tRowCsv.findElements(By.css('td'));
    let tCell4 = tCells[4];

    let aElem = await tCell4.findElement(By.css("a[onclick^='sendGAEvent']"))

    console.log(aElem);
    console.log(await aElem.getCssValue())
    await aElem.click();
    await driver.quit();

    return null;
}

// scrapeDonneesMontreal();

function scrape211() {
    return null;
}

async function scrapeAnagraph() {

    let driver = new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options().addArguments('--headless')).build();
    await driver.get("https://storage.googleapis.com/foodmap-dev/communityFeatures.json");

    const content = await driver.findElement(By.css('pre')).getText();

    return JSON.parse(content);
}

exports.scrapeAnagraph = scrapeAnagraph;
