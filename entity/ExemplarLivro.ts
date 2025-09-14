import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { Livro } from "./Livro"
import { Emprestimo} from "./Emprestimo"


@Entity()
export class ExemplarLivro {
  @PrimaryGeneratedColumn()
  private _id!: number;

  @Column({ name: "disponivel", default: true })
  private _disponivel: boolean;

  @ManyToOne(() => Livro, (livro) => livro.exemplares, { eager: true })
  @JoinColumn({ name: 'livro_id' })
  private _livro: Livro;

  @OneToOne(() => Emprestimo, (emprestimo) => emprestimo.exemplar)
  @JoinColumn({ name: 'emprestimo_id' })
  private _emprestimo!: Emprestimo;

  constructor(livro: Livro) {
    this._livro = livro;
    this._disponivel = true
  }

  get id(): number {
    return this._id;
  }

  get disponivel(): boolean {
    return this._disponivel;
  }
  set disponivel(disponivel: boolean) {
    this._disponivel = disponivel;
  }

  get livro(): Livro {
    return this._livro;
  }

  set livro(livro: Livro) {
    this._livro = livro;
  }
  
  get emprestimo(): Emprestimo {
    return this._emprestimo;
  }
}