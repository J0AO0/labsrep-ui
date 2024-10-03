import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { Regex } from 'src/app/core/validators/regex';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { CategoriasService } from '../categorias.service';
import { Categorias } from 'src/app/core/models/categorias.model';

@Component({
  selector: 'app-categoria-cadastro',
  templateUrl: './categoria-cadastro.component.html',
  styleUrls: ['./categoria-cadastro.component.css']
})
export class CategoriaCadastroComponent implements OnInit {
  regex = new Regex();
  salvando: boolean = false;
  categoria = new Categorias();
  idCategoria: number;

  constructor(
    private categoriaService: CategoriasService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private spinner: NgxSpinnerService,
    private messageService: MessageService,
    private erroHandler: ErrorHandlerService,
  ) { }

  ngOnInit() {
    this.title.setTitle('Cadastro Categoria');
    this.idCategoria = this.route.snapshot.params['id'];
    if (this.idCategoria) {
      this.spinner.show();
      this.carregarCategoria(this.idCategoria);
    } else {
      this.categoria.status = true;
    }
  }
  get editando(){
    return Boolean(this.categoria.id);
  }

  salvar(form: NgForm) {
    if(this.editando){
      this.atualizarCategoria(form);
    }else {
      this.adicionarCategoria(form);
    }
   }

  adicionarCategoria(form: NgForm){
    this.salvando = true;
    this.categoriaService.adicionar(this.categoria)
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

  atualizarCategoria(form: NgForm){
    this.salvando = true;
    this.categoriaService.atualizar(this.categoria)
    .then((obj) => {
      this.messageService.add({
        severity: 'info',
        summary: 'Categoria',
        detail: `${obj.nome}, atualizado com sucesso!`
      });
      this.atualizarTituloEdicao();
      this.salvando = false;
      this.router.navigate(['/categorias']);
    })
    .catch((erro) => {
      this.salvando = false;
      this.erroHandler.handle(erro);
    })
  }

  carregarCategoria(id: number) {
    this.categoriaService.buscarPorId(id)
      .then((obj) => {
        this.categoria = obj;
        this.atualizarTituloEdicao();
        this.spinner.hide();
      })
      .catch((erro) => {
        this.spinner.hide();
        this.erroHandler.handle(erro);
      })
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de Categorias: ${this.categoria.nome}`);
  }



}
