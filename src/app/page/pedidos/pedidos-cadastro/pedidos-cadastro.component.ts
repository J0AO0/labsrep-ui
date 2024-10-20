import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Regex } from 'src/app/core/validators/regex';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { MessageService } from 'primeng/api';
import { NgForm } from '@angular/forms';
import { UploadEvent } from 'primeng/fileupload';
import { PedidosService } from '../pedidos.service';
import { Pedidos } from 'src/app/core/models/pedidos.model';
import { CategoriasService } from '../../categorias/categorias.service';

//TODO REFAZER PEDIDOS E FAZER CLIENTES;

@Component({
  selector: 'app-pedidos-cadastro',
  templateUrl: './pedidos-cadastro.component.html',
  styleUrls: ['./pedidos-cadastro.component.css'],
})
export class PedidosCadastroComponent implements OnInit {
  messageDrop = 'Nenhum resultado encontrado...';

  descricao: string = '';
  selectedFile: File | null = null;
  displayProdutos: boolean = false;
  colsProdutos: any[];
  produtos: any[];         // Todos os produtos
  produtosFiltrados: any[]; // Produtos filtrados por categoria ou pesquisa
  categorias: any[];       // Lista de categorias
  categoriaSelecionada: string = ''; // Categoria selecionada
  filtroProduto: string = ''; // Valor da pesquisa
  produtoSelecionado: any;  // Produto selecionado
  loading: boolean = false;
  

  regex = new Regex();
  salvando: boolean = false;
  pedidos = new Pedidos();
  idPedido: number;
  clientes = [
    { id: 1, nome: 'João' },
    { id: 2, nome: 'Maria' },
    { id: 3, nome: 'Pedro' },
  ];
  selectedCliente: any;
  tipoPedido = [
    { id: 1, nome: 'Pedido Completo' },
    { id: 2, nome: 'Pedido InCompleto' },
  ];
  selectedTipoPedido: any;
  formaPagamento = [
    { id: 1, nome: 'Dinheiro' },
    { id: 2, nome: 'Cartão' },
    { id: 3, nome: 'Pix' },
  ];
  selectedFormaPagamento: any;
  condPagamento = [
    { id: 1, nome: 'A Vista' },
    { id: 2, nome: '30' },
    { id: 3, nome: '60' },
  ];
  selectedCondPagamento: any;
  pedidoId: any;

  constructor(
    private pedidoService: PedidosService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private spinner: NgxSpinnerService,
    private messageService: MessageService,
    private erroHandler: ErrorHandlerService,
    private categoriaService: CategoriasService
  ) {}

  ngOnInit(): void {
    this.colsProdutos = [
        { field: 'nome', header: 'Nome' },
        { field: 'preco', header: 'Preço' },
        { field: 'categoria', header: 'Categoria' }
      ];
  
      // Definindo as categorias (isso poderia vir de uma API)
      this.categorias = [
        { label: 'Todos', value: '' },
        { label: 'Eletrônicos', value: 'Eletrônicos' },
        { label: 'Roupas', value: 'Roupas' },
        { label: 'Eletrodomésticos', value: 'Eletrodomésticos' }
      ];
  
      // Dados dos produtos
      this.produtos = [
        { nome: 'Produto A', preco: 'R$ 50,00', categoria: 'Eletrônicos' },
        { nome: 'Produto B', preco: 'R$ 30,00', categoria: 'Roupas' },
        { nome: 'Produto C', preco: 'R$ 100,00', categoria: 'Eletrodomésticos' },
        { nome: 'Produto D', preco: 'R$ 200,00', categoria: 'Eletrônicos' }
      ];
  
      // Inicialmente, todos os produtos são exibidos
      this.produtosFiltrados = this.produtos;
  }

  getClientesDropdown() {
    return this.clientes.map((cliente) => {
      return { label: cliente.nome, value: cliente.id };
    });
  }
  getTipoPedidoDropdown() {
    return this.tipoPedido.map((tipoPedido) => {
      return { label: tipoPedido.nome, value: tipoPedido.id };
    });
  }
  getFormaPagamentoDropdown() {
    return this.formaPagamento.map((formaPagamento) => {
      return { label: formaPagamento.nome, value: formaPagamento.id };
    });
  }
  getCondPagamentoDropdown() {
    return this.condPagamento.map((condPagamento) => {
      return { label: condPagamento.nome, value: condPagamento.id };
    });
  }
  products = [
    { sku: '001', name: 'Produto 1', category: 'Categoria 1', price: 100, quantity: 2 },
    { sku: '002', name: 'Produto 2', category: 'Categoria 2', price: 150, quantity: 1 },
    // Adicione mais produtos conforme necessário
  ];
  

  deleteProduct(product: any) {
    this.products = this.products.filter(p => p.sku !== product.sku);
  }

  abrirDialogoProdutos() {
    this.displayProdutos = true;
  }

  // Função para filtrar produtos com base na categoria selecionada
  filtrarProdutosPorCategoria() {
    if (this.categoriaSelecionada) {
      this.produtosFiltrados = this.produtos.filter(produto => 
        produto.categoria === this.categoriaSelecionada);
    } else {
      this.produtosFiltrados = this.produtos;
    }
    this.filtrarProdutosPorNome(); // Aplicar filtro de nome, se houver
  }

  // Função para filtrar produtos pelo nome
  filtrarProdutosPorNome() {
    if (this.filtroProduto) {
      this.produtosFiltrados = this.produtosFiltrados.filter(produto =>
        produto.nome.toLowerCase().includes(this.filtroProduto.toLowerCase())
      );
    } else {
      this.filtrarProdutosPorCategoria();
    }
  }

  // Função para confirmar a seleção do produto
  confirmarSelecao() {
    if (this.produtoSelecionado) {
      console.log('Produto Selecionado:', this.produtoSelecionado);
      this.displayProdutos = false;  // Fechar o diálogo após a seleção
    } else {
      console.log('Nenhum produto selecionado.');
    }
  }

  // Função para cancelar a seleção e fechar o diálogo
  cancelarSelecao() {
    this.produtoSelecionado = null;  // Resetar a seleção
    this.displayProdutos = false;    // Fechar o diálogo
  }
  
  



}

