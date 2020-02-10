import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { ValidaCnpjComponent } from './validacnpj/validacnpj.component';

import { NgxPaginationModule } from 'ngx-pagination';
import { ToDoListService } from "./services/toDoList/todolist.service";
import { PesquisaToDoListComponent } from './todolist/pesquisa/pesquisa.todolist.component';
import { CadastroToDoListComponent } from './todolist/cadastro/cadastro.todolist.component';
import { SimpleOrderDERComponent } from './simpleOrderDER/simpleOrderDER.component';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    ValidaCnpjComponent,
    CadastroToDoListComponent,
    PesquisaToDoListComponent,
    SimpleOrderDERComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'valida-cnpj', component: ValidaCnpjComponent },
      { path: 'pesquisar-todolist', component: PesquisaToDoListComponent },
      { path: 'cadastrar-todolist', component: CadastroToDoListComponent },
      { path: 'simple-order', component: SimpleOrderDERComponent },
    ])
  ],
  providers: [ToDoListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
