import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../seguranca/auth.guard';
import { CategoriasListaComponent } from './lista-categorias/categorias-lista.component';
import { CategoriaCadastroComponent } from './cadastro-categoria/categoria-cadastro.component';


const routes: Routes = [
  {
    path: '',
    component: CategoriasListaComponent,
    //canActivate: [AuthGuard],
    data: {roles: ['categorias']}
  },
  {
    path: 'novo',
    component: CategoriaCadastroComponent,
    //canActivate: [AuthGuard],
    data: {roles: ['categorias']}
  },
  {
    path: ':id',
    component: CategoriaCadastroComponent,
    //canActivate: [AuthGuard],
    data: {roles: ['categorias']}
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriasRoutingModule {}
