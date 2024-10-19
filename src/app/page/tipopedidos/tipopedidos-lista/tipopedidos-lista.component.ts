import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MenuItem, PrimeNGConfig } from 'primeng/api';

import { AuthService } from '../../seguranca/auth.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { ValidationService } from 'src/app/core/services/validation.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Table } from 'primeng/table';
import { TipopedidosService } from '../tipopedidos.service';

@Component({
  selector: 'app-tipopedidos-lista',
  templateUrl: './tipopedidos-lista.component.html',
  styleUrls: ['./tipopedidos-lista.component.css']
})
export class TipoPedidosListaComponent implements OnInit {

  @ViewChild('tabela') table: Table;
  rowsPerPageTable: number[] = [10, 25, 50, 100, 200, 500];
  tipoPedidos = [];
  cols: any[];
  messagePageReport = 'Mostrando {first} a {last} de {totalRecords} registros';
  items: MenuItem[];
  sinal = true;
  valorTooltip = 'Inativos';
  globalSearchValue: string = '';

  constructor(
    private title: Title,
    private tipoService: TipopedidosService,
    public auth: AuthService,
    private conf: PrimeNGConfig,
    private errorHandler: ErrorHandlerService,
    private validationService: ValidationService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.title.setTitle('Lista Tipo de Pedidos');
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
    this.tipoService.listar()
      .then((obj) => {
        this.tipoPedidos = obj;
        this.tipoPedidos = this.validationService.formataAtivoeInativo(this.tipoPedidos);
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
    this.tipoService.AlternarLista(valor)
      .then((obj) => {
        this.tipoPedidos = obj;
        this.tipoPedidos = this.validationService.formataAtivoeInativo(this.tipoPedidos);
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