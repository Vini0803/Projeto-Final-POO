import { banco } from "./banco"
import express from 'express';
import AutorRouter from "./route/AutorRouter";
import LivroRouter from "./route/LivroRouter"
import UsuarioRouter from "./route/UsuarioRouter";
import ExemplarLivroRouter from "./route/ExemplarLivroRouter"
import EmprestimoRouter from "./route/EmprestimoRouter";

const minhaAPI = express();
minhaAPI.use(express.json());

// Registra as rotas
minhaAPI.use('/autor', AutorRouter);
minhaAPI.use('/livro', LivroRouter);
minhaAPI.use('/usuario', UsuarioRouter)
minhaAPI.use('/exemplar', ExemplarLivroRouter)
minhaAPI.use('/emprestimo', EmprestimoRouter)

const porta = 3000;

minhaAPI.listen(porta, async() => {
    
    banco.initialize().then(() => {
        console.log("Conexão com o banco de dados efetuada com sucesso.")
    }).catch((erro) => console.log(erro));

    console.log(`Servidor web rodando na porta ${porta}`);
});