import { NgModule } from '@angular/core';
import { PrimeNGModule } from 'src/app/primeng.module';
import { SharedModule } from './../../shared/shared.module';
import { ProdutoCadastroComponent } from './produto-cadastro/produto-cadastro.component';
import { ProdutosRountingModule } from './produtos.routing';
import { ProdutosListarComponent } from './produto-listar/produtos-listar/produtos-listar.component';


@NgModule({
  declarations: [
    ProdutoCadastroComponent,
    ProdutosListarComponent
    //  EmpresasListaComponent
  ],
  imports: [
    PrimeNGModule,
    SharedModule,
    ProdutosRountingModule
  ],
})
export class ProdutoModule { }
