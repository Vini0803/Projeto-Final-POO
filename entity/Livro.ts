import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Autor } from "./Autor";
import { ExemplarLivro } from "./ExemplarLivro"

@Entity()
export class Livro {
  @PrimaryGeneratedColumn()
  private _id!: number;

  @Column({ name: "titulo" })
  private _titulo: string;

  @Column({name: "isbn", unique: true })
  private _isbn: string;

  @Column({ name: "ano_publicacao" })
  private _anoPublicacao: number;

  @Column ({name: "quantidadeExemplares", default: 0})
  private _quantidadeExemplares!: number;

  @ManyToOne(() => Autor, (autor) => autor.livros, { eager: true })
  @JoinColumn({ name: 'autor_id' })
  private _autor: Autor;

  @OneToMany(() => ExemplarLivro, (exemplar) => exemplar.livro)
  private _exemplares!: ExemplarLivro[];


  constructor(titulo: string, isbn: string, ano: number, autor: Autor) {
    this._titulo = titulo;
    this._isbn = isbn;
    this._anoPublicacao = ano;
    this._autor = autor;
    //this._exemplares = exemplares;
    //this._quantidadeExemplares = exemplares.length ;
  }

  get id(): number {
    return this._id;
  }

  get titulo(): string {
    return this._titulo;
  }
  set titulo(titulo: string) {
    if (!titulo) {
        throw new Error("O título do livro não pode ser vazio.");
    }
    this._titulo = titulo;
  }

  get isbn(): string {
    return this._isbn;
  }
  set isbn(isbn: string) {
    if (!/^\d{13}$/.test(isbn)) {
        throw new Error("O ISBN do livro deve conter 13 digitos.");
    }
    this._isbn = isbn;
  }

  get anoPublicacao(): number {
    return this._anoPublicacao;
  }
  set anoPublicacao(anoPublicacao: number) {
    if (anoPublicacao <= 0) {
        throw new Error("O ano de publicação deve ser um número positivo.");
    }
    this._anoPublicacao = anoPublicacao;
  }

  get autor(): Autor {
    return this._autor;
  }
  set autor(autor: Autor) {
    this._autor = autor;
  }
  

  set exemplares(exemplar: ExemplarLivro[]){
    this._exemplares = exemplar;
  }

  get exemplares(): ExemplarLivro[] {
   return this._exemplares;
  }

  get quantidadeExemplares(): number {
    return this._quantidadeExemplares;
  }

  set quantidadeExemplares(quantidade: number) {
    if (quantidade < 0) {
      throw new Error("A quantidade de exemplares não pode ser negativa.");
    }
    this._quantidadeExemplares = quantidade;
  }

  
  adicionarExemplar(exemplar: ExemplarLivro): void {
    this._exemplares.push(exemplar)
    this._quantidadeExemplares = this._exemplares.length
  }
}

