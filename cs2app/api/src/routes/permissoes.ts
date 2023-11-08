import { NextFunction, Request, Response, Router } from 'express';
import { PermissoesController } from '../controllers/PermissaoController';
import * as yup from 'yup';
import { Permissao } from '../models/Permissao';
import { Not } from 'typeorm';

async function validarPayload (req: Request, res: Response, next: NextFunction): Promise<Response|void> 
{
  let schema = yup.object(
  {
    tipo: yup.string().min(1).max(1).required(),
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
  let permissao: Permissao|null = await Permissao.findOneBy({ id });
  console.log(permissao)

  if (! permissao) 
  {
    return res.status(422).json({ error: 'Permissão não encontrada!' });
  }

  res.locals.permissao = permissao;

  return next();
}

let router: Router = Router();
let controller: PermissoesController = new PermissoesController();
router.get('/permissoes', controller.list);
router.get('/permissoes/:id', validarSeExiste, controller.find);
router.post('/permissoes',  controller.create);
router.put('/permissoes/:id', validarSeExiste, validarPayload,  controller.update);
router.delete('/permissoes/:id', validarSeExiste, controller.delete);

export default router;