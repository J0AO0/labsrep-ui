import { Component, OnInit } from '@angular/core';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { Title } from '@angular/platform-browser';

import { ActivatedRoute, Router } from '@angular/router';
import { Regex } from 'src/app/core/validators/regex';
import { NgForm } from '@angular/forms';
import { FormaPagamentosService } from '../formapagamentos.service';
import { FormaPagamentos } from 'src/app/core/models/formapagamentos.model';

@Component({
  selector: 'app-formapagamentos-cadastro',
  templateUrl: './formapagamentos-cadastro.component.html',
  styleUrls: ['./formapagamentos-cadastro.component.css']
})
export class FormaPagamentosCadastroComponent implements OnInit {

  regex = new Regex();
  salvando: boolean = false;
  formaPagamento = new FormaPagamentos();
  idFormaPagamento: number;

  constructor(
    private formaService: FormaPagamentosService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private spinner: NgxSpinnerService,
    private messageService: MessageService,
    private erroHandler: ErrorHandlerService,
  ) { }

  ngOnInit() {
    this.title.setTitle('Cadastro Forma de Pagamento');
    this.idFormaPagamento = this.route.snapshot.params['id'];
    if (this.idFormaPagamento) {
      this.spinner.show();
      this.carregarFormaPagamento(this.idFormaPagamento);
    } else {
      this.formaPagamento.status = true;
    }
  }
  get editando() {
    return Boolean(this.formaPagamento.id);
  }

  salvar(form: NgForm) {
    if (this.editando) {
      this.atualizarFormaPagamento(form);
    } else {
      this.adicionarFormaPagamento(form);
    }
  }

  adicionarFormaPagamento(form: NgForm) {
    this.salvando = true;
    this.formaService.adicionar(this.formaPagamento)
      .then((obj) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Forma de Pagamento',
          detail: `${obj.descricao}, adicionado com sucesso!`
        });
        this.salvando = false;
        this.router.navigate(['/formapagamentos']);
      })
      .catch((erro) => {
        this.salvando = false;
        this.erroHandler.handle(erro);
      })
  }

  atualizarFormaPagamento(form: NgForm) {
    this.salvando = true;
    this.formaService.atualizar(this.formaPagamento)
      .then((obj) => {
        this.messageService.add({
          severity: 'info',
          summary: 'Forma de Pagamento',
          detail: `${obj.descricao}, atualizado com sucesso!`
        });
        this.atualizarTituloEdicao();
        this.salvando = false;
        this.router.navigate(['/formapagamentos']);
      })
      .catch((erro) => {
        this.salvando = false;
        this.erroHandler.handle(erro);
      })
  }

  carregarFormaPagamento(id: number) {
    this.formaService.buscarPorId(id)
      .then((obj) => {
        this.formaPagamento = obj;
        this.atualizarTituloEdicao();
        this.spinner.hide();
      })
      .catch((erro) => {
        this.spinner.hide();
        this.erroHandler.handle(erro);
      })
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de Forma de Pagamento: ${this.formaPagamento.descricao}`);
  }



}
