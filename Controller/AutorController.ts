import { Request, Response } from 'express';
import { AutorService } from '../Service/AutorService';

export class AutorController {
    private autorService: AutorService;

    constructor() {
        this.autorService = new AutorService();
    }

    async criar(req: Request, res: Response): Promise<Response> {
        try {
            const { nome, nacionalidade } = req.body;
            const novo = await this.autorService.cadastrar(nome, nacionalidade);
            return res.status(201).json(novo);
        } catch (error: any) {
            return res.status(400).json({ message: 'Erro ao criar autor.', error: error.message });
        }
    }

    async listar(req: Request, res: Response): Promise<Response> {
        try {
            const lista = await this.autorService.listarTodos();
            return res.status(200).json(lista);
        } catch (error: any) {
            return res.status(500).json({ message: 'Erro ao listar autores.', error: error.message });
        }
    }

    async atualizar(req: Request, res: Response): Promise<Response> {
        try {
            const id: number = parseInt(req.params.id);
            const { nome, nacionalidade } = req.body;
            const autorAtualizado = await this.autorService.atualizar(id, nome, nacionalidade);
            return res.status(200).json(autorAtualizado);
        } catch (error: any) {
            return res.status(400).json({ message: 'Erro ao atualizar autor.', error: error.message });
        }
    }

    async remover(req: Request, res: Response): Promise<Response> {
        try {
            const id: number = parseInt(req.params.id);
            await this.autorService.excluir(id);
            return res.status(200).json({ message: `Autor ID ${id} removida com sucesso.` });
        } catch (error: any) {
            return res.status(400).json({ message: 'Erro ao remover autor.', error: error.message });
        }
    }
}