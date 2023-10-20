import * as puppeteer from 'puppeteer';

//npm install puppeteer
//npm install @types/puppeteer

async function screenshot() 
{

    const browser = await puppeteer.launch({headless:"new"});
    const page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 768});
    await page.goto('https://www.univates.br/');
    await page.screenshot({

        path: 'screenshot.png'

    });

    await browser.close();
}

screenshot();