import { Request, Response } from 'express';
import { EmprestimoService } from '../Service/EmprestimoService';
import { ExemplarLivroService } from '../Service/ExemplarLivroService';

export class EmprestimoController {
    private emprestimoService: EmprestimoService;
    private exemplarLivroService: ExemplarLivroService;

    constructor() {
        this.emprestimoService = new EmprestimoService();
        this.exemplarLivroService = new ExemplarLivroService();
    }

    async criar(req: Request, res: Response): Promise<Response> {
    try {
        const exemplarId = Number(req.body.exemplarId);
        const usuarioId  = Number(req.body.usuarioId);
        
        // Buscar o exemplar pelo ID
        const exemplar = await this.exemplarLivroService.buscar(exemplarId);
        if (!exemplar) {
            return res.status(404).json({ message: 'Exemplar não encontrado.' });
        }
        
        const novo = await this.emprestimoService.cadastrar(exemplarId, usuarioId);
        return res.status(201).json(novo);
    } catch (error: any) {
        return res.status(400).json({ message: 'Erro ao criar empréstimo.', error: error.message });
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