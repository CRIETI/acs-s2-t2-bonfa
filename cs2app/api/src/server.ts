import express, { Express, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import usuariosRoutes from './routes/usuarios';
import paginasRoutes from './routes/paginas';
import permissoesRoutes from './routes/permissoes';
import autenticacaoRoutes from './routes/autenticacao';
import { basicAuth } from './middlewares/basic-auth';

const PORT: Number = Number(process.env.SERVER_PORT || 3000);

let server: Express = express();

server.use(cors());
server.use(express.json());

server.use((req: Request, res: Response, next: NextFunction) => 
{
  console.log('[' + (new Date()) + '] ' + req.method + ' ' + req.url);
  next();
});

//server.use(basicAuth);
server.use(usuariosRoutes);
server.use(paginasRoutes);
server.use(permissoesRoutes);
//server.use(autenticacaoRoutes);

export default 
{
  start ()
  {
    server.listen(PORT, () => 
    {
      console.log(`Server started on port ${PORT}!`);
    });
  }
};
