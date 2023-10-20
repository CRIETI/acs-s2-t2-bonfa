import express from 'express';
import { Router, Request, Response } from 'express';
import cors from 'cors';
import cookieParser  from 'cookie-parser';

//https://expressjs.com/en/resources/middleware/cookie-parser.html
//npm install cookie-parser
//npm install @types/cookie-parser
//npm install cors
//npm install @types/cors

const app = express();
app.use(cookieParser());
app.use(express.json())
let options: cors.CorsOptions = 
{
    origin: ['http://localhost:3334'],
    credentials: true
};

app.use(cors(options));

app.get('/', (req: Request, res: Response) => 
{
    console.log("Recebido nome:"+req.cookies["nome"]);

    let contagem = req.cookies['contagem'];
    contagem = typeof contagem =='undefined' ? 0 : parseInt( contagem)+1;
	res.cookie('contagem', contagem, { httpOnly: false })

    res.cookie('biscoitinho', 'chocolate', { httpOnly: false })
    res.json(
        { 
            message: 'Cookie "biscotinho" gravado'
        }
    )
});

app.listen(3333, () => console.log('back running on port 3333'));