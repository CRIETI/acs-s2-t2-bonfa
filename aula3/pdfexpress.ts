import express from 'express';
import { Router, Request, Response } from 'express';
import * as puppeteer from 'puppeteer';

//npm install express
//npm install @types/express

const app = express();
app.use(express.json())

app.get('/', (req: Request, res: Response) => 
{
  res.json(
    { message: 'hello world with Typescript' }
    )
});

app.get('/pdf', async (req: Request, res: Response) => 
{
    let html:string = `<h1>Este é um título</h1>
    <div>Este é um conteúdo com acentuação</div>`;
    let pdfBuffer = await pdf(html);
    res.append('Content-Type','application/x-pdf');
    res.append('Content-Disposition', 'attachment; filename="output.pdf"');
    res.send(pdfBuffer)
});

async function pdf(html:string) 
{
    const browser = await puppeteer.launch({headless:"new"});
    const page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 768});
    await page.setContent(html);
    const pdfBuffer = await page.pdf();
    await page.close();
    await browser.close();
    return pdfBuffer;
}

app.listen(3333, () => console.log('server running on port 3333'));