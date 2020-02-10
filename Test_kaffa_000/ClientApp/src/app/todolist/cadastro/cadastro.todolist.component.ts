import { Component, OnInit } from "@angular/core"
import { ToDoListService } from "../../services/toDoList/todolist.service";
import { ToDoList } from "../../modelo/toDoList";
import { Router } from "@angular/router";

@Component({
  selector: "app-todolist", 
  templateUrl: "./cadastro.todolist.component.html", //pagina que sera renderizada na pagina
  styleUrls: ["./cadastro.todolist.component.css"] // arquio de stilo que sera utilizado na pagina renderizada
})
export class CadastroToDoListComponent implements OnInit {
  // nome das classes começando em maiusculo devido convencao PascalCase

  // camelCase - para variaveis, atributos e nomes das funcoes, começa com minusculo.
  
  public todolist: ToDoList;
  public mensagem: string;

  public ativarSpinner: boolean;

  


  constructor(private todolistServico: ToDoListService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    var todolistSession = sessionStorage.getItem('todolistSession');

    if (todolistSession != "") {
      //RECUPERANDO DADOS  DA SESSAO
      this.todolist = JSON.parse(todolistSession);
    
    }
    else {
      this.todolist = new ToDoList();
    }
  }
   
  public cadastrar() {
    this.ativarEspera();
    this.todolistServico.cadastrar(this.todolist)
      .subscribe(
        todolistJson => {
          console.log(todolistJson);
          this.desativarEspera();
          this.router.navigate(['/pesquisar-todolist']);
        },
        err => {
          this.mensagem = err.error;
          console.log(err.error);
          this.desativarEspera();
        }
      );


  }

  public LimparSessao() {
    sessionStorage.setItem('todolistSession', "");
  
  }
  public ativarEspera() {
    this.ativarSpinner = true;
  }

  public desativarEspera() {
    this.ativarSpinner = false;
  }
}
