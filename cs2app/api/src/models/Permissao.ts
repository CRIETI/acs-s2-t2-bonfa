import { BaseEntity, Column, Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "../models/Usuario";
import { Pagina } from "./Pagina";

@Entity('permissoes')
export class Permissao extends BaseEntity 
{
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public tipo: string;

  //@Column()
  public idUsuario: number;

  public idPagina: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.permissoes, {eager:true})
  @JoinColumn({ name: "idUsuario" })
  public usuario: Usuario;

  @ManyToOne(() => Pagina, (pagina) => pagina.permissoes, {eager:true})
  @JoinColumn({ name: "idPagina" })
  public pagina: Pagina;

}
