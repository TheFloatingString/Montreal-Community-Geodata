const { Builder, By } = require('selenium-webdriver');

const seleniumWebdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

// // Config

// let chromeCapabilities = seleniumWebdriver.Capabilities.chrome();
// let chromeOptions = { 'args': ['--disable-infobars'] };
// chromeCapabilities.set('chromeOptions', chromeOptions);
// chreom

async function scrapeDonneesMontreal() {

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

    // let aItem = await tCell4.findElement(By.css("a[onclick^='javascript: sendGAEvent']")).click();

    // console.log(aItem.findElement(By.css('')))

    // const csvUrl = await aItem.getAttribute('href');

    // console.log(csvUrl);
    // aItem.click();

    // let driver2 = new Builder().forBrowser('chrome')
    // .setChromeOptions(new chrome.Options().addArguments('--headless'))
    // .build();

    

    // console.log(csvUrl);
    // await driver2.get(csvUrl).then( res => {
    //     console.log(res);
    // }).catch( e => {
    //     console.log('error');
    //     console.log(e);
    // });

    // const csvFile = await driver2.getPageSource();
    // console.log(csvFile);



    // await driver.get(csvUrl);
    // const csvFile = await driver.getPageSource();

    // console.log(csvFile);

    // csvFile = driver.g();

    // console.log(await csvFile.)
            
    // chrome.get(csvUrl);
    // csvFile = chrome

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
