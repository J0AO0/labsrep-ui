import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { Regex } from 'src/app/core/validators/regex';
import { CategoriasService } from '../categorias.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Categorias } from 'src/app/core/models/categorias.model';



@Component({
  selector: 'app-cadastro-categoria',
  templateUrl: './cadastro-categoria.component.html',
  styleUrls: ['./cadastro-categoria.component.css']
})
export class CadastroCategoriaComponent {

  @ViewChild('formCategoria') formCategoria: NgForm;

  regex = new Regex();
  newcategoria = new Categorias();
  idcategoria: string;
  salvando: boolean;
  mostrarToast: true;

  constructor(
    private categoriaService: CategoriasService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private confirmation: ConfirmationService,
    private spinner: NgxSpinnerService,
    private errorHandler: ErrorHandlerService,
    // public auth: AuthService,
  ) { }

  ngOnInit() {
    this.newcategoria.status = true;
    this.idcategoria = this.route.snapshot.params['id'];
    this.title.setTitle('Cadastro de Categoria');

    if (this.idcategoria) {
      this.spinner.show();
      this.carregarCategoria(this.idcategoria);
    } else {
      this.newcategoria.status = true;
    }
  }

  get editando() {
    return Boolean(this.newcategoria._id);
   
  }


  salvar(form: NgForm) {
    if (form.invalid) {
      return; //Não prosseguir se o formulário não for válido
    }
  
    if (this.editando) {
      this.atualizarCategorias(form);
    } else {
      this.adicionarCategoria(form);
    }
  }
  
  adicionarCategoria(form: NgForm) {
    this.salvando = true;
    this.mostrarToast= true;
    this.categoriaService
      .adicionarCategoria(this.newcategoria)
      .then((obj) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Categoria',
          detail: `${obj.descricao}, adicionado com sucesso!`,
        });
        this.salvando = false;
        this.router.navigate(['/categorias']);
      })
      .catch((erro) => {
        this.salvando = false;
        this.errorHandler.handle(erro);
      });
  }

  atualizarCategorias(form: NgForm) {
    this.salvando = true;
    this.categoriaService
      .atualizarCategorias(this.newcategoria)
      .then((obj) => {
        this.newcategoria = obj;
        this.messageService.add({
          severity: 'info',
          summary: 'Categoria',
          detail: `${obj.descricao}, alterado com sucesso!`,
        });
        this.atualizarTituloEdicao();
        this.salvando = false;
        this.router.navigate(['/categorias']);
      })
      .catch((erro) => {
        this.salvando = false;
        this.errorHandler.handle(erro);
      });
  }
  carregarCategoria(_id: string) {
    this.categoriaService
      .buscarPorID(_id)
      .then((obj) => {
        this.newcategoria = obj;
        this.atualizarTituloEdicao();
        this.spinner.hide();
      })
      .catch((erro) => {
        this.spinner.hide();
        this.errorHandler.handle(erro);
      });
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de Categoria: ${this.newcategoria.descricao}`);
  }

  confirmarExclusao() {
    this.confirmation.confirm({
      message: `Tem certeza que deseja excluir: <b>${this.newcategoria.descricao}</b> ?`,
      accept: () => {
        this.excluir(this.newcategoria._id);
      },
      reject: (type) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({
              severity: 'warn',
              summary: 'Ação cancelada',
              detail: 'Você cancelou',
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              severity: 'error',
              summary: 'Ação rejeitada',
              detail: 'Você rejeitou',
            });
            break;
        }
      },
    });
  }

  excluir(_id: any) {
    this.categoriaService
      .excluir(_id)
      .then(() => {
        this.messageService.add({
          severity: 'warn',
          summary: 'Categoria',
          detail: `${this.newcategoria.descricao}, excluído com sucesso!`,
        });
        this.router.navigate(['/categorias']);
      })
      .catch((erro) => {
       this.errorHandler.handle(erro);
      });
  }

  
}