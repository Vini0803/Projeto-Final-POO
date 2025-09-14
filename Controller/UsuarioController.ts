import { Request, Response } from 'express';
import { UsuarioService } from '../Service/UsuarioService';

export class UsuarioController {
    private usuarioService: UsuarioService;

    constructor() {
        this.usuarioService = new UsuarioService();
    }

    async criar(req: Request, res: Response): Promise<Response> {
        try {
            const { nome, email } = req.body;


            const novo = await this.usuarioService.cadastrar( nome, email );
            return res.status(201).json(novo);
        } catch (error: any) {
            return res.status(400).json({ message: 'Erro ao criar usuario.', error: error.message });
        }
    }

    async listar(req: Request, res: Response): Promise<Response> {
        try {
            const lista = await this.usuarioService.listarTodos();
            return res.status(200).json(lista);
        } catch (error: any) {
            return res.status(500).json({ message: 'Erro ao listar usuarios.', error: error.message });
        }
    }

    async atualizar(req: Request, res: Response): Promise<Response> {
        try {
            const id: number = parseInt(req.params.id);
            const { nome, email } = req.body;
            const usuarioAtualizado = await this.usuarioService.atualizar(id, nome, email);
            return res.status(200).json(usuarioAtualizado);
        } catch (error: any) {
            return res.status(400).json({ message: 'Erro ao atualizar usuario.', error: error.message });
        }
    }

    async remover(req: Request, res: Response): Promise<Response> {
        try {
            const id: number = parseInt(req.params.id);
            await this.usuarioService.excluir(id);
            return res.status(200).json({ message: `Usuario ID ${id} removido com sucesso.` });
        } catch (error: any) {
            return res.status(400).json({ message: 'Erro ao remover usuario.', error: error.message });
        }
    }
}