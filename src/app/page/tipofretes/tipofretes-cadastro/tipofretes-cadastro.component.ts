import { Component, OnInit } from '@angular/core';

import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { Title } from '@angular/platform-browser';

import { ActivatedRoute, Router } from '@angular/router';
import { Regex } from 'src/app/core/validators/regex';

import { NgForm } from '@angular/forms';
import { TipoFretes } from 'src/app/core/models/tipofretes.model';
import { TipoFretesService } from '../tipofretes.service';

@Component({
  selector: 'app-tipofretes-cadastro',
  templateUrl: './tipofretes-cadastro.component.html',
  styleUrls: ['./tipofretes-cadastro.component.css']
})
export class TipoFretesCadastroComponent implements OnInit {

  regex = new Regex();
  salvando: boolean = false;
  tipoFrete = new TipoFretes();
  idTipoFrete: number;

  constructor(
    private tipoService: TipoFretesService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private spinner: NgxSpinnerService,
    private messageService: MessageService,
    private erroHandler: ErrorHandlerService,
  ) { }

  ngOnInit() {
    this.title.setTitle('Cadastro Tipo de Frete');
    this.idTipoFrete = this.route.snapshot.params['id'];
    if (this.idTipoFrete) {
      this.spinner.show();
      this.carregarTipoFrete(this.idTipoFrete);
    } else {
      this.tipoFrete.status = true;
    }
  }
  get editando() {
    return Boolean(this.tipoFrete.id);
  }

  salvar(form: NgForm) {
    if (this.editando) {
      this.atualizarTipoFrete(form);
    } else {
      this.adicionarTipoFrete(form);
    }
  }

  adicionarTipoFrete(form: NgForm) {
    this.salvando = true;
    this.tipoService.adicionar(this.tipoFrete)
      .then((obj) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Tipo de Frete',
          detail: `${obj.descricao}, adicionado com sucesso!`
        });
        this.salvando = false;
        this.router.navigate(['/tipofretes']);
      })
      .catch((erro) => {
        this.salvando = false;
        this.erroHandler.handle(erro);
      })
  }

  atualizarTipoFrete(form: NgForm) {
    this.salvando = true;
    this.tipoService.atualizar(this.tipoFrete)
      .then((obj) => {
        this.messageService.add({
          severity: 'info',
          summary: 'Tipo de Frete',
          detail: `${obj.descricao}, atualizado com sucesso!`
        });
        this.atualizarTituloEdicao();
        this.salvando = false;
        this.router.navigate(['/tipofretes']);
      })
      .catch((erro) => {
        this.salvando = false;
        this.erroHandler.handle(erro);
      })
  }

  carregarTipoFrete(id: number) {
    this.tipoService.buscarPorId(id)
      .then((obj) => {
        this.tipoFrete = obj;
        this.atualizarTituloEdicao();
        this.spinner.hide();
      })
      .catch((erro) => {
        this.spinner.hide();
        this.erroHandler.handle(erro);
      })
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de Tipo de Frete: ${this.tipoFrete.descricao}`);
  }



}
