import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { PrimeNGModule } from 'src/app/primeng.module';
import { CadastroCategoriaComponent,  } from './cadastro-categoria/cadastro-categoria.component';
import { CategoriasRoutingModule } from './categorias.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListaCategoriasComponent } from './lista-categorias/lista-categorias.component';

@NgModule({
  declarations: [
    CadastroCategoriaComponent, 
    ListaCategoriasComponent,
    
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
