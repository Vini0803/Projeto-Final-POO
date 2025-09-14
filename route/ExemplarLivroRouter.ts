import express from "express";
import { ExemplarLivroController } from '../Controller/ExemplarLivroController';

const ExemplarLivroRouter = express.Router();
const exemplarLivroRouter = new ExemplarLivroController();

ExemplarLivroRouter.get('/', (req, res) => { exemplarLivroRouter.listar(req,res) });
ExemplarLivroRouter.post('/', (req, res) => { exemplarLivroRouter.criar(req,res) });
ExemplarLivroRouter.put('/:id', (req, res) => { exemplarLivroRouter.atualizar(req,res) });
ExemplarLivroRouter.delete('/:id', (req, res) => { exemplarLivroRouter.remover(req,res) });

export default ExemplarLivroRouter;