import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from './../../../environments/environment';

import * as moment from 'moment-timezone';
import { firstValueFrom } from 'rxjs';
import { Categorias } from 'src/app/core/models/categorias.model';
import { FiltrosCategorias } from 'src/app/core/models/filtros.model';

@Injectable()
export class CategoriasService {
  categoriaUrl: string;

  constructor(private http: HttpClient) {
    this.categoriaUrl = `${environment.apiUrl}/categorias`;
  }

  listarCategorias(): Promise<any> {
    return firstValueFrom(this.http.get(`${this.categoriaUrl}`)).then(
      (response) => {

        const obj = response as any[];
        this.convertStringDate(obj);
        console.log(obj)
        return obj;
      }
    );
  }

  listarComFiltro(filtro: FiltrosCategorias): Promise<any> {
    const param: { [k: string]: any } = this.validarParametros(filtro);
    return firstValueFrom(this.http.get(`${this.categoriaUrl}`, { params: param })).then(
      (response: any) => {
        this.converterStringsParaDatasFiltro(response.content);
        return response;
      }
    );
  }

  validarParametros(filtro: FiltrosCategorias) {
    const obj: { [k: string]: any } = {};

    obj.page = filtro.pagina;
    obj.size = filtro.itensPorPagina;

    if (filtro.id) {
      obj.id = filtro.id;
    }

    if (filtro.nome) {
      obj.nome = filtro.nome;
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

    return obj;
  }

  excluir(id: number): Promise<void> {
    return firstValueFrom(this.http.delete(`${this.categoriaUrl}/${id}`))
      .then()
      .then(() => null);
  }

  adicionar(categoria: Categorias): Promise<Categorias> {
    return firstValueFrom(
      this.http.post<Categorias>(this.categoriaUrl, categoria)
    );
  }

  atualizar(categoria: Categorias): Promise<Categorias> {
    return firstValueFrom(
      this.http.put(`${this.categoriaUrl}/${categoria.id}`, categoria)
    ).then((response) => {
      const pacAlterado = response as Categorias;
      this.converterStringsParaDatas([pacAlterado]);
      return pacAlterado;
    });
  }
  private converterStringsParaDatas(categ: Categorias[]) {
    for (const categoria of categ) {
      if (categoria.datagravacao === null) {
      } else {
        categoria.datagravacao = moment(categoria.datagravacao, 'YYYY-MM-DD').toDate();
      }
    }
  }
  buscarPorId(id: number) {
    return firstValueFrom(this.http.get(`${this.categoriaUrl}/${id}`)).then(
      (response) => {
        const categoria = response as Categorias;
        this.converterStringsParaDatas([categoria]);
        return categoria;
      }
    );
  }

  AlternarLista(valor: string): Promise<any> {
    return firstValueFrom(this.http.get(`${this.categoriaUrl}${valor}`)).then(
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
