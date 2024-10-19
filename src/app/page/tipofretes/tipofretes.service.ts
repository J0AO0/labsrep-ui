import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';

import * as moment from 'moment-timezone';
import { firstValueFrom } from 'rxjs';
import { TipoFretes } from 'src/app/core/models/tipofretes.model';


@Injectable()
export class TipoFretesService {
  tipoFreteUrl: string;

  constructor(private http: HttpClient) {
    this.tipoFreteUrl = `${environment.apiUrl}/tipoFrete`;
  }



  listar(): Promise<any> {
    return firstValueFrom(this.http.get(`${this.tipoFreteUrl}`)).then(
      (response) => {
        const obj = response as any[];
        this.convertStringDate(obj);
        return obj;
      }
    )
  }

  excluir(id: number): Promise<void> {
    return firstValueFrom(this.http.delete(`${this.tipoFreteUrl}/${id}`))
      .then()
      .then(() => null);
  }


  adicionar(tipoFrete: TipoFretes): Promise<TipoFretes> {
    return firstValueFrom(this.http.post<TipoFretes>(this.tipoFreteUrl, tipoFrete));
  }


  atualizar(tipoFrete: TipoFretes): Promise<TipoFretes> {
    return firstValueFrom(this.http.put(`${this.tipoFreteUrl}/${tipoFrete.id}`, tipoFrete))
      .then((response) => response as TipoFretes);
  }


  buscarPorId(id: number) {
    return firstValueFrom(this.http.get(`${this.tipoFreteUrl}/${id}`))
      .then((response) => response as TipoFretes);
  }


  mudarStatus(id: number, status: boolean): Promise<void> {
    const headers = new HttpHeaders().append(
      'Content-Type',
      'application/json'
    );
    return firstValueFrom(this.http.put(`${this.tipoFreteUrl}/${id}/status`, status, { headers }))
      .then(() => null);
  }


  AlternarLista(valor: string): Promise<any> {
    return firstValueFrom(this.http.get(`${this.tipoFreteUrl}${valor}`))
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
