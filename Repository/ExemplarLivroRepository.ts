import { Repository } from 'typeorm';
import { ExemplarLivro } from "../entity/ExemplarLivro";
import { banco } from "../banco";
import { Livro } from '../entity/Livro';

export class ExemplarLivroRepository {
    private repositorio!: Repository<ExemplarLivro>

    constructor(){
        this.repositorio = banco.getRepository(ExemplarLivro);
    }

    async criar(exemplar: ExemplarLivro): Promise<ExemplarLivro> {
        return await this.repositorio.save(exemplar);
    }

    async listar(): Promise<ExemplarLivro[]> {
        return await this.repositorio.find();
    }

    async buscarPorId(id: number): Promise<ExemplarLivro | null> {
        return await this.repositorio.findOneBy({ _id: id } as any);
    }

    async atualizar(exemplar: ExemplarLivro): Promise<ExemplarLivro> {
        return await this.repositorio.save(exemplar);
    }

    async remover(id: number): Promise<void> {
        await this.repositorio.delete(id);
    }

    async incrementarExemplar(id: number,  )
}