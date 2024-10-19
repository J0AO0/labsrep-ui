/**import { CommonModule } from '@angular/common';
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

@Component({
  selector: 'app-pedidos-cadastro',
  templateUrl: './pedidos-cadastro.component.html',
  styleUrls: ['./pedidos-cadastro.component.css']
})
export class PedidosCadastroComponent implements OnInit {
  messageDrop = 'Nenhum resultado encontrado...';

  descricao: string = '';
  selectedFile: File | null = null;

  regex = new Regex();
  salvando: boolean = false;
  pedidos = new Pedidos();
  idPedido: number;

  pedidoId: any
  selectedCategoria: any;
  categorias = []

  constructor(private pedidoService: PedidosService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private spinner: NgxSpinnerService,
    private messageService: MessageService,
    private erroHandler: ErrorHandlerService,
    private categoriaService: CategoriasService
  ) { }

  ngOnInit() {
    this.carregarCategoria();
    this.title.setTitle('Cadastro Pedidos');
    this.idPedido = this.route.snapshot.params['id'];
    if (this.idPedido) {
      this.spinner.show();
      this.carregarProduto(this.idPedido);
    } else {
      this.pedidos.status = true;
    }
  }


  get editando() {
    return Boolean(this.pedidos.id);
  }

  salvar(form: NgForm) {
    if (this.editando) {
    } else {
      this.adicionarProduto(form);
    }
  }

  atualizarProduto(form: NgForm) {
    this.salvando = true;
    this.carregarCategoria()
    // console.log(this.selectedPaciente);
    // console.log(this.atendimentos);
    this.pedidoService
      .atualizar(this.pedidos)
      .then((produto) => {
        this.pedidos = produto;
        this.messageService.add({
          severity: 'info',
          summary: 'Produto',
          detail: `alterado com sucesso!`,
        });
        this.salvando = false;
        this.router.navigate(['/pedidos']);
        this.atualizarTituloEdicao();
      })
      .catch((erro) => {
        this.salvando = false;
        this.erroHandler.handle(erro);
      });
  }

  adicionarProduto(form: NgForm) {
    this.salvando = true;
    this.carregarCategoria();

    // Primeiro adiciona o produto
    this.pedidoService.adicionar(this.pedidos)
      .then((produtoAdicionado) => {
        // Verifique se o arquivo de imagem foi selecionado
        if (this.selectedFile) {
          // Agora chama o upload passando o ID do produto adicionado
          const formData = new FormData();
          formData.append('arquivo', this.selectedFile); // Adiciona o arquivo ao FormData
          formData.append('descricao', this.descricao); // Adiciona a descrição ao FormData

          this.pedidoService.uploadFoto(produtoAdicionado.id, formData).subscribe(
            (response) => {
              this.messageService.add({
                severity: 'success',
                summary: 'Produto',
                detail: 'Produto e imagem adicionados com sucesso!'
              });
              this.router.navigate(['/pedidos']);
            },
            (error) => {
              this.erroHandler.handle(error);
            }
          );
        } else {
          // Se não houver arquivo, apenas exibe uma mensagem de sucesso
          this.messageService.add({
            severity: 'success',
            summary: 'Produto',
            detail: 'Produto adicionado com sucesso!'
          });
          this.router.navigate(['/pedidos']);
        }
        this.salvando = false;
      })
      .catch((erro) => {
        this.salvando = false;
        this.erroHandler.handle(erro);
      });
  }



  carregarProduto(id: number) {
    this.pedidoService.buscarPorId(id)
      .then((obj) => {
        setTimeout(() => {
          this.selectedCategoria = this.categorias.find(
            (pac) => pac.value === obj.pedido.id
          );




        }, 300);
        this.pedidos = obj;
        this.atualizarTituloEdicao();
        this.spinner.hide();
      })
      .catch((erro) => {
        this.spinner.hide();
        this.erroHandler.handle(erro);
      })
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de Categorias: ${this.pedidos.name}`);
  }


  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  // onUpload() {
  //   if (this.selectedFile) {
  //     this.pedidoService.uploadFoto(this.selectedFile).subscribe(
  //       (response) => console.log('Sucesso!', response),
  //       (error) => console.log('Erro', error)
  //     );
  //   }
  // }

  onUpload(event: any) {
    this.selectedFile = event.files[0]; // Captura o arquivo selecionado
  }

  onSubmit() {
    if (this.selectedFile && this.descricao) {
      const formData = new FormData();
      formData.append('arquivo', this.selectedFile);
      formData.append('descricao', this.descricao);

      this.produtoId = this.pedidoService.buscarPorId(this.idPedido);

      console.log(this.produtoId)

      this.pedidoService.uploadFoto(this.produtoId, formData).subscribe({
        next: (response) => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Foto salva com sucesso!' });
        },
        error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao salvar a foto.' });
        }
      });
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: 'Selecione um arquivo e insira a descrição.' });
    }
  }

  carregarCategoria() {
    return this.categoriaService.listar()
      .then((pac) => {
        this.categorias = pac.map((mp) => ({ label: mp.nome, value: mp.id }));

      })
      .catch((erro) => {
        this.erroHandler.handle(erro);
      });

  }


}

*/