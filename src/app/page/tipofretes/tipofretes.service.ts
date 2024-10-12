import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';

import * as moment from 'moment-timezone';
import { firstValueFrom } from 'rxjs';
import { TipoFretes } from 'src/app/core/models/tipofretes.model';
import { FiltrosTipoFretes } from 'src/app/core/models/filtros.model';


@Injectable()
export class TipoFretesService {
  tipoFreteUrl: string;

  constructor(private http: HttpClient) {
    this.tipoFreteUrl = `${environment.apiUrl}/TipoFretes`;
  }



  listar(): Promise<any> {
    return firstValueFrom(this.http.get(`${this.tipoFreteUrl}/lista`)).then(
      (response) => {
        const obj = response as any[];
        this.convertStringDate(obj);
        return obj;
      }
    )
  }


  listarTipoFretes(): Promise<any> {
    return firstValueFrom(this.http.get(`${this.tipoFreteUrl}`)).then(
      (response) => {

        const obj = response as any[];
        this.convertStringDate(obj);
        console.log(obj)
        return obj;
      }
    );
  }

  listarComFiltro(filtro: FiltrosTipoFretes): Promise<any> {
    const param: { [k: string]: any } = this.validarParametros(filtro);
    return firstValueFrom(this.http.get(`${this.tipoFreteUrl}`, { params: param })).then(
      (response: any) => {
        this.converterStringsParaDatasFiltro(response.content);
        return response;
      }
    );
  }

  validarParametros(filtro: FiltrosTipoFretes) {
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
    return firstValueFrom(this.http.delete(`${this.tipoFreteUrl}/${id}`))
      .then()
      .then(() => null);
  }

  adicionar(tipofrete: TipoFretes): Promise<TipoFretes> {
    return firstValueFrom(
      this.http.post<TipoFretes>(this.tipoFreteUrl, tipofrete)
    );
  }

  atualizar(tipofrete: TipoFretes): Promise<TipoFretes> {
    return firstValueFrom(
      this.http.put(`${this.tipoFreteUrl}/${tipofrete.id}`, tipofrete)
    ).then((response) => {
      const pacAlterado = response as TipoFretes;
      this.converterStringsParaDatas([pacAlterado]);
      return pacAlterado;
    });
  }
  private converterStringsParaDatas(categ: TipoFretes[]) {
    for (const tipofrete of categ) {
      if (tipofrete.datagravacao === null) {
      } else {
        tipofrete.datagravacao = moment(tipofrete.datagravacao, 'YYYY-MM-DD').toDate();
      }
    }
  }
  buscarPorId(id: number) {
    return firstValueFrom(this.http.get(`${this.tipoFreteUrl}/${id}`)).then(
      (response) => {
        const tipofrete = response as TipoFretes;
        this.converterStringsParaDatas([tipofrete]);
        return tipofrete;
      }
    );
  }

  AlternarLista(valor: string): Promise<any> {
    return firstValueFrom(this.http.get(`${this.tipoFreteUrl}${valor}`)).then(
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
