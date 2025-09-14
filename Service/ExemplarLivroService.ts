import { ExemplarLivro } from "../entity/ExemplarLivro";
import { ExemplarLivroRepository } from "../Repository/ExemplarLivroRepository";
import { Livro } from "../entity/Livro";

export class ExemplarLivroService {
  private repository: ExemplarLivroRepository;

  constructor() {
    this.repository = new ExemplarLivroRepository();
  }

  async cadastrar(livro: Livro): Promise<ExemplarLivro> {
    const exemplar = new ExemplarLivro(livro);
    return await this.repository.criar(exemplar);
  }

  async listarTodos(): Promise<ExemplarLivro[]> {
    return await this.repository.listar();
  }

  async buscar(id: number): Promise<ExemplarLivro | null> {
    return await this.repository.buscarPorId(id);
  }

  async atualizar(id: number, livro?: Livro): Promise<ExemplarLivro> {
    const exemplar = await this.repository.buscarPorId(id);
    if (!exemplar) throw new Error("Exemplar não encontrado");
    if (livro !== undefined) exemplar.livro = livro; 
    return await this.repository.atualizar(exemplar);
  }


  async excluir(id: number): Promise<void> {
    return await this.repository.remover(id);
  }
}