import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { CadastrarProdutoComponent } from './cadastrar-produto/cadastrar-produto.component';
import { ConsultarProdutosComponent } from './consultar-produtos/consultar-produtos.component';
import { EditarProdutosComponent } from './editar-produtos/editar-produtos.component';

const routes: Routes  = [
  {path: '', component: ConsultarProdutosComponent},
  {path : 'cadastrar-produto', component : CadastrarProdutoComponent },
  {path : 'consultar-produtos', component : ConsultarProdutosComponent },
  {path : 'editar-produto/:id', component : EditarProdutosComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    CadastrarProdutoComponent,
    ConsultarProdutosComponent,
    EditarProdutosComponent
  ],
  imports: [
    BrowserModule,        
    RouterModule.forRoot(routes),
    HttpClientModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
