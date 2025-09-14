import { Repository } from "typeorm";
import { banco } from "../banco";
import { Emprestimo } from "../entity/Emprestimo";

export class EmprestimoRepository {
    private repositorio!: Repository<Emprestimo>;

    constructor() {
        this.repositorio = banco.getRepository(Emprestimo);
    }

    async criar(emprestimo: Emprestimo): Promise<Emprestimo> {
        return await this.repositorio.save(emprestimo);
    }

    async listar(): Promise<Emprestimo[]> {
        return await this.repositorio.find();
    }

    async buscarPorId(id: number): Promise<Emprestimo | null> {
        return await this.repositorio.findOneBy({ _id: id } as any);
    }

    async atualizar(emprestimo: Emprestimo): Promise<Emprestimo> {
        return await this.repositorio.save(emprestimo);
    }

    async remover(id: number): Promise<void> {
        await this.repositorio.delete(id);
    }
}