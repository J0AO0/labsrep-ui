import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';

import * as moment from 'moment-timezone';
import { firstValueFrom } from 'rxjs';
import { TipoPedidos } from 'src/app/core/models/tipopedidos.model';

@Injectable({
  providedIn: 'root'
})
export class TipopedidosService {
  tipoPedidoUrl: string;

  constructor(private http: HttpClient) {
    this.tipoPedidoUrl = `${environment.apiUrl}/tipoPedido`;
  }



  listar(): Promise<any> {
    return firstValueFrom(this.http.get(`${this.tipoPedidoUrl}`)).then(
      (response) => {
        const obj = response as any[];
        this.convertStringDate(obj);
        return obj;
      }
    )
  }

  excluir(id: number): Promise<void> {
    return firstValueFrom(this.http.delete(`${this.tipoPedidoUrl}/${id}`))
      .then()
      .then(() => null);
  }


  adicionar(tipopedido: TipoPedidos): Promise<TipoPedidos> {
    return firstValueFrom(this.http.post<TipoPedidos>(this.tipoPedidoUrl, tipopedido));
  }


  atualizar(tipopedido: TipoPedidos): Promise<TipoPedidos> {
    return firstValueFrom(this.http.put(`${this.tipoPedidoUrl}/${tipopedido.id}`, tipopedido))
      .then((response) => response as TipoPedidos);
  }


  buscarPorId(id: number) {
    return firstValueFrom(this.http.get(`${this.tipoPedidoUrl}/${id}`))
      .then((response) => response as TipoPedidos);
  }


  mudarStatus(id: number, status: boolean): Promise<void> {
    const headers = new HttpHeaders().append(
      'Content-Type',
      'application/json'
    );
    return firstValueFrom(this.http.put(`${this.tipoPedidoUrl}/${id}/status`, status, { headers }))
      .then(() => null);
  }


  AlternarLista(valor: string): Promise<any> {
    return firstValueFrom(this.http.get(`${this.tipoPedidoUrl}${valor}`))
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

