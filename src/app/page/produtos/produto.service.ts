import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { firstValueFrom, Observable } from 'rxjs';
import { Produto } from 'src/app/core/models/produto.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private baseUrl = 'http://localhost:9092/produtos';

  constructor(private http: HttpClient) { }

  // Faz o upload da foto associando ao produto por ID
  uploadFoto(produtoId: number, formData: FormData): Observable<any> {
    return this.http.put(`${this.baseUrl}/${produtoId}/foto`, formData);
  }
  
  
  
  

  adicionar(produto: Produto): Promise<Produto> {
    return firstValueFrom(
      this.http.post<Produto>(this.baseUrl, produto)
    );
  }

  buscarPorId(id: number): Promise<Produto> {
    return firstValueFrom(this.http.get(`${this.baseUrl}/${id}`)).then(
      (response) => {
        const produto = response as Produto;
        this.converterStringsParaDatas([produto]);
        return produto;
      }
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