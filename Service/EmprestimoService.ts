import { Emprestimo } from "../entity/Emprestimo";
import { EmprestimoRepository } from "../Repository/EmprestimoRepository";
import { UsuarioService } from "./UsuarioService";
import { ExemplarLivro } from "../entity/ExemplarLivro";
import { Usuario } from "../entity/Usuario";
import { ExemplarLivroService } from "./ExemplarLivroService";



export class EmprestimoService {
  private repository: EmprestimoRepository;
  private usuarioService: UsuarioService;
  private exemplarService: ExemplarLivroService;

  constructor() {
    this.repository = new EmprestimoRepository();
    this.usuarioService = new UsuarioService;
    this.exemplarService = new ExemplarLivroService;

  }

  async cadastrar(exemplarId: number, usuarioID: number): Promise<Emprestimo> {
    // eu tenho que verificar se o usuario tem um EMPRESTIMO

    const usuario = await this.usuarioService.buscar(usuarioID);
    const exemplar = await this.exemplarService.buscar(exemplarId);

    if (!usuario) throw new Error("Usuario nao existe");

    if (!exemplar) throw new Error("Esse exemplar nao existe")

    if (usuario.emprestimo) throw new Error("Esse usuario ja tem um emprestimo")

    if (!exemplar.disponivel) throw new Error("esse exemplar nao esta disponivel")

    
  
    exemplar.disponivel = false;

    const emprestimo = new Emprestimo(exemplar, usuario);
    return await this.repository.criar(emprestimo);
  }

  async listarTodos(): Promise<Emprestimo[]> {
    return await this.repository.listar();
  }

  async buscar(id: number): Promise<Emprestimo | null> {
    return await this.repository.buscarPorId(id);
  }

  async atualizar(id: number, exemplar: ExemplarLivro, usuario?: Usuario): Promise<Emprestimo> {
    const emprestimo = await this.repository.buscarPorId(id);
    if (!emprestimo) throw new Error("Emprestimo não encontrado");
    if (exemplar !== undefined) emprestimo.exemplar = exemplar;  
    if (usuario !== undefined) emprestimo.usuario = usuario; 
    return await this.repository.atualizar(emprestimo);
  }


  async excluir(id: number): Promise<void> {
    return await this.repository.remover(id);
  }
}