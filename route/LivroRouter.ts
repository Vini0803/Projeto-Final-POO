import express from "express";
import { LivroController } from '../Controller/LivroController';

const LivroRouter = express.Router();
const livroController = new LivroController();

LivroRouter.get('/', (req, res) => { livroController.listar(req,res) });
LivroRouter.post('/', (req, res) => { livroController.criar(req,res) });
LivroRouter.put('/:id', (req, res) => { livroController.atualizar(req,res) });
LivroRouter.delete('/:id', (req, res) => { livroController.remover(req,res) });

export default LivroRouter;