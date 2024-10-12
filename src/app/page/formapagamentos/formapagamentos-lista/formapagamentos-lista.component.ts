import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LazyLoadEvent, MenuItem, PrimeNGConfig } from 'primeng/api';
import { AuthService } from '../../seguranca/auth.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { ValidationService } from 'src/app/core/services/validation.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Paginator } from 'primeng/paginator';
import { Table } from 'primeng/table';

import { FormaPagamentosService } from '../formapagamentos.service';
import { FiltroFormaPagamentosService } from 'src/app/core/services/filtros-services/filtro-formapagamentos.service';
import { FiltrosFormaPagamentos } from 'src/app/core/models/filtros.model';


@Component({
  selector: 'app-formapagamentos-lista',
  templateUrl: './formapagamentos-lista.component.html',
  styleUrls: ['./formapagamentos-lista.component.css']
})
export class FormaPagamentosListaComponent implements OnInit {

  @ViewChild('tabela') table: Table;
  @ViewChild('paginator') paginator: Paginator;
  @ViewChild('buttonFilter') buttonFilter: ElementRef; s


  rowsPerPageTable: number[] = [10, 25, 50, 100, 200];
  formapagamentos = [];
  sinal = true;
  status = 'Ativo';
  cols: any[];
  salvando: boolean;
  dateRangeStart: string;
  dateRangeEnd: string;
  selectedFormaPagamento: any;
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
  filtro = new FiltrosFormaPagamentos()

  constructor(
    private title: Title,
    private formaService: FormaPagamentosService,
    public auth: AuthService,
    private conf: PrimeNGConfig,
    private errorHandler: ErrorHandlerService,
    private validationService: ValidationService,
    private spinner: NgxSpinnerService,
    private filtroFormaPagamento: FiltroFormaPagamentosService
  ) { }

  onClear() {
    this.cols.forEach(col => {
      if (col.qty === null || col.qty === undefined) { } else {
        col.qty = null;
      }
    });
    this.datagravacaode = null;
    this.datagravacaoate = null;
    this.filtro = new FiltrosFormaPagamentos();
    this.filtroDefault();
    this.carregarFormaPagamento();
  }

  refresh() {
    this.carregarFormaPagamento();
  }

  filtroDefault() {
    this.filtro.pagina = 0;
    this.filtro.itensPorPagina = 10;
    this.filtro.status = 'Ativos';
  }

  ngOnInit() {
    this.filtroDefault();
    this.conf.ripple = true;
    this.title.setTitle('Forma de Pagamentos');
    this.carregarFormaPagamento();

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
    this.filtro.pagina = event.first / event.rows;
    this.filtro.itensPorPagina = event?.rows;
    this.carregarFormaPagamento();
  }


  carregarFormaPagamento() {
    this.spinner.show();
    this.formaService.listarComFiltro(this.filtro)
      .then(obj => {
        this.formapagamentos = obj.content;
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
    this.carregarFormaPagamento();
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
      this.carregarFormaPagamento();
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
      this.filtroFormaPagamento.filtro(value, this.filtro).then((obj) => {
        this.filtro = obj;
        this.carregarFormaPagamento();
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

    this.carregarFormaPagamento();
  }

}