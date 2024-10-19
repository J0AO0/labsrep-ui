import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../seguranca/auth.guard';
import { TipoPedidosCadastroComponent } from './tipopedidos-cadastro/tipopedidos-cadastro.component';
import { TipoPedidosListaComponent } from './tipopedidos-lista/tipopedidos-lista.component';



const routes: Routes = [
  {
    path: '',
    component: TipoPedidosListaComponent,
    //canActivate: [AuthGuard],
    data: {roles: ['tipopedido']}
  },
  {
    path: 'novo',
    component: TipoPedidosCadastroComponent,
    //canActivate: [AuthGuard],
    data: {roles: ['tipopedido']}
  },
  {
    path: ':id',
    component: TipoPedidosCadastroComponent,
    //canActivate: [AuthGuard],
    data: {roles: ['tipopedido']}
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TipoPedidosRoutingModule {}
