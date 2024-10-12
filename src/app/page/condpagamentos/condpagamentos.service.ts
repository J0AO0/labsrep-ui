import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    this.condPagamentoUrl = `${environment.apiUrl}/condPagamento`;
  }



  listar(): Promise<any> {
    return firstValueFrom(this.http.get(`${this.condPagamentoUrl}`)).then(
      (response) => {
        const obj = response as any[];
        this.convertStringDate(obj);
        return obj;
      }
    )
  }

  excluir(id: number): Promise<void> {
    return firstValueFrom(this.http.delete(`${this.condPagamentoUrl}/${id}`))
      .then()
      .then(() => null);
  }


  adicionar(condPag: CondPagamentos): Promise<CondPagamentos> {
    return firstValueFrom(this.http.post<CondPagamentos>(this.condPagamentoUrl, condPag));
  }


  atualizar(condPag: CondPagamentos): Promise<CondPagamentos> {
    return firstValueFrom(this.http.put(`${this.condPagamentoUrl}/${condPag.id}`, condPag))
      .then((response) => response as CondPagamentos);
  }


  buscarPorId(id: number) {
    return firstValueFrom(this.http.get(`${this.condPagamentoUrl}/${id}`))
      .then((response) => response as CondPagamentos);
  }


  mudarStatus(id: number, status: boolean): Promise<void> {
    const headers = new HttpHeaders().append(
      'Content-Type',
      'application/json'
    );
    return firstValueFrom(this.http.put(`${this.condPagamentoUrl}/${id}/status`, status, { headers }))
      .then(() => null);
  }


  AlternarLista(valor: string): Promise<any> {
    return firstValueFrom(this.http.get(`${this.condPagamentoUrl}${valor}`))
      .then((response) => response);
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

}
