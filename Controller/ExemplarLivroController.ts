import { Request, Response } from 'express';
import { ExemplarLivroService } from '../Service/ExemplarLivroService';
import { LivroService } from '../Service/LivroService'; // Assumindo que você tem um LivroService para buscar livros

export class ExemplarLivroController {
    private exemplarLivroService: ExemplarLivroService;
    private livroService: LivroService; // Precisamos do LivroService para encontrar o livro pelo ID

    constructor() {
        this.exemplarLivroService = new ExemplarLivroService();
        this.livroService = new LivroService(); // Instanciando o LivroService
    }

    /**
     * Cria um novo exemplar para um livro já existente.
     * Espera receber o ID do livro no corpo da requisição.
     * Ex: { "livroId": 1 }
     */
    async criar(req: Request, res: Response): Promise<Response> {
        try {
            // 1. Pega o ID do livro do corpo da requisição
            const { livroId } = req.body;
            if (!livroId) {
                return res.status(400).json({ message: 'Erro ao criar exemplar.', error: 'O ID do livro (livroId) é obrigatório.' });
            }

            // 2. Busca o objeto Livro completo usando o ID fornecido
            const livro = await this.livroService.buscar(livroId);
            if (!livro) {
                return res.status(404).json({ message: 'Erro ao criar exemplar.', error: 'Livro não encontrado com o ID fornecido.' });
            }

            // 3. Com o objeto Livro em mãos, chama o serviço para criar o exemplar
            const novoExemplar = await this.exemplarLivroService.cadastrar(livro);
            
            return res.status(201).json(novoExemplar);
        } catch (error: any) {
            return res.status(400).json({ message: 'Erro ao criar exemplar.', error: error.message });
        }
    }

    /**
     * Lista todos os exemplares de livros existentes.
     */
    async listar(req: Request, res: Response): Promise<Response> {
        try {
            const lista = await this.exemplarLivroService.listarTodos();
            return res.status(200).json(lista);
        } catch (error: any) {
            return res.status(500).json({ message: 'Erro ao listar exemplares.', error: error.message });
        }
    }
    
    /**
     * Atualiza o livro ao qual um exemplar pertence.
     * Espera o ID do exemplar nos parâmetros da URL e o novo livroId no corpo.
     * Ex: PUT /exemplares/5 com body { "livroId": 2 }
     */
    async atualizar(req: Request, res: Response): Promise<Response> {
        try {
            const id: number = parseInt(req.params.id);
            const { livroId } = req.body;

            if (!livroId) {
                return res.status(400).json({ message: 'Erro ao atualizar exemplar.', error: 'O novo ID do livro (livroId) é obrigatório.' });
            }

            const novoLivro = await this.livroService.buscar(livroId);
            if (!novoLivro) {
                return res.status(404).json({ message: 'Erro ao atualizar exemplar.', error: 'Novo livro não encontrado com o ID fornecido.' });
            }

            const exemplarAtualizado = await this.exemplarLivroService.atualizar(id, novoLivro);
            return res.status(200).json(exemplarAtualizado);
        } catch (error: any) {
            return res.status(400).json({ message: 'Erro ao atualizar exemplar.', error: error.message });
        }
    }

    async remover(req: Request, res: Response): Promise<Response> {
        try {
            const id: number = parseInt(req.params.id);
            await this.exemplarLivroService.excluir(id);
            return res.status(200).json({ message: `Exemplar ID ${id} removido com sucesso.` });
        } catch (error: any) {
            return res.status(400).json({ message: 'Erro ao remover exemplar.', error: error.message });
        }
    }
}