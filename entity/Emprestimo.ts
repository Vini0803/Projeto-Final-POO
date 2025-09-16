import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from "typeorm";
import { ExemplarLivro } from "./ExemplarLivro";
import { Usuario } from "./Usuario";

@Entity()
export class Emprestimo {
    @PrimaryGeneratedColumn()
    private _id!: number;

    @Column({ name: "data_Emprestimo"})
    private _dataEmprestimo: Date;

    @Column({ name: "data_DevolucaoPrevista" })
    private _dataDevolucaoPrevista: Date;

    @Column({ name: "data_DevolucaoReal", type: "date", nullable: true })
    private _dataDevolucaoReal: Date | null;

    @ManyToOne(() => ExemplarLivro, { eager: true })
    @JoinColumn({ name: 'exemplar_id' })
    private _exemplar: ExemplarLivro;

    @ManyToOne(() => Usuario, (usuario) => usuario.emprestimo, { eager: true })
    @JoinColumn({ name: 'usuario_id' })
    private _usuario: Usuario;

    constructor(exemplar: ExemplarLivro, usuario: Usuario) {
        this._exemplar = exemplar;
        this._usuario = usuario;
        this._dataEmprestimo = new Date();
        
        const dataDevolucao = new Date();
        dataDevolucao.setDate(dataDevolucao.getDate() + 14); 
        this._dataDevolucaoPrevista = dataDevolucao;

        this._dataDevolucaoReal = null;
    }

    get id(): number {
        return this._id;
    }

    get dataEmprestimo(): Date {
        return this._dataEmprestimo;
    }
    set dataEmprestimo(dataEmprestimo: Date) {
        this._dataEmprestimo = dataEmprestimo;
    }

    get dataDevolucaoPrevista(): Date {
        return this._dataDevolucaoPrevista;
    }
    set dataDevolucaoPrevista(dataDevolucaoPrevista: Date) {
        this._dataDevolucaoPrevista = dataDevolucaoPrevista;
    }

    get dataDevolucaoReal(): Date | null {
        return this._dataDevolucaoReal;
    }
    set dataDevolucaoReal(value: Date | null) {
        this._dataDevolucaoReal = value;
    }

    get exemplar(): ExemplarLivro {
        return this._exemplar;
    }
    set exemplar(exemplar: ExemplarLivro) {
        this._exemplar = exemplar;
    }

    get usuario(): Usuario {
        return this._usuario;
    }
    set usuario(usuario: Usuario) {
        this._usuario = usuario;
    }
}
