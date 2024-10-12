import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { PrimeNGModule } from 'src/app/primeng.module';
import { FormaPagamentosRoutingModule } from './formapagamentos.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormaPagamentosListaComponent } from './formapagamentos-lista/formapagamentos-lista.component';
import { FormaPagamentosCadastroComponent } from './formapagamentos-cadastro/formapagamentos-cadastro.component';



@NgModule({
  declarations: [
    FormaPagamentosListaComponent, 
    FormaPagamentosCadastroComponent,
    
  ],
  imports: [
    PrimeNGModule, 
    SharedModule, 
    FormsModule, 
    FormaPagamentosRoutingModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
})
export class FormaPagamentosModule {}
