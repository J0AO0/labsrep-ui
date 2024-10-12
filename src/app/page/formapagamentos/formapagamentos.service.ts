import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';

import * as moment from 'moment-timezone';
import { firstValueFrom } from 'rxjs';
import { FormaPagamentos } from 'src/app/core/models/formapagamentos.model';
import { FiltrosFormaPagamentos } from 'src/app/core/models/filtros.model';

@Injectable()
export class FormaPagamentosService {
  formaPagamentoUrl: string;

  constructor(private http: HttpClient) {
    this.formaPagamentoUrl = `${environment.apiUrl}/formapagamentos`;
  }



  listar(): Promise<any> {
    return firstValueFrom(this.http.get(`${this.formaPagamentoUrl}/lista`)).then(
      (response) => {
        const obj = response as any[];
        this.convertStringDate(obj);
        return obj;
      }
    )
  }


  listarFormaPagamentos(): Promise<any> {
    return firstValueFrom(this.http.get(`${this.formaPagamentoUrl}`)).then(
      (response) => {

        const obj = response as any[];
        this.convertStringDate(obj);
        console.log(obj)
        return obj;
      }
    );
  }

  listarComFiltro(filtro: FiltrosFormaPagamentos): Promise<any> {
    const param: { [k: string]: any } = this.validarParametros(filtro);
    return firstValueFrom(this.http.get(`${this.formaPagamentoUrl}`, { params: param })).then(
      (response: any) => {
        this.converterStringsParaDatasFiltro(response.content);
        return response;
      }
    );
  }

  validarParametros(filtro: FiltrosFormaPagamentos) {
    const obj: { [k: string]: any } = {};

    obj.page = filtro.pagina;
    obj.size = filtro.itensPorPagina;

    if (filtro.id) {
      obj.id = filtro.id;
    }

    if (filtro.descricao) {
      obj.nome = filtro.descricao;
    }

    if (filtro.emailusuario) {
      obj.emailusuario = filtro.emailusuario;
    }

    if (filtro.datagravacaode) {
      obj.datagravacaode = filtro.datagravacaode;
    }

    if (filtro.datagravacaoate) {
      obj.datagravacaoate = filtro.datagravacaoate;
    }

    if (filtro.status) {
      obj.status = filtro.status;
    }

    return obj;
  }

  excluir(id: number): Promise<void> {
    return firstValueFrom(this.http.delete(`${this.formaPagamentoUrl}/${id}`))
      .then()
      .then(() => null);
  }

  adicionar(formapagamento: FormaPagamentos): Promise<FormaPagamentos> {
    return firstValueFrom(
      this.http.post<FormaPagamentos>(this.formaPagamentoUrl, formapagamento)
    );
  }

  atualizar(formapagamento: FormaPagamentos): Promise<FormaPagamentos> {
    return firstValueFrom(
      this.http.put(`${this.formaPagamentoUrl}/${formapagamento.id}`, formapagamento)
    ).then((response) => {
      const pacAlterado = response as FormaPagamentos;
      this.converterStringsParaDatas([pacAlterado]);
      return pacAlterado;
    });
  }
  private converterStringsParaDatas(categ: FormaPagamentos[]) {
    for (const formapagamento of categ) {
      if (formapagamento.datagravacao === null) {
      } else {
        formapagamento.datagravacao = moment(formapagamento.datagravacao, 'YYYY-MM-DD').toDate();
      }
    }
  }
  buscarPorId(id: number) {
    return firstValueFrom(this.http.get(`${this.formaPagamentoUrl}/${id}`)).then(
      (response) => {
        const formapagamento = response as FormaPagamentos;
        this.converterStringsParaDatas([formapagamento]);
        return formapagamento;
      }
    );
  }

  AlternarLista(valor: string): Promise<any> {
    return firstValueFrom(this.http.get(`${this.formaPagamentoUrl}${valor}`)).then(
      (response) => response
    );
  }

  convertStringDate(obj: any[]) {
    obj.forEach((element) => {
      // Certifique-se de que o formato da string de data está correto
      const dateFormat = 'YYYY/MM/DD H:mm';

      // Verifique se a data não é nula ou indefinida antes de tentar convertê-la
      if (element.datagravacao) {
        element.datagravacao = moment(element.datagravacao, dateFormat)
          .tz('America/Sao_Paulo')
          .toDate();
      }
    });
  }

  private converterStringsParaDatasFiltro(obj: any[]) {
    obj.forEach((element) => {
      if (element.datanasc) {
        element.datanasc = moment(element.datanasc, 'YYYY-MM-DD H:mm')
          .tz('America/Sao_Paulo')
          .toDate();
      }
      if (element.datagravacao) {
        element.datagravacao = moment(element.datagravacao, 'YYYY-MM-DD H:mm')
          .tz('America/Sao_Paulo')
          .toDate();
      }
    });
  }

}
