import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { PrimeNGModule } from 'src/app/primeng.module';
import { CondPagamentosRoutingModule } from './condpagamentos.routing';
import { SharedModule } from 'src/app/shared/shared.module';

import { CondPagamentosListaComponent } from './condpagamentos-lista/condpagamentos-lista.component';
import { CondPagamentosCadastroComponent } from './condpagamentos-cadastro/condpagamentos-cadastro.component';


@NgModule({
  declarations: [
    CondPagamentosListaComponent, 
    CondPagamentosCadastroComponent,
    
  ],
  imports: [
    PrimeNGModule, 
    SharedModule, 
    FormsModule, 
    CondPagamentosRoutingModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
})
export class CondPagamentosModule {}
