import { CommonModule } from '@angular/common';
import { ProdutoService } from '../produto.service';
import { Component, OnInit } from '@angular/core';
import { Regex } from 'src/app/core/validators/regex';
import { Produto } from 'src/app/core/models/produto.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { MessageService } from 'primeng/api';
import { NgForm } from '@angular/forms';
import { UploadEvent } from 'primeng/fileupload';


@Component({
  selector: 'app-produto-cadastro',
  templateUrl: './produto-cadastro.component.html',
  styleUrl: './produto-cadastro.component.css',
})
export class ProdutoCadastroComponent implements OnInit {
  selectedFile: File;

  regex = new Regex();
  salvando: boolean = false;
  produto = new Produto();
  idProduto: number;

  constructor(private produtoService: ProdutoService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private spinner: NgxSpinnerService,
    private messageService: MessageService,
    private erroHandler: ErrorHandlerService,
  ) { }

  ngOnInit() {
    this.title.setTitle('Cadastro Categoria');
    this.idProduto = this.route.snapshot.params['id'];
    if (this.idProduto) {
      this.spinner.show();
      this.carregarProduto(this.idProduto);
    } else {
      this.produto.status = true;
    }
  }


  get editando() {
    return Boolean(this.produto.id);
  }

  salvar(form: NgForm) {
    if (this.editando) {
    } else {
      this.adicionarProduto(form);
    }
  }

  adicionarProduto(form: NgForm) {
    this.salvando = true;
    this.produtoService.adicionar(this.produto)
      .then((obj) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Categoria',
          detail: `${obj.nome}, adicionado com sucesso!`
        });
        this.salvando = false;
        this.router.navigate(['/categorias']);
      })
      .catch((erro) => {
        this.salvando = false;
        this.erroHandler.handle(erro);
      })
  }

  carregarProduto(id: number) {
    this.produtoService.buscarPorId(id)
      .then((obj) => {
        this.produto = obj;
        this.atualizarTituloEdicao();
        this.spinner.hide();
      })
      .catch((erro) => {
        this.spinner.hide();
        this.erroHandler.handle(erro);
      })
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de Categorias: ${this.produto.nome}`);
  }



  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  // onUpload() {
  //   if (this.selectedFile) {
  //     this.produtoService.uploadFoto(this.selectedFile).subscribe(
  //       (response) => console.log('Sucesso!', response),
  //       (error) => console.log('Erro', error)
  //     );
  //   }
  // }


  onUpload(event: UploadEvent) {
    if (this.selectedFile) {
      this.produtoService.uploadFoto(this.selectedFile).subscribe(
        (response) => console.log('Sucesso!', response),
        (error) => console.log('Erro', error)
      );
    }
    this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode' });
  }

}
