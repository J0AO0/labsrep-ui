import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../seguranca/auth.guard';

import { CondPagamentosCadastroComponent } from './condpagamentos-cadastro/condpagamentos-cadastro.component';
import { CondPagamentosListaComponent } from './condpagamentos-lista/condpagamentos-lista.component';


const routes: Routes = [
  {
    path: '',
    component: CondPagamentosListaComponent,
    //canActivate: [AuthGuard],
    data: {roles: ['condpagamento']}
  },
  {
    path: 'novo',
    component: CondPagamentosCadastroComponent,
    //canActivate: [AuthGuard],
    data: {roles: ['condpagamento']}
  },
  {
    path: ':id',
    component: CondPagamentosCadastroComponent,
    //canActivate: [AuthGuard],
    data: {roles: ['condpagamento']}
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CondPagamentosRoutingModule {}
