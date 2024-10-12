import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LazyLoadEvent, MenuItem, PrimeNGConfig } from 'primeng/api';

import { AuthService } from '../../seguranca/auth.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { ValidationService } from 'src/app/core/services/validation.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Paginator } from 'primeng/paginator';
import { Table } from 'primeng/table';
import { FiltrosTipoFretes } from 'src/app/core/models/filtros.model';
import { TipoFretesService } from '../tipofretes.service';

@Component({
  selector: 'app-tipofretes-lista',
  templateUrl: './tipofretes-lista.component.html',
  styleUrls: ['./tipofretes-lista.component.css']
})
export class TipoFretesListaComponent implements OnInit {

  @ViewChild('tabela') table: Table;
  @ViewChild('paginator') paginator: Paginator;
  @ViewChild('buttonFilter') buttonFilter: ElementRef;

  rowsPerPageTable: number[] = [10, 25, 50, 100, 200];
  tipofretes = [];
  sinal = true;
  status = 'Ativo';
  cols: any[];
  salvando: boolean;
  totalRegistros = 0;
  messageDrop = 'Nenhum resultado encontrado...';
  valorTooltip = 'Inativos';
  messagePageReport = 'Mostrando {first} a {last} de {totalRecords} registros';
  items: MenuItem[];
  timeout: any;
  totalPages = 0;
  first = 1;
  blockBtnFilter = false;

  filtro: FiltrosTipoFretes = new FiltrosTipoFretes(); // Inicializando o filtro

  constructor(
    private title: Title,
    private tipoService: TipoFretesService,
    public auth: AuthService,
    private conf: PrimeNGConfig,
    private errorHandler: ErrorHandlerService,
    private validationService: ValidationService,
    private spinner: NgxSpinnerService
  ) { }

  onClear() {
    this.cols.forEach(col => {
      if (col.qty !== null && col.qty !== undefined) {
        col.qty = null;
      }
    });
    this.carregarTipoFrete();
  }

  refresh() {
    this.carregarTipoFrete();
  }

  ngOnInit() {
    this.conf.ripple = true;
    this.title.setTitle('Tipo de Fretes');
    this.carregarTipoFrete();

    this.items = [
      {
        label: 'Ativo / Inativo',
        icon: 'pi pi-sort-alt',
        command: () => {
          this.AlternarLista();
        },
      }
    ];

    this.cols = [
      { field: 'id', header: 'Código', width: '130px', type: 'numeric' },
      { field: 'descricao', header: 'Descrição', width: '250px', type: 'text' },
      { field: 'datagravacao', header: 'Data Gravação', width: '170px', type: 'date', data: true, format: `dd/MM/yyyy H:mm` },
      { field: 'emailusuario', header: 'Usuário Gravação', width: '190px', type: 'text' }
    ];
  }

  changePage(event: LazyLoadEvent) {
    this.filtro.pagina = event.first / event.rows; // Atualiza a página no filtro
    this.filtro.itensPorPagina = event.rows; // Atualiza itens por página no filtro
    this.carregarTipoFrete();
  }

  carregarTipoFrete() {
    this.spinner.show();
    // Preencher o filtro com valores apropriados, como status
    this.filtro.status = this.status;
    this.tipoService.listarComFiltro(this.filtro) // Passando o objeto filtro completo
      .then(obj => {
        this.tipofretes = obj.content;
        this.totalRegistros = obj.totalElements;
        this.totalPages = obj.totalPages;
        this.spinner.hide();
      })
      .catch((erro) => {
        this.spinner.hide();
        this.errorHandler.handle(erro);
      });
  }

  AlternarLista() {
    this.status = this.status === 'Ativos' ? 'Inativos' : 'Ativos';
    this.carregarTipoFrete();
  }

  FirstPage() {
    this.paginator.changePage(0);
  }

  btnBlock() {
    setTimeout(() => {
      this.blockBtnFilter = false;
    }, 680);
  }

  verifyFocus() {
    this.buttonFilter.nativeElement.focus();
  }
}
