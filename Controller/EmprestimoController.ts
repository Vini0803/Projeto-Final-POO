// EmprestimoController.ts
import { Request, Response } from 'express';
import { EmprestimoService } from '../Service/EmprestimoService';

export class EmprestimoController {
  private emprestimoService: EmprestimoService;

  constructor() {
    this.emprestimoService = new EmprestimoService();
  }

  async criar(req: Request, res: Response): Promise<Response> {
    try {
      const { exemplarId, usuarioId } = req.body;

      // validação bem básica de entrada
      if (exemplarId == null || usuarioId == null) {
        return res.status(400).json({ message: 'exemplarId e usuarioId são obrigatórios.' });
      }
      const exId = Number(exemplarId);
      const usId = Number(usuarioId);
      if (Number.isNaN(exId) || Number.isNaN(usId)) {
        return res.status(400).json({ message: 'exemplarId e usuarioId devem ser números.' });
      }

      // delega tudo para o service (onde estão as verificações)
      const emprestimo = await this.emprestimoService.cadastrar(exId, usId);

      return res.status(201).json(emprestimo);
    } catch (error: any) {
      return res.status(400).json({ message: error?.message ?? 'Erro ao criar empréstimo.' });
    }
  }
}
