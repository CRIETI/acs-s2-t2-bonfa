import * as puppeteer from 'puppeteer';
import * as fs from 'fs';

//npm install puppeteer
//npm install @types/puppeteer

async function pdf(html:string) 
{
    const browser = await puppeteer.launch({headless:"new"});
    const page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 768});
    await page.setContent(html);
    //await page.goto("https://www.google.com.br/search?q=crie+ti");

    const pdfBuffer = await page.pdf();

    await page.close();
    await browser.close();
  
    return pdfBuffer;
}

async function main()
{
    let html:string = `<h1>Este é um título</h1>
    <div> Este é um conteúdo com acentuação</div>
    `;

    let pdfBuffer = await pdf(html);

    fs.writeFileSync('gugóle.pdf', pdfBuffer);
}

main();