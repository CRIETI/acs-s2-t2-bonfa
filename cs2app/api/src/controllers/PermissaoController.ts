import { Request, Response } from 'express';
import { Permissao } from '../models/Permissao';
import { ILike } from 'typeorm';
import { Equal } from 'typeorm/browser';

export class PermissoesController 
{

  async list (req: Request, res: Response): Promise<Response> 
  {
    let idUsuario:number = Number(req.query.idUsuario);

    let permissoes: Permissao[] = await Permissao.findBy(
    {
      usuario: idUsuario ? {id:idUsuario} : undefined 
    });

    return res.status(200).json(permissoes);
  }

  async find (req: Request, res: Response): Promise<Response> 
  {
    let permissao: Permissao = res.locals.permissao;

    return res.status(200).json(permissao);
  }

  async create (req: Request, res: Response): Promise<Response> 
  {
    let body = req.body;
    console.log(req.body)
    console.log("IDUSUARIO="+req.body.idUsuario);

    let permissao: Permissao = await Permissao.create(
    {
      tipo: body.tipo,
      usuario: body.idUsuario,
      pagina: body.idPagina
    }).save();

    return res.status(200).json(permissao);
  }

  async update (req: Request, res: Response): Promise<Response> 
  {
    let body = req.body;
    let permissao: Permissao = res.locals.permissao;

    permissao.tipo = body.tipo;
    permissao.idUsuario = body.idUsuario;
    permissao.idPagina = body.idPagina;
    await permissao.save();
    return res.status(200).json(permissao);
  }

  async delete (req: Request, res: Response): Promise<Response> 
  {
    let permissao: Permissao = res.locals.permissao;

    permissao.remove();

    return res.status(200).json();
  }

}
