import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../seguranca/auth.guard';
import { CadastroCategoriaComponent } from './cadastro-categoria/cadastro-categoria.component';
import { ListaCategoriasComponent } from './lista-categorias/lista-categorias.component';


const routes: Routes = [
  {
    path: '',
    component: ListaCategoriasComponent,
     //canActivate: [AuthGuard],
    data: {roles: ['categorias']}
  },
  {
    path: 'novo',
    component: CadastroCategoriaComponent,
    // canActivate: [AuthGuard],
    data: {roles: ['categorias']}
  },
  {
    path: ':id',
    component: CadastroCategoriaComponent,
    //canActivate: [AuthGuard],
    data: {roles: ['categorias']}
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriasRoutingModule {}
