import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { LazyLoadEvent, MenuItem, PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { CategoriasService } from '../categorias.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Paginator } from 'primeng/paginator';
import { FiltrosCategorias } from 'src/app/core/models/filtros.model';
import { AuthService } from '../../seguranca/auth.service';
import { FiltroCategoriasService } from 'src/app/core/services/filtros-services/filtro-categorias.service';
import { ValidationService } from 'src/app/core/services/validation.service';

@Component({
  selector: 'app-categorias-lista',
  templateUrl: './categorias-lista.component.html',
  styleUrls: ['./categorias-lista.component.css']
})
export class CategoriasListaComponent implements OnInit {

  @ViewChild('tabela') table: Table;
  @ViewChild('paginator') paginator: Paginator;
  @ViewChild('buttonFilter') buttonFilter: ElementRef; s


  rowsPerPageTable: number[] = [10, 25, 50, 100, 200];
  categorias = [];
  sinal = true;
  status = 'Ativo';
  cols: any[];
  salvando: boolean;
  dateRangeStart: string;
  dateRangeEnd: string;
  selectedCategoria: any;
  rangeDatesFiltroDataNasc: Date[];
  rangeDatesFiltroGravacao: Date[];
  totalRegistros: 0;
  messageDrop = 'Nenhum resultado encontrado...';
  valorTooltip = 'Inativos';
  messagePageReport = 'Mostrando {first} a {last} de {totalRecords} registros';
  items: MenuItem[];
  timeout: any;
  datagravacaode: string;
  datagravacaoate: string;
  totalPages = 0;
  first = 1;
  blockBtnFilter = false;
  filtro = new FiltrosCategorias()

  constructor(
    private title: Title,
    private catService: CategoriasService,
    public auth: AuthService,
    private conf: PrimeNGConfig,
    private errorHandler: ErrorHandlerService,
    private validationService: ValidationService,
    private spinner: NgxSpinnerService,
    private filtroCategoria: FiltroCategoriasService
  ) { }

  onClear() {
    this.cols.forEach(col => {
      if (col.qty === null || col.qty === undefined) { } else {
        col.qty = null;
      }
    });
    this.datagravacaode = null;
    this.datagravacaoate = null;
    this.filtro = new FiltrosCategorias();
    this.filtroDefault();
    this.carregarCategoria();
  }

  refresh() {
    this.carregarCategoria();
  }

  filtroDefault() {
    this.filtro.pagina = 0;
    this.filtro.itensPorPagina = 10;
    this.filtro.status = 'Ativos';
  }

  ngOnInit() {
    this.filtroDefault();
    this.conf.ripple = true;
    this.title.setTitle('Categorias');
    // this.carregarPacientes();

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
      { field: 'nome', header: 'Descrição', width: '250px', type: 'text' },
      { field: 'datagravacao', header: 'Data Gravação', width: '170px', type: 'date', data: true, format: `dd/MM/yyyy H:mm` },
      { field: 'emailusuario', header: 'Usuário Gravação', width: '190px', type: 'text' }
    ];

  }


  changePage(event: LazyLoadEvent) {
    this.filtro.pagina = event.first / event.rows;
    this.filtro.itensPorPagina = event?.rows;
    this.carregarCategoria();
  }


  carregarCategoria() {
    this.spinner.show();
    this.catService.listarComFiltro(this.filtro)
      .then(obj => {
        this.categorias = obj.content;
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
    if (this.filtro.status === 'Ativos') {
      this.filtro.status = 'Inativos';
    } else {
      this.filtro.status = 'Ativos';
    }
    this.carregarCategoria();
  }

  searchData(tipo: string) {

    if (tipo === 'datagravacaode') {
      if (this.datagravacaode && this.datagravacaode.length === 10) {
        const dia = this.datagravacaode.substring(0, 2);
        const mes = this.datagravacaode.substring(3, 5);
        const ano = this.datagravacaode.substring(6, 10);
        this.filtro.datagravacaode = ano + '-' + mes + '-' + dia;
      } else {
        this.filtro.datagravacaode = '';
      }
    }
    if (tipo === 'datagravacaoate') {
      if (this.datagravacaoate && this.datagravacaoate.length === 10) {
        const dia = this.datagravacaoate.substring(0, 2);
        const mes = this.datagravacaoate.substring(3, 5);
        const ano = this.datagravacaoate.substring(6, 10);
        this.filtro.datagravacaoate = ano + '-' + mes + '-' + dia;
      } else {
        this.filtro.datagravacaoate = '';
      }
    }
    if (this.timeout) { clearTimeout(this.timeout); }
    this.timeout = setTimeout(() => {
      this.carregarCategoria();
      this.FirstPage();
    }, 800);
  }

  search(value: any) {
    if (this.timeout) { clearTimeout(this.timeout); }
    this.timeout = setTimeout(() => {
      this.applySearch(value);
    }, 800);
  }

  FirstPage() {
    this.paginator.changePage(0);
  }


  applySearch(value: any) {
    this.blockBtnFilter = true;
    if (
      value.qty === null ||
      value.qty === undefined
    ) {
      this.btnBlock();
    } else {
      this.filtroCategoria.filtro(value, this.filtro).then((obj) => {
        this.filtro = obj;
        this.carregarCategoria();
        this.FirstPage();
        this.btnBlock();
      }).catch((erro) => {
        this.spinner.hide();
        this.btnBlock();
        this.errorHandler.handle(erro);
      });
    }
  }

  btnBlock() {
    setTimeout(() => {
      this.blockBtnFilter = false;
    }, 680);
  }

  verifyFocus() {
    this.buttonFilter.nativeElement.focus();
  }

  limparData(tipo: string) {
    if (tipo === 'dataGravacao') {
      this.filtro.datagravacaode = '';
      this.filtro.datagravacaoate = '';
      this.datagravacaode = '';
      this.datagravacaoate = '';
    }

    this.carregarCategoria();
  }

}
