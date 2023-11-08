import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Permissao } from "../models/Permissao";

@Entity('paginas')
export class Pagina extends BaseEntity 
{
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public nome: string;

  @OneToMany(() => Permissao, (permissao) => permissao.pagina)
  public permissoes: Permissao[]
}
