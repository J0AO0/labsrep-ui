import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  pedidoUrl: string;

  constructor(private http: HttpClient) {
    this.pedidoUrl = `${environment.apiUrl}/pedidos`;
    
  }
}
