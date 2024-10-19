import { Component, OnInit } from '@angular/core';

import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { Title } from '@angular/platform-browser';

import { ActivatedRoute, Router } from '@angular/router';
import { Regex } from 'src/app/core/validators/regex';

import { NgForm } from '@angular/forms';
import { TipoPedidos } from 'src/app/core/models/tipopedidos.model';
import { TipopedidosService } from '../tipopedidos.service';

@Component({
  selector: 'app-tipopedidos-cadastro',
  templateUrl: './tipopedidos-cadastro.component.html',
  styleUrls: ['./tipopedidos-cadastro.component.css']
})
export class TipoPedidosCadastroComponent implements OnInit {

  regex = new Regex();
  salvando: boolean = false;
  tipoPedido = new TipoPedidos();
  idTipoPedido: number;

  constructor(
    private tipoService: TipopedidosService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private spinner: NgxSpinnerService,
    private messageService: MessageService,
    private erroHandler: ErrorHandlerService,
  ) { }

  ngOnInit() {
    this.title.setTitle('Cadastro Tipo de Pedido  ');
    this.idTipoPedido = this.route.snapshot.params['id'];
    if (this.idTipoPedido) {
      this.spinner.show();
      this.carregarTipoPedido(this.idTipoPedido);
    } else {
      this.tipoPedido.status = true;
    }
  }
  get editando() {
    return Boolean(this.tipoPedido.id);
  }

  salvar(form: NgForm) {
    if (this.editando) {
      this.atualizarTipoPedido(form);
    } else {
      this.adicionarTipoPedido(form);
    }
  }

  adicionarTipoPedido(form: NgForm) {
    this.salvando = true;
    this.tipoService.adicionar(this.tipoPedido)
      .then((obj) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Tipo de Pedido',
          detail: `${obj.nome}, adicionado com sucesso!`
        });
        this.salvando = false;
        this.router.navigate(['/tipopedidos']);
      })
      .catch((erro) => {
        this.salvando = false;
        this.erroHandler.handle(erro);
      })
  }

  atualizarTipoPedido(form: NgForm) {
    this.salvando = true;
    this.tipoService.atualizar(this.tipoPedido)
      .then((obj) => {
        this.messageService.add({
          severity: 'info',
          summary: 'Tipo de Pedido  ',
          detail: `${obj.nome}, atualizado com sucesso!`
        });
        this.atualizarTituloEdicao();
        this.salvando = false;
        this.router.navigate(['/tipopedidos']);
      })
      .catch((erro) => {
        this.salvando = false;
        this.erroHandler.handle(erro);
      })
  }

  carregarTipoPedido(id: number) {
    this.tipoService.buscarPorId(id)
      .then((obj) => {
        this.tipoPedido = obj;
        this.atualizarTituloEdicao();
        this.spinner.hide();
      })
      .catch((erro) => {
        this.spinner.hide();
        this.erroHandler.handle(erro);
      })
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de Tipo de Pedido : ${this.tipoPedido.nome}`);
  }



}

