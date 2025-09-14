import express from "express";
import { EmprestimoController } from '../Controller/EmprestimoController';

const EmprestimoRouter = express.Router();
const emprestimoController = new EmprestimoController();

EmprestimoRouter.get('/', (req, res) => { emprestimoController.listar(req,res) });
EmprestimoRouter.post('/', (req, res) => { emprestimoController.criar(req,res) });
EmprestimoRouter.put('/:id', (req, res) => { emprestimoController.atualizar(req,res) });
EmprestimoRouter.delete('/:id', (req, res) => { emprestimoController.remover(req,res) });

export default EmprestimoRouter;