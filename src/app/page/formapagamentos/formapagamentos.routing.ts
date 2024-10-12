import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../seguranca/auth.guard';

import { FormaPagamentosCadastroComponent } from './formapagamentos-cadastro/formapagamentos-cadastro.component';
import { FormaPagamentosListaComponent } from './formapagamentos-lista/formapagamentos-lista.component';


const routes: Routes = [
  {
    path: '',
    component: FormaPagamentosListaComponent,
    //canActivate: [AuthGuard],
    data: {roles: ['formapagamento']}
  },
  {
    path: 'novo',
    component: FormaPagamentosCadastroComponent,
    //canActivate: [AuthGuard],
    data: {roles: ['formapagamento']}
  },
  {
    path: ':id',
    component: FormaPagamentosCadastroComponent,
    //canActivate: [AuthGuard],
    data: {roles: ['formapagamento']}
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormaPagamentosRoutingModule {}
