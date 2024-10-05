import { CommonModule } from '@angular/common';
import { ProdutoService } from '../produto.service';
import { Component } from '@angular/core';


@Component({
  selector: 'app-produto-cadastro',
  templateUrl: './produto-cadastro.component.html',
  styleUrl: './produto-cadastro.component.css',
})
export class ProdutoCadastroComponent {

  selectedFile: File;

  constructor(private produtoService: ProdutoService) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    if (this.selectedFile) {
      this.produtoService.uploadFoto(this.selectedFile).subscribe(
        (response) => console.log('Sucesso!', response),
        (error) => console.log('Erro', error)
      );
    }
  }

 }
