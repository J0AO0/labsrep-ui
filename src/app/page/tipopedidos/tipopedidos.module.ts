import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { PrimeNGModule } from 'src/app/primeng.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { TipoPedidosListaComponent } from './tipopedidos-lista/tipopedidos-lista.component';
import { TipoPedidosCadastroComponent } from './tipopedidos-cadastro/tipopedidos-cadastro.component';
import { TipoPedidosRoutingModule } from './tipopedidos.routing';


@NgModule({
  declarations: [
    TipoPedidosListaComponent,
    TipoPedidosCadastroComponent
  ],
  imports: [
    PrimeNGModule, 
    SharedModule, 
    FormsModule, 
    TipoPedidosRoutingModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
})
export class TipoPedidosModule { }
