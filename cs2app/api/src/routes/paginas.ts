import { NextFunction, Request, Response, Router } from 'express';
import { PaginasController } from '../controllers/PaginasControllers';
import * as yup from 'yup';
import { Pagina } from '../models/Pagina';
import { Not } from 'typeorm';

async function validarPayload (req: Request, res: Response, next: NextFunction): Promise<Response|void> 
{
  let schema = yup.object(
  {
    nome: yup.string().min(3).max(255).required(),
  });

  let payload = req.body;

  try 
  {
    req.body = await schema.validate(payload, { abortEarly: false, stripUnknown: true });

    return next();
  } 
  catch (error) 
  {
    if (error instanceof yup.ValidationError) 
    {
      return res.status(400).json({ errors: error.errors });
    }
    
    return res.status(500).json({ error: 'Ops! Algo deu errado.' });
  }
}

async function validarSeExiste (req: Request, res: Response, next: NextFunction): Promise<Response|void> 
{
  let id = Number(req.params.id);
  let pagina: Pagina|null = await Pagina.findOneBy({ id });
  console.log(pagina)

  if (! pagina) 
  {
    return res.status(422).json({ error: 'Página não encontrada!' });
  }

  res.locals.pagina = pagina;

  return next();
}

let router: Router = Router();

let paginasController: PaginasController = new PaginasController();

router.get('/paginas', paginasController.list);
router.get('/paginas/:id', validarSeExiste, paginasController.find);
router.post('/paginas', validarPayload, paginasController.create);
router.put('/paginas/:id', validarSeExiste, validarPayload,  paginasController.update);
router.delete('/paginas/:id', validarSeExiste, paginasController.delete);

export default router;
