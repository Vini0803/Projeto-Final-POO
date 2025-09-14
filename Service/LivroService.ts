import { AutorService } from "../Service/AutorService";
import { Livro } from "../entity/Livro";
import { LivroRepository } from "../Repository/LivroRepository";
import { ExemplarLivro } from "../entity/ExemplarLivro";

export class LivroService {
  private repository: LivroRepository;
  private autorService: AutorService;

  constructor() {
    this.repository = new LivroRepository();
    this.autorService = new AutorService();
  }

  async cadastrar(titulo: string, isbn: string, ano: number, exemplares: ExemplarLivro[], autorID: number): Promise<Livro> {
    const autor = await this.autorService.buscar(autorID);
    if (!autor) throw new Error("Autor nao cadastrado/encontrado");

    const livro = new Livro(titulo, isbn, ano, autor, exemplares);
    return await this.repository.criar(livro);
  }

  async listarTodos(): Promise<Livro[]> {
    return await this.repository.listar();
  }

  async buscar(id: number): Promise<Livro | null> {
    return await this.repository.buscarPorId(id);
  }

  async atualizar(id: number, titulo?: string, isbn?: string, anoPublicacao?: number, autorID?: number): Promise<Livro> {
    const livro = await this.repository.buscarPorId(id);
    if (!livro) throw new Error("Livro não encontrado");
    if (titulo !== undefined) livro.titulo = titulo;  
    if (isbn !== undefined) livro.isbn = isbn;
    if (anoPublicacao !== undefined) livro.anoPublicacao = anoPublicacao;

    if (autorID !== undefined){
        const autor = await this.autorService.buscar(autorID);
        if (!autor) throw new Error("Autor nao cadastrado/encontrado");

        livro.autor = autor;
    }
    return await this.repository.atualizar(livro);
  }


  async excluir(id: number): Promise<void> {
    const livro = await this.repository.buscarPorId(id)
    if (!livro) throw new Error("Livro não encontrado");
    await this.repository.remover(id);
  }
}