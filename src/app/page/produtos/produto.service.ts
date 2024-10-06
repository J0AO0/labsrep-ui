import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { firstValueFrom, Observable } from 'rxjs';
import { Produto } from 'src/app/core/models/produto.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  produtoURL: string;

  constructor(private http: HttpClient) {
    this.produtoURL = `${environment.apiUrl}/produtos`;
  }

  // Faz o upload da foto associando ao produto por ID
  uploadFoto(produtoId: number, formData: FormData): Observable<any> {
    return this.http.put(`${this.produtoURL}/${produtoId}/foto`, formData);
  }

  listar(): Promise<any> {
    return firstValueFrom(this.http.get(`${this.produtoURL}`)).then(
      (response) => {
        const obj = response as any[];
        this.converterStringsParaDatas(obj);
        return obj;
      });
  }

  excluir(id: number): Promise<void> {
    return firstValueFrom(this.http.delete(`${this.produtoURL}/${id}`))
      .then()
      .then(() => null);
  }



  adicionar(produto: Produto): Promise<Produto> {
    return firstValueFrom(
      this.http.post<Produto>(this.produtoURL, produto)
    );
  }

  atualizar(produto: Produto): Promise<Produto> {
    return firstValueFrom(
      this.http.put(`${this.produtoURL}/${produto.id}`, produto)
    ).then((response) => response as Produto);
  }

  buscarPorId(id: number): Promise<Produto> {
    return firstValueFrom(this.http.get(`${this.produtoURL}/${id}`)).then(
      (response) => {
        const produto = response as Produto;
        this.converterStringsParaDatas([produto]);
        return produto;
      }
    );
  }

  mudarStatus(id: number, status: boolean): Promise<void> {
    const headers = new HttpHeaders().append(
      'Content-Type',
      'application/json'
    );
    return firstValueFrom(
      this.http.put(`${this.produtoURL}/${id}/status`, status, { headers })
    ).then(() => null);
  }


  AlternarLista(valor: string): Promise<any> {
    return firstValueFrom(this.http.get(`${this.produtoURL}${valor}`)).then(
      (response) => response
    );
  }
  private converterStringsParaDatas(produtos: Produto[]) {
    for (const produto of produtos) {
      if (produto.datagravacao) {
        produto.datagravacao = moment(produto.datagravacao, 'YYYY-MM-DD').toDate();
      }
    }
  }
}