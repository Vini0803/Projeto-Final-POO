import { Request, Response } from 'express';
import { ExemplarLivroService } from '../Service/ExemplarLivroService';

export class ExemplarLivroController {
    private exemplarLivroService: ExemplarLivroService;

    constructor() {
        this.exemplarLivroService = new ExemplarLivroService();
    }

    async criar(req: Request, res: Response): Promise<Response> {
        try {
            const { livroId } = req.body;
            if (!livroId) {
                return res.status(400).json({ 
                    message: 'Erro ao criar exemplar.', 
                    error: 'O ID do livro (livroId) é obrigatório.' 
                });
            }

            const novoExemplar = await this.exemplarLivroService.cadastrar(livroId);
            return res.status(201).json(novoExemplar);
        } catch (error: any) {
            return res.status(400).json({ 
                message: 'Erro ao criar exemplar.', 
                error: error.message 
            });
        }
    }

    async listar(req: Request, res: Response): Promise<Response> {
        try {
            const lista = await this.exemplarLivroService.listarTodos();
            return res.status(200).json(lista);
        } catch (error: any) {
            return res.status(500).json({ 
                message: 'Erro ao listar exemplares.', 
                error: error.message 
            });
        }
    }
    
    async atualizar(req: Request, res: Response): Promise<Response> {
        try {
            const id: number = parseInt(req.params.id);
            const { livroId } = req.body;

            if (!livroId) {
                return res.status(400).json({ 
                    message: 'Erro ao atualizar exemplar.', 
                    error: 'O novo ID do livro (livroId) é obrigatório.' 
                });
            }

            const exemplarAtualizado = await this.exemplarLivroService.atualizar(id, livroId);
            return res.status(200).json(exemplarAtualizado);
        } catch (error: any) {
            return res.status(400).json({ 
                message: 'Erro ao atualizar exemplar.', 
                error: error.message 
            });
        }
    }

    async remover(req: Request, res: Response): Promise<Response> {
        try {
            const id: number = parseInt(req.params.id);
            await this.exemplarLivroService.excluir(id);
            return res.status(200).json({ 
                message: `Exemplar ID ${id} removido com sucesso.` 
            });
        } catch (error: any) {
            return res.status(400).json({ 
                message: 'Erro ao remover exemplar.', 
                error: error.message 
            });
        }
    }
}