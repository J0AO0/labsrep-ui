import { Component, OnInit } from '@angular/core';

export interface Product {
  name: string;
  category: string;
  description: string;
  price: number;
  image: string;
  inventoryStatus: string;
  rating: number;
}

@Component({
  selector: 'app-produtos-listar',
  templateUrl: './produtos-listar.component.html',
  styleUrl: './produtos-listar.component.css'
})
export class ProdutosListarComponent implements OnInit {

  products: Product[] = [];

  ngOnInit(): void {
    this.products = [
      {
        name: 'Laptop',
        category: 'Electronics',
        description: 'A powerful gaming laptop.',
        price: 1500,
        image: 'bce19632-e07f-4426-b44d-19f6bc588a55.png',
        inventoryStatus: 'INSTOCK',
        rating: 5
      },
      {
        name: 'Smartphone',
        category: 'Electronics',
        description: 'A feature-packed smartphone.',
        price: 800,
        image: 'smartphone.png',
        inventoryStatus: 'OUTOFSTOCK',
        rating: 4.5
      }
      // Adicione mais produtos conforme necessário
    ];
  }

  // Função para determinar a cor da tag com base no status do inventário
  getSeverity(product: Product): string {
    switch (product.inventoryStatus) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
      default:
        return '';
    }
  }
}
