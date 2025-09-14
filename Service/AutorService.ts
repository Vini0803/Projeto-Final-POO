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
    const participante = await this.repository.buscarPorId(id);
    if (!participante) throw new Error("Música não encontrada");
    if (nome !== undefined) participante.nome = nome;  
    if (nacionalidade !== undefined) participante.nacionalidade = nacionalidade; 
    return await this.repository.atualizar(participante);
  }


  async excluir(id: number): Promise<void> {
    return await this.repository.remover(id);
  }
}