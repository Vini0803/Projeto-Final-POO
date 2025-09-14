import { Repository } from "typeorm";
import { banco } from "../banco";
import { Livro } from "../entity/Livro";

export class LivroRepository {
    private repositorio!: Repository<Livro>
    constructor() {
        this.repositorio = banco.getRepository(Livro);
    }

    async criar(livro: Livro): Promise<Livro> {
        return await this.repositorio.save(livro);
    }

    async listar(): Promise<Livro[]> {
        return await this.repositorio.find();
    }

    async buscarPorId(id: number): Promise<Livro | null> {
        return await this.repositorio.findOneBy({ _id: id } as any);
    }

    async atualizar(livro: Livro): Promise<Livro> {
        return await this.repositorio.save(livro);
    }

    async remover(id: number): Promise<void> {
        await this.repositorio.delete(id);
    }
}