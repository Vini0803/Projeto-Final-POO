import { Request, Response } from 'express';
import { LivroService } from '../Service/LivroService';

export class LivroController {
    private livroService: LivroService;

    constructor() {
        this.livroService = new LivroService();
    }

    async criar(req: Request, res: Response): Promise<Response> {
        try {
            const { titulo, isbn, ano, autorID, exemplares } = req.body;


            const novo = await this.livroService.cadastrar( titulo, isbn, ano, exemplares, autorID );
            return res.status(201).json(novo);
        } catch (error: any) {
            return res.status(400).json({ message: 'Erro ao criar livro.', error: error.message });
        }
    }

    async listar(req: Request, res: Response): Promise<Response> {
        try {
            const lista = await this.livroService.listarTodos();
            return res.status(200).json(lista);
        } catch (error: any) {
            return res.status(500).json({ message: 'Erro ao listar livros.', error: error.message });
        }
    }

    async atualizar(req: Request, res: Response): Promise<Response> {
        try {
            const id: number = parseInt(req.params.id);
            const { titulo, isbn, ano, autorID, exemplares } = req.body;
            const livroAtualizado = await this.livroService.atualizar(id, titulo, isbn, ano, autorID);
            return res.status(200).json(livroAtualizado);
        } catch (error: any) {
            return res.status(400).json({ message: 'Erro ao atualizar livro.', error: error.message });
        }
    }

    async remover(req: Request, res: Response): Promise<Response> {
        try {
            const id: number = parseInt(req.params.id);
            await this.livroService.excluir(id);
            return res.status(200).json({ message: `Livro ID ${id} removido com sucesso.` });
        } catch (error: any) {
            return res.status(400).json({ message: 'Erro ao remover livro.', error: error.message });
        }
    }
}