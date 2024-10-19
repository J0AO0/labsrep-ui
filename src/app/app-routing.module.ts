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
    path: 'dashboard' , loadChildren: () => 
    import('./page/dashboards/dashboard.module').then(m => m.DashboardsModule)
  },
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
    import('./page/produtos/produtos.module').then(m =>  m.ProdutosModule)
  },
  {
    path: 'pedidos', loadChildren: () =>
    import('./page/pedidos/pedidos.module').then(m =>  m.PedidosModule)
  },
  {
    path: 'tipopedidos', loadChildren: () =>
    import('./page/tipopedidos/tipopedidos.module').then(m =>  m.TipoPedidosModule)
  },
  {
    path: 'condpagamentos', loadChildren: () =>
    import('./page/condpagamentos/condpagamentos.module').then(m =>  m.CondPagamentosModule)
  },
  {
    path: 'formapagamentos', loadChildren: () =>
    import('./page/formapagamentos/formapagamentos.module').then(m =>  m.FormaPagamentosModule)
  },
  {
    path: 'tipofretes', loadChildren: () =>
    import('./page/tipofretes/tipofretes.module').then(m =>  m.TipoFretesModule)
  },
  
 // { path: 'alterarsenha', component: AlterarSenhaComponent },

  { path: 'nao-autorizado', component: NaoAutorizadoComponent },

  { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent },

  { path: '**', redirectTo: 'dashboard  ' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
