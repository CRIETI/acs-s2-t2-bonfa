import { Request, Response } from 'express';
import { Pagina } from '../models/Pagina';
import { ILike } from 'typeorm';

export class PaginasController 
{

  async list (req: Request, res: Response): Promise<Response> 
  {
    let nome = req.query.nome;

    let users: Pagina[] = await Pagina.findBy(
    {
      nome: nome ? ILike(`%${nome}%`) : undefined
    });

    return res.status(200).json(users);
  }

  async find (req: Request, res: Response): Promise<Response> 
  {
    console.log(res.locals.pagina)
    let pagina: Pagina = res.locals.pagina;

    return res.status(200).json(pagina);
  }

  async create (req: Request, res: Response): Promise<Response> 
  {
    let body = req.body;

    let pagina: Pagina = await Pagina.create(
    {
      nome: body.nome,
    }).save();

    return res.status(200).json(pagina);
  }

  async update (req: Request, res: Response): Promise<Response> 
  {
    let body = req.body;
    let pagina: Pagina = res.locals.pagina;

    pagina.nome = body.nome;
    await pagina.save();
    return res.status(200).json(pagina);
  }

  async delete (req: Request, res: Response): Promise<Response> 
  {
    let pagina: Pagina = res.locals.pagina;

    pagina.remove();

    return res.status(200).json();
  }

}
