import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Permissao } from "./Permissao";
import { Pagina } from "./Pagina";

@Entity('usuarios')
export class Usuario extends BaseEntity 
{
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public nome: string;

  @Column({ unique: true })
  public email: string;

  @Column({ select: false })
  public senha: string;

  @OneToMany(() => Permissao, (permissao) => permissao.usuario)
  public permissoes: Permissao[]
}
