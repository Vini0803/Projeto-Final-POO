import express from "express";
import { UsuarioController } from '../Controller/UsuarioController';

const UsuarioRouter = express.Router();
const usuarioController = new UsuarioController();

UsuarioRouter.get('/', (req, res) => { usuarioController.listar(req,res) });
UsuarioRouter.post('/', (req, res) => { usuarioController.criar(req,res) });
UsuarioRouter.put('/:id', (req, res) => { usuarioController.atualizar(req,res) });
UsuarioRouter.delete('/:id', (req, res) => { usuarioController.remover(req,res) });

export default UsuarioRouter;