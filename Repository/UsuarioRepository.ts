import { Repository } from 'typeorm';
import { Usuario } from "../entity/Usuario";
import { banco } from "../banco";

export class UsuarioRepository {
    private repositorio!: Repository<Usuario>

    constructor(){
        this.repositorio = banco.getRepository(Usuario);
    }

    async criar(usuario: Usuario): Promise<Usuario> {
        return await this.repositorio.save(usuario);
    }

    async listar(): Promise<Usuario[]> {
        return await this.repositorio.find();
    }

    async buscarPorId(id: number): Promise<Usuario | null> {
        return await this.repositorio.findOneBy({ _id: id } as any);
    }

    async atualizar(usuario: Usuario): Promise<Usuario> {
        return await this.repositorio.save(usuario);
    }

    async remover(id: number): Promise<void> {
        await this.repositorio.delete(id);
    }


}