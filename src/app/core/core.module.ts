import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ValidateEqualModule } from "ng-validate-equal";
import { ConfirmationService, MessageService, SharedModule } from "primeng/api";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { JwtHelperService } from "@auth0/angular-jwt";

import { ValidationService } from "./services/validation.service";
import { PrimeNGModule } from "../primeng.module";
import { ErrorHandlerService } from "./error-handler.service";
import { UsuariosModule } from "../page/usuarios/usuarios.module";
import { UsuariosService } from "../page/usuarios/usuarios.service";
import { NavbarComponent } from "./layout/navbar/navbar.component";
import { LayoutComponent } from "./layout/layout.component";
import { NaoAutorizadoComponent } from "./layout/nao-autorizado/nao-autorizado.component";
import { PaginaNaoEncontradaComponent } from "./layout/pagina-nao-encontrada/pagina-nao-encontrada.component";
import { AuthService } from "../page/seguranca/auth.service";
import { EmpresasService } from "../page/empresas/empresas.service";
import { CategoriasService } from "../page/categorias/categorias.service";
import { ProdutoService } from "../page/produtos/produtos.service";
import { CondPagamentosService } from "../page/condpagamentos/condpagamentos.service";
import { FormaPagamentosService } from "../page/formapagamentos/formapagamentos.service";
import { TipoFretesService } from "../page/tipofretes/tipofretes.service";

@NgModule({
  declarations: [
    NavbarComponent,
    LayoutComponent,
    PaginaNaoEncontradaComponent,
    NaoAutorizadoComponent,
  ],
  imports: [
    PrimeNGModule,
    RouterModule,
    ConfirmDialogModule,
    SharedModule,
    ValidateEqualModule
  ],
  providers: [
    AuthService,
    JwtHelperService,
    ErrorHandlerService,
    ConfirmationService,
    MessageService,
    ValidationService,
    UsuariosService,
    EmpresasService,
    CategoriasService,
    ProdutoService,
    CondPagamentosService,
    FormaPagamentosService,
    TipoFretesService

  ],
  exports: [
    ConfirmDialogModule,
    LayoutComponent,
  ],
})
export class CoreModule { }