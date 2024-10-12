import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';

import * as moment from 'moment-timezone';
import { firstValueFrom } from 'rxjs';
import { CondPagamentos } from 'src/app/core/models/condpagamentos.model';
import { FiltrosCondPagamentos } from 'src/app/core/models/filtros.model';

@Injectable()
export class CondPagamentosService {
  condPagamentoUrl: string;

  constructor(private http: HttpClient) {
    this.condPagamentoUrl = `${environment.apiUrl}/condpagamentos`;
  }



  listar(): Promise<any> {
    return firstValueFrom(this.http.get(`${this.condPagamentoUrl}/lista`)).then(
      (response) => {
        const obj = response as any[];
        this.convertStringDate(obj);
        return obj;
      }
    )
  }


  listarCondPagamentos(): Promise<any> {
    return firstValueFrom(this.http.get(`${this.condPagamentoUrl}`)).then(
      (response) => {

        const obj = response as any[];
        this.convertStringDate(obj);
        console.log(obj)
        return obj;
      }
    );
  }

  listarComFiltro(filtro: FiltrosCondPagamentos): Promise<any> {
    const param: { [k: string]: any } = this.validarParametros(filtro);
    return firstValueFrom(this.http.get(`${this.condPagamentoUrl}`, { params: param })).then(
      (response: any) => {
        this.converterStringsParaDatasFiltro(response.content);
        return response;
      }
    );
  }

  validarParametros(filtro: FiltrosCondPagamentos) {
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
    return firstValueFrom(this.http.delete(`${this.condPagamentoUrl}/${id}`))
      .then()
      .then(() => null);
  }

  adicionar(condpagamento: CondPagamentos): Promise<CondPagamentos> {
    return firstValueFrom(
      this.http.post<CondPagamentos>(this.condPagamentoUrl, condpagamento)
    );
  }

  atualizar(condpagamento: CondPagamentos): Promise<CondPagamentos> {
    return firstValueFrom(
      this.http.put(`${this.condPagamentoUrl}/${condpagamento.id}`, condpagamento)
    ).then((response) => {
      const pacAlterado = response as CondPagamentos;
      this.converterStringsParaDatas([pacAlterado]);
      return pacAlterado;
    });
  }
  private converterStringsParaDatas(categ: CondPagamentos[]) {
    for (const condpagamento of categ) {
      if (condpagamento.datagravacao === null) {
      } else {
        condpagamento.datagravacao = moment(condpagamento.datagravacao, 'YYYY-MM-DD').toDate();
      }
    }
  }
  buscarPorId(id: number) {
    return firstValueFrom(this.http.get(`${this.condPagamentoUrl}/${id}`)).then(
      (response) => {
        const condpagamento = response as CondPagamentos;
        this.converterStringsParaDatas([condpagamento]);
        return condpagamento;
      }
    );
  }

  AlternarLista(valor: string): Promise<any> {
    return firstValueFrom(this.http.get(`${this.condPagamentoUrl}${valor}`)).then(
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
