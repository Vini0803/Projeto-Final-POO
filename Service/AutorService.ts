import { Autor } from "../entity/Autor";
import { AutorRepository } from "../Repository/AutorRepository";

export class AutorService {
  private repository: AutorRepository;

  constructor() {
    this.repository = new AutorRepository();
  }

  async cadastrar(nome: string, nacionalidade: string): Promise<Autor> {
    const autor = new Autor(nome, nacionalidade);
    return await this.repository.criar(autor);
  }

  async listarTodos(): Promise<Autor[]> {
    return await this.repository.listar();
  }

  async buscar(id: number): Promise<Autor | null> {
    return await this.repository.buscarPorId(id);
  }

  async atualizar(id: number, nome?: string, nacionalidade?: string): Promise<Autor> {
    const autor = await this.repository.buscarPorId(id);
    if (!autor) throw new Error("Autor não encontrado");
    if (nome !== undefined) autor.nome = nome;  
    if (nacionalidade !== undefined) autor.nacionalidade = nacionalidade; 
    return await this.repository.atualizar(autor);
  }


  async excluir(id: number): Promise<void> {
    return await this.repository.remover(id);
  }
}