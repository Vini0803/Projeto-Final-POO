import { Emprestimo } from "../entity/Emprestimo";
import { EmprestimoRepository } from "../Repository/EmprestimoRepository";
import { UsuarioService } from "./UsuarioService";
import { ExemplarLivro } from "../entity/ExemplarLivro";
import { Usuario } from "../entity/Usuario";



export class EmprestimoService {
  private repository: EmprestimoRepository;
  private usuarioService: UsuarioService;

  constructor() {
    this.repository = new EmprestimoRepository();
    this.usuarioService = new UsuarioService;

  }

  async cadastrar(exemplar: ExemplarLivro, usuarioID: number): Promise<Emprestimo> {
    // eu tenho que verificar se o usuario tem um EMPRESTIMO

    const usuario = await this.usuarioService.buscar(usuarioID);
    if (!usuario) throw new Error("Usuario nao existe");

    if (usuario.emprestimo) throw new Error("Esse usuario ja tem um emprestimo") 

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