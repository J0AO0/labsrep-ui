import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MenuItem, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProdutoService } from '../../produto.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ValidationService } from 'src/app/core/services/validation.service';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { NgForm } from '@angular/forms';

export interface Product {
  name: string;
  category: string;
  description: string;
  price: number;
  image: string;
  inventoryStatus: string;
  rating: number;
}

@Component({
  selector: 'app-produtos-listar',
  templateUrl: './produtos-listar.component.html',
  styleUrl: './produtos-listar.component.css'
})
export class ProdutosListarComponent implements OnInit {

  descricao: string = '';
  selectedFile: File | null = null;
  idProduto: number;
  produtoId: any

  @ViewChild('tabela') table: Table;

  @ViewChild('imagem') imagem: OverlayPanel;


  rowsPerPageTable: number[] = [10, 25, 50, 100, 200, 500];
  produtos = [];
  cols: any[];
  messagePageReport = 'Mostrando {first} a {last} de {totalRecords} registros';
  items: MenuItem[];
  sinal = true;
  valorTooltip = 'Inativos';

  constructor(
    private title: Title,
    private produtoService: ProdutoService,
    private spinner: NgxSpinnerService,
    private validationService: ValidationService,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.title.setTitle('Lista de Produto');
    this.items = [
      {
        label: 'Ativo/Inativo',
        icon: 'pi pi-sort-alt',
        command: () => {
          this.AlternarLista();
        }
      }
    ]
    this.carregarProduto();

    this.cols = [
      { field: 'id', header: 'Código', width: '100px', type: 'numeric', key: 1 },
      { field: 'name', header: 'Descrição', width: '150px', type: 'text', key: 2 },
      { field: 'datagravacao', header: 'Data Gravação', width: '100px', data: true, format: `dd/MM/yyyy H:mm`, type: 'date', key: 3 },
      { field: 'emailusuario', header: 'Usuário Gravação', width: '150px', type: 'text', key: 4 },
      { field: 'statusformatado', header: 'Status', width: '150px', type: 'text', key: 5 }
    ]

  }


  refresh() {
    this.carregarProduto();
  }

  onClear() {
    this.table.clear();
  }

  carregarProduto() {
    this.spinner.show();
    this.produtoService.listar()
      .then((obj) => {
        this.produtos = obj;
        this.produtos = this.validationService.formataAtivoeInativo(this.produtos);
        this.spinner.hide();
      })
      .catch((erro) => {
        this.spinner.hide();
        // this.erroHandler.handle(erro);
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
    this.produtoService.AlternarLista(valor)
      .then((obj) => {
        this.produtos = obj;
        // this.produtos = this.validationService.formataAtivoeInativo(this.convenios);
        this.spinner.hide();
      })
      .catch((erro) => {
        this.spinner.hide();
        // this.erroHandler.handle(erro);
      })
  }



  // onSubmit() {
  //   if (this.selectedFile && this.descricao) {
  //     const formData = new FormData();
  //     formData.append('arquivo', this.selectedFile);
  //     formData.append('descricao', this.descricao);

  //     if (!this.produtoId) {
  //       this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: 'Produto não selecionado.' });
  //       return;
  //     }

  //     this.produtoService.uploadFoto(this.produtoId, formData).subscribe({
  //       next: (response) => {
  //         this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Foto salva com sucesso!' });
  //       },
  //       error: (err) => {
  //         this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao salvar a foto.' });
  //       }
  //     });
  //   } else {
  //     this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: 'Selecione um arquivo e insira a descrição.' });
  //   }
  // }


  onSubmit() {
    if (this.selectedFile && this.descricao) {
      const formData = new FormData();
      formData.append('arquivo', this.selectedFile);
      formData.append('descricao', this.descricao);

      if (!this.produtoId) {
        this.messageService.add({
          severity: 'warn',
          summary: 'Atenção',
          detail: 'Produto não selecionado.'
        });
        return;
      }

      // Convertendo Observable para Promise
      lastValueFrom(this.produtoService.uploadFoto(this.produtoId, formData))  // Usar lastValueFrom
        .then((response) => {
          // Exibe mensagem de sucesso no Toast
          this.messageService.add({
            severity: 'success',
            summary: 'Produto',
            detail: `${response.descricao} Adicionado  com sucesso`
          });

          // Após um pequeno delay, recarrega a página para atualizar a lista
          this.router.navigate(['/produtos']);
        })
        .catch((err) => {
          // Exibe mensagem de erro em caso de falha
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Falha ao salvar a foto.'
          });
        });
    } else {
      // Exibe mensagem de alerta caso o arquivo ou descrição não tenha sido preenchido
      this.messageService.add({
        severity: 'warn',
        summary: 'Atenção',
        detail: 'Selecione um arquivo e insira a descrição.'
      });
    }
  }


  onFileSelect(event: any) {
    this.selectedFile = event.files[0];  // Seleciona o primeiro arquivo
  }


  onImageButtonClick(produtoId: number, event: Event) {
    this.produtoId = produtoId;
    this.imagem.show(event);  // Abre o OverlayPanel no local do clique
  }

}
