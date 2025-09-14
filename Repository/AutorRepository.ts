import { Repository } from 'typeorm';
import { Autor } from "../entity/Autor";
import { banco } from "../banco";

export class AutorRepository {
    private repositorio!: Repository<Autor>

    constructor(){
        this.repositorio = banco.getRepository(Autor);
    }

    async criar(autor: Autor): Promise<Autor> {
        return await this.repositorio.save(autor);
    }

    async listar(): Promise<Autor[]> {
        return await this.repositorio.find();
    }

    async buscarPorId(id: number): Promise<Autor | null> {
        return await this.repositorio.findOneBy({ _id: id } as any);
    }

    async atualizar(autor: Autor): Promise<Autor> {
        return await this.repositorio.save(autor);
    }

    async remover(id: number): Promise<void> {
        await this.repositorio.delete(id);
    }


}