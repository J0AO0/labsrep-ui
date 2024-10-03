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

  rowsPerPageTable: number[] = [10, 25, 50, 100, 200];
  categorias = [];
  sinal = true;
  status = 'Ativo';
  cols: any[];
  tabela: any;
  valorTooltip = 'Inativos';
  messagePageReport = 'Mostrando {first} a {last} de {totalRecords} registros';
  items: MenuItem[];
  colsConv = [];
  displayCategorias: boolean;

  constructor(
    private title: Title,
    private catService: CategoriasService,
    public auth: AuthService,
    private conf: PrimeNGConfig,
    private errorHandler: ErrorHandlerService,
    private validationService: ValidationService,
    private spinner: NgxSpinnerService
  ) { }

  onClear() {
    this.table.clear();
  }
  refresh() {
    this.carregarCategorias();
  }

  ngOnInit() {
    this.conf.ripple = true;
    this.title.setTitle('Categorias');

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
      { field: 'id', header: 'Código', width: '115px', type: 'numeric' },
      { field: 'nome', header: 'Descrição', width: '250px', type: 'text' },
      { field: 'datagravacao', header: 'Data Gravação', width: '200px', type: 'date', data: true, format: `dd/MM/yyyy H:mm` },
      { field: 'emailusuario', header: 'Usuário Gravação', width: '250px', type: 'text' },
      { field: 'statusformatado', header: 'Status', width: '100px', type: 'text' }
    ];

    this.colsConv = [
      {field: 'id', header: 'Código'},
      {field: 'descricao', header: 'Convênio'},
      {field: 'preco', header: 'Preço',  currency: true,  format: `BRL`}
    ]

    this.carregarCategorias();
  }

  carregarCategorias() {
    this.spinner.show();
    this.catService.listarCategorias()
      .then(exame => {
        this.categorias = exame;
        this.categorias = this.validationService.formataAtivoeInativo(this.categorias);
        this.spinner.hide();
      })
      .catch((erro) => {
        this.spinner.hide();
        this.errorHandler.handle(erro);
      });

  }

  AlternarLista() {
    this.spinner.show();
    const valor = this.sinal ? '/inativos' : '/';
    if (this.sinal === true) {
      this.valorTooltip = 'Ativos';
      this.sinal = false;
    } else {
      this.valorTooltip = 'Inativos';
      this.sinal = true;
    }
    this.catService.AlternarLista(valor)
      .then(obj => {
        this.categorias = obj
        this.categorias = this.validationService.formataAtivoeInativo(this.categorias);
        this.spinner.hide();
      })
      .catch((erro) => {
        this.spinner.hide();
        this.errorHandler.handle(erro);
      });

  }
}
