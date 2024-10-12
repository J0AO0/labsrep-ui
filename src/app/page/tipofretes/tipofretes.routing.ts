import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../seguranca/auth.guard';

import { TipoFretesCadastroComponent } from './tipofretes-cadastro/tipofretes-cadastro.component';
import { TipoFretesListaComponent } from './tipofretes-lista/tipofretes-lista.component';


const routes: Routes = [
  {
    path: '',
    component: TipoFretesListaComponent,
    //canActivate: [AuthGuard],
    data: {roles: ['tipofrete']}
  },
  {
    path: 'novo',
    component: TipoFretesCadastroComponent,
    //canActivate: [AuthGuard],
    data: {roles: ['tipofrete']}
  },
  {
    path: ':id',
    component: TipoFretesCadastroComponent,
    //canActivate: [AuthGuard],
    data: {roles: ['tipofrete']}
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TipoFretesRoutingModule {}
