import { Request, Response } from 'express';
import { EmprestimoService } from '../Service/EmprestimoService';

export class EmprestimoController {
    private emprestimoService: EmprestimoService;

    constructor() {
        this.emprestimoService = new EmprestimoService;
    }

    async criar(req: Request, res: Response): Promise<Response> {
        try {
            const { exemplar, usuario } = req.body;
            const novo = await this.emprestimoService.cadastrar(exemplar, usuario);
            return res.status(201).json(novo);
        } catch (error: any) {
            return res.status(400).json({ message: 'Erro ao criar autor.', error: error.message });
        }
    }

    async listar(req: Request, res: Response): Promise<Response> {
        try {
            const lista = await this.emprestimoService.listarTodos();
            return res.status(200).json(lista);
        } catch (error: any) {
            return res.status(500).json({ message: 'Erro ao listar empréstimos.', error: error.message });
        }
    }

    async atualizar(req: Request, res: Response): Promise<Response> {
        try {
            const id: number = parseInt(req.params.id);
            const { exemplar, usuario } = req.body;
            const autorAtualizado = await this.emprestimoService.atualizar(id, exemplar, usuario);
            return res.status(200).json(autorAtualizado);
        } catch (error: any) {
            return res.status(400).json({ message: 'Erro ao atualizar emprestimo.', error: error.message });
        }
    }

    async remover(req: Request, res: Response): Promise<Response> {
        try {
            const id: number = parseInt(req.params.id);
            await this.emprestimoService.excluir(id);
            return res.status(200).json({ message: `Empréstimo ID ${id} removido com sucesso.` });
        } catch (error: any) {
            return res.status(400).json({ message: 'Erro ao remover empréstimo.', error: error.message });
        }
    }
}