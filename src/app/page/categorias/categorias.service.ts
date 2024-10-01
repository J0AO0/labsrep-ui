import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { environment } from 'src/environments/environment';

import * as moment from 'moment-timezone';
import { FiltroCategorias } from 'src/app/core/models/filtros.model';
import { Categorias } from 'src/app/core/models/categorias.model';


@Injectable({
  providedIn: 'root',
})
export class CategoriasService {
  categoriaURL: string = '';

  constructor(private http: HttpClient) {
    this.categoriaURL = `${environment.apiUrl}/categorias`;
  }

  listarComFiltro(filtro: FiltroCategorias): Promise<any> {
    const param: { [k: string]: any } = this.validarParametros(filtro);
    return firstValueFrom(this.http.get(`${this.categoriaURL}`, { params: param })).then(
      (response: any) => {
        this.converterStringsParaDatas(response.data);
        return response;
      }
    );
  }

   ListarDrop(): Promise<any> {
    return firstValueFrom(
      this.http.get(`${this.categoriaURL}/all`),
    ).then((response: any) => {
      this.converterStringsParaDatas(response);
      return response;
    });
  }

  validarParametros(filtro: FiltroCategorias) {
    const obj: { [k: string]: any } = {};

    obj.page = filtro.pagina;
    obj.perPage = filtro.itensPorPagina;

    if (filtro.codigo) {
      obj.codigo = filtro.codigo;
    }

    if (filtro.descricao) {
      obj.descricao = filtro.descricao;
    }

    if (filtro.usuariocriacao) {
      obj.usuariocriacao = filtro.usuariocriacao;
    }

    if (filtro.usuarioalteracao) {
      obj.usuarioalteracao = filtro.usuarioalteracao;
    }


    if (filtro.datacriacaode) {
      obj.datacriacaode = filtro.datacriacaode;
    }

    if (filtro.datacriacaoate) {
      obj.datacriacaoate = filtro.datacriacaoate;
    }

    if (filtro.dataalteracaode) {
      obj.dataalteracaode = filtro.dataalteracaode;
    }

    if (filtro.dataalteracaoate) {
      obj.dataalteracaoate = filtro.dataalteracaoate;
    }

    if (filtro.status) {
      obj.status = filtro.status;
    }

    return obj;
  }

  private converterStringsParaDatas(obj: any[]) {
    obj.forEach((element) => {
      if (element.datacriacao) {
        element.datacriacao = moment(element.datacriacao, 'YYYY-MM-DD H:mm')
          .tz('America/Sao_Paulo')
          .toDate();
      }
      if (element.dataalteracao) {
        element.dataalteracao = moment(element.dataalteracao, 'YYYY-MM-DD H:mm')
          .tz('America/Sao_Paulo')
          .toDate();
      }
    });
  }

  listarCategorias(): Promise<any> {
    return firstValueFrom(this.http.get(`${this.categoriaURL}`)).then(
      (response) => response as any[],
    );
  }

  adicionarCategoria(obj: Categorias): Promise<Categorias> {
    return firstValueFrom(this.http.post<Categorias>(this.categoriaURL, obj));
  }

  atualizarCategorias(obj: Categorias): Promise<Categorias> {
    return firstValueFrom(
      this.http.put<Categorias>(`${this.categoriaURL}/${obj._id}`, obj),
    ).then((response) => response as Categorias);
  }

  buscarPorID(id: string) {
    return firstValueFrom(this.http.get(`${this.categoriaURL}/${id}`)).then(
      (response) => response as Categorias,
    );
  }

  excluir(id: string) {
    return firstValueFrom(this.http.delete(`${this.categoriaURL}/${id}`)).then(
      () => null,
    );
  }
}