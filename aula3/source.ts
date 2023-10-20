import * as puppeteer from 'puppeteer';


async function main() {
    const browser = await puppeteer.launch({headless:'new'});
    const page = await browser.newPage();
    await page.goto("https://www.google.com.br/search?q=node+ts");

    //let source = await page.content();
    //console.log(source);

    await page.waitForSelector("#result-stats");
    let element = await page.$('#result-stats')
    let value = await page.evaluate(el => el?.textContent, element)
    console.log(value);
    
    browser.close();
}

main();