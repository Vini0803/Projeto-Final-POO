import express from "express";
import { AutorController } from '../Controller/AutorController';

const AutorRouter = express.Router();
const autorController = new AutorController();

AutorRouter.get('/', (req, res) => { autorController.listar(req,res) });
AutorRouter.post('/', (req, res) => { autorController.criar(req,res) });
AutorRouter.put('/:id', (req, res) => { autorController.atualizar(req,res) });
AutorRouter.delete('/:id', (req, res) => { autorController.remover(req,res) });

export default AutorRouter;