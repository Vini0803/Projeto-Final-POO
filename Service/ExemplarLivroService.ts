import { ExemplarLivro } from "../entity/ExemplarLivro";
import { ExemplarLivroRepository } from "../Repository/ExemplarLivroRepository";
import { LivroService } from "./LivroService";
import { Livro } from "../entity/Livro";

export class ExemplarLivroService {
    private repository: ExemplarLivroRepository;
    private livroService: LivroService;

    constructor() {
        this.repository = new ExemplarLivroRepository();
        this.livroService = new LivroService();
    }

    async cadastrar(livroId: number): Promise<ExemplarLivro> {
        // Buscar o livro primeiro
        const livro = await this.livroService.buscar(livroId);
        if (!livro) {
            throw new Error("Livro não encontrado com o ID fornecido.");
        }

        const exemplar = new ExemplarLivro(livro);
        const novoExemplar = await this.repository.criar(exemplar);


        await this.livroService.incrementarQntdExemplares(livroId);


        return novoExemplar;

    }

    async listarTodos(): Promise<ExemplarLivro[]> {
        return await this.repository.listar();
    }

    async buscar(id: number): Promise<ExemplarLivro | null> {
        return await this.repository.buscarPorId(id);
    }

    async atualizar(id: number, livroId: number): Promise<ExemplarLivro> {
        const exemplar = await this.repository.buscarPorId(id);
        if (!exemplar) {
            throw new Error("Exemplar não encontrado");
        }

        const novoLivro = await this.livroService.buscar(livroId);
        if (!novoLivro) {
            throw new Error("Novo livro não encontrado com o ID fornecido.");
        }

        exemplar.livro = novoLivro;
        return await this.repository.atualizar(exemplar);
    }

    async excluir(idExemplar: number, idLivro: number): Promise<void> {
        const exemplar = await this.repository.buscarPorId(idExemplar);
        if (!exemplar) {
            throw new Error("Exemplar não encontrado");
        }
        
        // Verificar se não está emprestado antes de excluir
        if (!exemplar.disponivel) {
            throw new Error("Não é possível excluir um exemplar que está emprestado");
        }

        const livro = await this.livroService.buscar(idLivro);
        if (!livro) {
            throw new Error("Livro nao encontrado")
        }

        if (exemplar.livro.id !== livro.id){
            throw new Error("O exemplar informado nao pertence a esse livro");
        }

        
        this.livroService.decrementarExemplares(idLivro);
        return await this.repository.remover(idExemplar);
    }
    
}