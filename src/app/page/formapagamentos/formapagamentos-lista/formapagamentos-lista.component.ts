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

@Component({
  selector: 'app-formapagamentos-lista',
  templateUrl: './formapagamentos-lista.component.html',
  styleUrls: ['./formapagamentos-lista.component.css']
})
export class FormaPagamentosListaComponent implements OnInit {

  @ViewChild('tabela') table: Table;
  rowsPerPageTable: number[] = [10, 25, 50, 100, 200, 500];
  formapagamentos = [];
  cols: any[];
  messagePageReport = 'Mostrando {first} a {last} de {totalRecords} registros';
  items: MenuItem[];
  sinal = true;
  valorTooltip = 'Inativos';
  globalSearchValue: string = '';


  constructor(
    private title: Title,
    private formaService: FormaPagamentosService,
    public auth: AuthService,
    private conf: PrimeNGConfig,
    private errorHandler: ErrorHandlerService,
    private validationService: ValidationService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.title.setTitle('Lista de Formas de Pagamento');
    this.items = [
      {
        label: 'Ativo/Inativo',
        icon: 'pi pi-sort-alt',
        command: () => {
          this.AlternarLista();
        }
      }
    ]
    this.carregarCondPagamento();

    this.cols = [
      { field: 'id', header: 'Código', width: '100px', type: 'numeric', key: 1 },
      { field: 'descricao', header: 'Nome', width: '150px', type: 'text', key: 2 },
      { field: 'datagravacao', header: 'Data Gravação', width: '100px', data: true, format: `dd/MM/yyyy H:mm`, type: 'date', key: 4 },
      { field: 'emailusuario', header: 'Usuário Gravação', width: '150px', type: 'text', key: 5 },
      { field: 'statusformatado', header: 'Status', width: '150px', type: 'text', key: 6 }
    ]
  }


  carregarCondPagamento() {
    this.spinner.show();
    this.formaService.listar()
      .then((obj) => {
        this.formapagamentos = obj;
        this.formapagamentos = this.validationService.formataAtivoeInativo(this.formapagamentos);
        this.spinner.hide();
      })
      .catch((erro) => {
        this.spinner.hide();
        this.errorHandler.handle(erro);
      })
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
    this.formaService.AlternarLista(valor)
      .then((obj) => {
        this.formapagamentos = obj;
        this.formapagamentos = this.validationService.formataAtivoeInativo(this.formapagamentos);
        this.spinner.hide();
      })
      .catch((erro) => {
        this.spinner.hide();
        this.errorHandler.handle(erro);
      })
  }

  refresh() {
    this.carregarCondPagamento();
  }

  onClear(): void {
    this.globalSearchValue = ''; // Limpa o campo de pesquisa
    this.table.filterGlobal('', 'contains');
  }
}
