import { Component, OnInit } from '@angular/core';
import { CondPagamentosService } from '../condpagamentos.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { Title } from '@angular/platform-browser';

import { ActivatedRoute, Router } from '@angular/router';
import { Regex } from 'src/app/core/validators/regex';
import { CondPagamentos } from 'src/app/core/models/condpagamentos.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-condpagamentos-cadastro',
  templateUrl: './condpagamentos-cadastro.component.html',
  styleUrls: ['./condpagamentos-cadastro.component.css']
})
export class CondPagamentosCadastroComponent implements OnInit {

  regex = new Regex();
  salvando: boolean = false;
  condPagamento = new CondPagamentos();
  idCondPagamento: number;

  constructor(
    private condService: CondPagamentosService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private spinner: NgxSpinnerService,
    private messageService: MessageService,
    private erroHandler: ErrorHandlerService,
  ) { }

  ngOnInit() {
    this.title.setTitle('Cadastro Condição de Pagamento');
    this.idCondPagamento = this.route.snapshot.params['id'];
    if (this.idCondPagamento) {
      this.spinner.show();
      this.carregarCondPagamento(this.idCondPagamento);
    } else {
      this.condPagamento.status = true;
    }
  }
  get editando(){
    return Boolean(this.condPagamento.id);
  }

  salvar(form: NgForm) {
    if(this.editando){
      this.atualizarCondPagamento(form);
    }else {
      this.atualizarCondPagamento(form);
    }
   }

  adicionarCondPagamento(form: NgForm){
    this.salvando = true;
    this.condService.adicionar(this.condPagamento)
    .then((obj) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Condição de Pagamento',
        detail: `${obj.descricao}, adicionado com sucesso!`
      });
      this.salvando = false;
      this.router.navigate(['/condpagamentos']);
    })
    .catch((erro) => {
      this.salvando = false;
      this.erroHandler.handle(erro);
    })
  }

  atualizarCondPagamento(form: NgForm){
    this.salvando = true;
    this.condService.atualizar(this.condPagamento)
    .then((obj) => {
      this.messageService.add({
        severity: 'info',
        summary: 'Condição de Pagamento',
        detail: `${obj.descricao}, atualizado com sucesso!`
      });
      this.atualizarTituloEdicao();
      this.salvando = false;
      this.router.navigate(['/condpagamentos']);
    })
    .catch((erro) => {
      this.salvando = false;
      this.erroHandler.handle(erro);
    })
  }

  carregarCondPagamento(id: number) {
    this.condService.buscarPorId(id)
      .then((obj) => {
        this.condPagamento = obj;
        this.atualizarTituloEdicao();
        this.spinner.hide();
      })
      .catch((erro) => {
        this.spinner.hide();
        this.erroHandler.handle(erro);
      })
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de Condição de Pagamento: ${this.condPagamento.descricao}`);
  }



}
