import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { PrimeNGModule } from 'src/app/primeng.module';
import { CategoriasRoutingModule } from './categorias.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { CategoriasListaComponent } from './lista-categorias/categorias-lista.component';
import { CategoriaCadastroComponent } from './cadastro-categoria/categoria-cadastro.component';

@NgModule({
  declarations: [
    CategoriaCadastroComponent, 
    CategoriasListaComponent,
    
  ],
  imports: [
    PrimeNGModule, 
    SharedModule, 
    FormsModule, 
    CategoriasRoutingModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
})
export class CategoriasModule {}
