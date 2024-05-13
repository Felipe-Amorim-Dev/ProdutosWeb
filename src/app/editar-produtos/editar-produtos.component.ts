import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environment/environment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-produtos',
  templateUrl: './editar-produtos.component.html',
  styleUrls: ['./editar-produtos.component.css']
})
export class EditarProdutosComponent implements OnInit {

    mensagem: string = '';

    constructor(
      private httpClient: HttpClient,
      private spinner: NgxSpinnerService,
      private activatedRoute: ActivatedRoute
    ){}

    formEdicao = new FormGroup({
      id: new FormControl(''),
      nome: new FormControl('', [Validators.required, Validators.minLength(3)]),
      preco: new FormControl('', [Validators.required, Validators.min(1)]),
      quantidade: new FormControl('', [Validators.required, Validators.min(1)])
    });

    get form(): any{
      return this.formEdicao.controls;
    }

    ngOnInit(): void {
      const id = this.activatedRoute.snapshot.paramMap.get('id') as string;
      this.spinner.show();
      this.httpClient.get(environment.apiProdutos + "/" + id)
        .subscribe({
          next: (data: any) => {
            this.formEdicao.patchValue(data);
          }
        }).add(() =>{
          this.spinner.hide();
        }) 
    }

    onSubmit(): void {
      this.spinner.show();
      this.httpClient.put(environment.apiProdutos + '/atualizar-produto', this.formEdicao.value)
        .subscribe({
          next: (data: any) => {          
            this.mensagem = `Produto ${data.nome}, atualizado com sucesso.`;            
          }
        }).add(() =>{
          this.spinner.hide();
        });
    }

    
}
