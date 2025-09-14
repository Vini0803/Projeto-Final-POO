import { Usuario } from "../entity/Usuario";
import { UsuarioRepository } from "../Repository/UsuarioRepository";

export class UsuarioService {
  private repository: UsuarioRepository;

  constructor() {
    this.repository = new UsuarioRepository();
  }

  async cadastrar(nome: string, email: string): Promise<Usuario> {
    const usuario = new Usuario(nome, email);
    return await this.repository.criar(usuario);
  }

  async listarTodos(): Promise<Usuario[]> {
    return await this.repository.listar();
  }

  async buscar(id: number): Promise<Usuario | null> {
    return await this.repository.buscarPorId(id);
  }

  async atualizar(id: number, nome?: string, email?: string): Promise<Usuario> {
    const usuario = await this.repository.buscarPorId(id);
    if (!usuario) throw new Error("Música não encontrada");
    if (nome !== undefined) usuario.nome = nome;  
    if (email !== undefined) usuario.email = email; 
    return await this.repository.atualizar(usuario);
  }


  async excluir(id: number): Promise<void> {
    return await this.repository.remover(id);
  }
}