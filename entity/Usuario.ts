import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Emprestimo } from "./Emprestimo";

@Entity()
export class Usuario {
    @PrimaryGeneratedColumn()
    private _id!: number;

    @Column({ name: "nome"})
    private _nome: string;

    @Column({ name: "email", unique: true })
    private _email: string;

    @OneToMany(() => Emprestimo, (emprestimo) => emprestimo.usuario)
    private _emprestimo!: Emprestimo;

    constructor(nome: string, email: string) {
        this._nome = nome;
        this._email = email;
    }

    get id(): number {
        return this._id;
    }

    get nome(): string {
        return this._nome;
    }
    set nome(nome: string) {
        if (!nome) {
            throw new Error("O nome do usuário não pode ser vazio.");
        }
        this._nome = nome;
    }

    get email(): string {
        return this._email;
    }
    set email(email: string) {
        if (!email || !email.includes('@')) {
            throw new Error("Email inválido.");
        }
        this._email = email;
    }

    get emprestimo(): Emprestimo {
        return this._emprestimo;
    }
}