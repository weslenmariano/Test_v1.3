import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { ToDoList } from "../../modelo/toDoList";
import { ToDoListService } from "../../services/toDoList/todolist.service";
import { Router } from "@angular/router";




@Component({
  selector: "pesquisar-todolist",
  templateUrl: "./pesquisa.todolist.component.html",
  styleUrls: ["./pesquisa.todolist.component.css"],
 })

export class PesquisaToDoListComponent implements OnInit {

  public todolists: ToDoList[];
  public todolistDeletar: ToDoList;
  public esperaDeletar: boolean;
  public ativarSpinnerBuscar: boolean;

  public possuiPaginas: boolean;
  public paginaAtual = 1;
  public itensNaPag = 10;

  public filtrar: boolean;

  @ViewChild('fechaModalPeloEventoDeOutroBotao') closeAddExpenseModal: ElementRef;


  ngOnInit(): void {

  }
  
  constructor(private todolistServico: ToDoListService, private router: Router) {
    this.ObterToDoList();
   


  }

  public ObterToDoList() {
    this.todolistServico.obterTodosListaTarefas().subscribe(
      todolists => {
        this.todolists = todolists;
        if (this.todolists.length > 10) { this.possuiPaginas = true; } else { this.possuiPaginas = false; }
      },
      erro => {
        console.log(erro.error);
      }
    )
  }
  
  public adicionarToDoList() {
    sessionStorage.setItem('todolistSession', "");
    this.router.navigate(['../cadastrar-todolist']);

  }

  public setadeletarToDoList(todolist: ToDoList) {
    this.todolistDeletar = todolist;
  }

  public deletarToDoList(todolist: ToDoList) {

    this.todolistDeletar = todolist;
 

  }

  public DeletarConfirmado() {
    this.esperaDeletar = true;

   
    if (this.todolistDeletar) {
      this.todolistServico.deletar(this.todolistDeletar).subscribe(
        todolists => {
          this.todolists = todolists;

        },
        erro => {
          console.log(erro.error);
        }
      )
    }
    //graças a biblioteca de ViewChild, ElementRef do angular core
    //referencia o botao superior direito do modal (que possui o data-dismiss), chamando o evento de clique nele, ao qual fecha o modal por aqui.

    this.LimparSessao();
    this.esperaDeletar = false;

    this.closeAddExpenseModal.nativeElement.click();

  }

  public DeletarCancelado() {
    this.esperaDeletar = false;
  }

  public editarToDoList(todolist: ToDoList) {

    console.log(JSON.stringify(todolist))

    sessionStorage.setItem('todolistSession', JSON.stringify(todolist));
    this.router.navigate(['../cadastrar-todolist']);

  }

  public LimparSessao() {
    sessionStorage.setItem('todolistSession', "");
  }

  public exibirFiltro() {
    this.filtrar = !this.filtrar;
    if (this.filtrar == false) {
      (<HTMLSelectElement>document.getElementById('inputBuscar')).value = "";
      this.filtrarResultados();
    }
  }

  public filtrarResultados() {
    //alert("filtrarResultados");
    //recuperando o value do campo na pagina html;
    var filtro = (<HTMLSelectElement>document.getElementById('inputBuscar')).value;
    this.ativarSpinnerBuscar = true;
    this.todolistServico.obterTodosListaTarefas()
      .subscribe(
        todolists => {
          this.todolists = todolists.filter(p => p.taskTitle.toLowerCase().search(filtro.toLowerCase()) != -1 || p.taskDescription.toLowerCase().search(filtro.toLowerCase()) != -1);
          if (this.todolists.length > 10) { this.possuiPaginas = true; } else { this.possuiPaginas = false; }
          this.ativarSpinnerBuscar = false;
        },
        erro => {
          console.log(erro.error);
        }
      )
  }


}
