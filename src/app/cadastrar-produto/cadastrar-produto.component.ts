import { Component } from '@angular/core';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-cadastrar-produto',
  templateUrl: './cadastrar-produto.component.html',
  styleUrls: ['./cadastrar-produto.component.css']
})
export class CadastrarProdutoComponent {

  mensagem: string = '';

  constructor(
    private httpClient: HttpClient,
    private spinner: NgxSpinnerService
  ){}


  formCadastro = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(3)]),
    preco: new FormControl('', [Validators.required, Validators.min(1)]),
    quantidade: new FormControl('', [Validators.required, Validators.min(1)])
  });

  get form(): any {
    return this.formCadastro.controls;
  }

  onSubmit(): void {
    this.spinner.show();
    this.httpClient.post(environment.apiProdutos + '/cadastrar-produto', this.formCadastro.value)
      .subscribe({
        next: (data: any) => {          
          this.mensagem = `produto ${data.nome}, cadastrado com sucesso.`;
          this.formCadastro.reset();
        }
      }).add(() =>{
        this.spinner.hide();
      });
  }

}
