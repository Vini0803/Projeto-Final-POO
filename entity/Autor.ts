import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Livro } from "./Livro";

@Entity()
export class Autor {
  @PrimaryGeneratedColumn()
  private _id!: number;

  @Column({ name: "nome"})
  private _nome: string;

  @Column({ name: "nacionalidade"})
  private _nacionalidade: string;

  @OneToMany(() => Livro, (livro) => livro.autor)
  private _livros!: Livro[];

  constructor(nome: string, nacionalidade: string) {
    this._nome = nome;
    this._nacionalidade = nacionalidade
  }

  get id(): number {
    return this._id;
  }

  get nome(): string {
    return this._nome;
  }
  set nome(nome: string) {
    if (!nome) {
        throw new Error("O nome do autor não pode ser vazio.");
    }
    this._nome = nome;
  }

  get nacionalidade(): string {
    return this._nacionalidade;
  }
  set nacionalidade(nacionalidade: string) {
    if (!nacionalidade) {
        throw new Error("A nacionalidade do autor não pode ser vazia.");
    }
    this._nacionalidade = nacionalidade;
  }

  get livros(): Livro[] {
    return this._livros;
  }
}