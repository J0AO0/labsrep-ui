import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { firstValueFrom } from 'rxjs';
import { Produto } from 'src/app/core/models/produto.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private baseUrl = 'http://localhost:9092/produtos';

  constructor(private http: HttpClient) { }

  uploadFoto(file: File) {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.baseUrl}/upload-foto`, formData);
  }


  adicionar(produto: Produto): Promise<Produto> {
    return firstValueFrom(
      this.http.post<Produto>(this.baseUrl, produto)
    );
  }

  buscarPorId(id: number) {
    return firstValueFrom(this.http.get(`${this.baseUrl}/${id}`)).then(
      (response) => {
        const categoria = response as Produto;
        this.converterStringsParaDatas([categoria]);
        return categoria;
      }
    );
  }


  private converterStringsParaDatas(categ: Produto[]) {
    for (const categoria of categ) {
      if (categoria.datagravacao === null) {
      } else {
        categoria.datagravacao = moment(categoria.datagravacao, 'YYYY-MM-DD').toDate();
      }
    }
  }
}