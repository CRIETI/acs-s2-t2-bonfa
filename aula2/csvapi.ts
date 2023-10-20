import express from 'express';
import { Router, Request, Response } from 'express';

//npm install express
//npm install @types/express

const app = express();
const route = Router();
app.use(express.json())

route.get('/', (req: Request, res: Response) => 
{
  res.json(
    { message: 'hello world with Typescript' }
    )
});

route.get('/csv', (req: Request, res: Response) => 
{

    let dados = [
        {
            nome: "Eduardo Bonfandini",
            fone: "51 99841 5375",
            cidade: "Estrela - RS"
        },
        {
            nome: "Fabricio Pretto",
            fone: "51 99684 9123",
            cidade: "Arroio do Meio - RS"
        },
        {
            nome: "Mateus Roveda",
            fone: "51 99555 8131",
            cidade: "Lajeado - RS"
        },
    ];
    
    let header = '"Nome";"Fone";"Cidade"\r';
    let csv = header;
    
    for (let idx in dados)
    {
        let pessoa = dados[idx];
        csv += '"'+pessoa.nome+'";"'+pessoa.fone+'";"'+pessoa.cidade+'"\r';
    }

    res.append('Content-Type','text/csv');
    res.send(csv)
    res.attachment('output.csv');
});

app.use(route)
app.listen(3333, () => console.log('server running on port 3333'));