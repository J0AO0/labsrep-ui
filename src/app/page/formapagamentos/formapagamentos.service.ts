import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    return firstValueFrom(this.http.get(`${this.formaPagamentoUrl}`)).then(
      (response) => {
        const obj = response as any[];
        this.convertStringDate(obj);
        return obj;
      }
    )
  }

  excluir(id: number): Promise<void> {
    return firstValueFrom(this.http.delete(`${this.formaPagamentoUrl}/${id}`))
      .then()
      .then(() => null);
  }


  adicionar(formaPag: FormaPagamentos): Promise<FormaPagamentos> {
    return firstValueFrom(this.http.post<FormaPagamentos>(this.formaPagamentoUrl, formaPag));
  }


  atualizar(formaPag: FormaPagamentos): Promise<FormaPagamentos> {
    return firstValueFrom(this.http.put(`${this.formaPagamentoUrl}/${formaPag.id}`, formaPag))
      .then((response) => response as FormaPagamentos);
  }


  buscarPorId(id: number) {
    return firstValueFrom(this.http.get(`${this.formaPagamentoUrl}/${id}`))
      .then((response) => response as FormaPagamentos);
  }


  mudarStatus(id: number, status: boolean): Promise<void> {
    const headers = new HttpHeaders().append(
      'Content-Type',
      'application/json'
    );
    return firstValueFrom(this.http.put(`${this.formaPagamentoUrl}/${id}/status`, status, { headers }))
      .then(() => null);
  }


  AlternarLista(valor: string): Promise<any> {
    return firstValueFrom(this.http.get(`${this.formaPagamentoUrl}${valor}`))
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
