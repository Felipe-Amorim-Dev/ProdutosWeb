import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-consultar-produtos',
  templateUrl: './consultar-produtos.component.html',
  styleUrls: ['./consultar-produtos.component.css']
})
export class ConsultarProdutosComponent implements OnInit {

    produtos: any[] = [];
    mensagem: string = '';

    constructor(
      private httpClient: HttpClient,
      private spinner: NgxSpinnerService
    ){}

    ngOnInit(): void {
      this.spinner.show
      this.httpClient.get(environment.apiProdutos + '/consultar-produtos')
        .subscribe({
          next: (data) => {
            this.produtos = data as any[];
          }
        }).add(() =>{
          this.spinner.hide();
        })
    }

    onDelete(id: string): void {
      if(window.confirm('Deseja realmente excluir o produto?'))

        this.spinner.show();

        this.httpClient.delete(environment.apiProdutos + "/" + id)
          .subscribe({
            next: (data: any) => {
              this.mensagem = `Produto ${data.nome}, excluido com sucesso.`
              this.ngOnInit();
            }
          }).add(() => {
            this.spinner.hide();
          })
    }

}
