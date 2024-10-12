import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { PrimeNGModule } from 'src/app/primeng.module';
import { TipoFretesRoutingModule } from './tipofretes.routing';
import { SharedModule } from 'src/app/shared/shared.module';

import { TipoFretesListaComponent } from './tipofretes-lista/tipofretes-lista.component';
import { TipoFretesCadastroComponent } from './tipofretes-cadastro/tipofretes-cadastro.component';


@NgModule({
  declarations: [
    TipoFretesListaComponent, 
    TipoFretesCadastroComponent,
    
  ],
  imports: [
    PrimeNGModule, 
    SharedModule, 
    FormsModule, 
    TipoFretesRoutingModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
})
export class TipoFretesModule {}
