import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NaoAutorizadoComponent } from './core/layout/nao-autorizado/nao-autorizado.component';
import { PaginaNaoEncontradaComponent } from './core/layout/pagina-nao-encontrada/pagina-nao-encontrada.component';
//import { NaoAutorizadoComponent } from './core/layout/nao-autorizado/nao-autorizado.component';
//import { PaginaNaoEncontradaComponent } from './core/layout/pagina-nao-encontrada/pagina-nao-encontrada.component';
//import { AlterarSenhaComponent } from './pages/usuarios/alterar-senha/alterar-senha.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
{
    path: 'empresas' , loadChildren: () => 
    import('./page/empresas/empresas.module').then(m => m.EmpresaModule)
  },
  {
    path: 'categorias', loadChildren: () =>
    import('./page/categorias/categorias.module').then(m =>  m.CategoriasModule)
  },
 {
    path: 'usuarios', loadChildren: () =>
    import('./page/usuarios/usuarios.module').then(m =>  m.UsuariosModule)
  },
  {
    path: 'produtos', loadChildren: () =>
    import('./page/produtos/produto.module').then(m =>  m.ProdutoModule)
  },
 // { path: 'alterarsenha', component: AlterarSenhaComponent },

  { path: 'nao-autorizado', component: NaoAutorizadoComponent },

  { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent },

  { path: '**', redirectTo: 'pagina-nao-encontrada' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
