import { Injectable, Inject, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { ToDoList } from "../../modelo/toDoList";

@Injectable({
  providedIn: "root"
})

export class ToDoListService implements OnInit {


  private _baseUrl: string;
  public todolists: ToDoList[];

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this._baseUrl = baseUrl;
  }

  ngOnInit(): void {
    this.todolists = [];
  }


  get headers(): HttpHeaders {
    return new HttpHeaders().set('content-type', 'application/json');
  }


  public cadastrar(todolist: ToDoList): Observable<ToDoList> {

    return this.http.post<ToDoList>(this._baseUrl + "api/todolist", JSON.stringify(todolist), { headers: this.headers });
  }


  //public salvar(todolist: ToDoList): Observable<ToDoList> {

  //  return this.http.post<ToDoList>(this._baseUrl + "api/todolist/salvar", JSON.stringify(todolist), { headers: this.headers });
  //}

  public deletar(todolist: ToDoList): Observable<ToDoList[]> {


    return this.http.post<ToDoList[]>(this._baseUrl + "api/todolist/deletar", JSON.stringify(todolist), { headers: this.headers });
  }

  public obterTodosListaTarefas(): Observable<ToDoList[]> {

    return this.http.get<ToDoList[]>(this._baseUrl + "api/todolist");
  }

 

  //public obterProduto(todolistId: number): Observable<ToDoList> {

  //  return this.http.get<ToDoList>(this._baseUrl + "api/todolist/GetById");
  //}
  
}
