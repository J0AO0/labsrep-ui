import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PermissaoTreeNodeService {
  constructor(private router: Router) { }

  permissaoTreeNode(selected: any, permissao: any) {
    for (const i of Object.keys(selected)) {
      switch (selected[i].data) {
        // Permissão em Usuarios---------------------------------
        case 'usuariosCriar':
          permissao[0].permission.create = true;
          break;
        case 'usuariosVisualizar':
          permissao[0].permission.read = true;
          break;
        case 'usuariosEditar':
          permissao[0].permission.update = true;
          break;
        case 'usuariosStatus':
          permissao[0].permission.status = true;
          break;
        case 'usuariosExcluir':
          permissao[0].permission.delete = true;
          break;

        // Permissão em Relatório-------------------------------------
        // case 'relatoriosVisualizar':
        //   permissao[5].permission.read = true;
        //   break;

        // Permissão em Empresas---------------------------------
        case 'empresasCriar':
          console.log('Empresa existente')
          permissao[1].permission.create = true;
          console.log(permissao[1].permission.read)
          break;
        case 'empresasVisualizar':
          permissao[1].permission.read = true;
          break;
        case 'empresasEditar':
          permissao[1].permission.update = true;
          break;
        case 'empresasStatus':
          permissao[1].permission.status = true;
          break;
        case 'empresasExcluir':
          permissao[1].permission.delete = true;
          break;
      }
    }


  }
  carregarPermissoesTreeNode(permissao: any, selectedpermissao: any) {







    // Início de Permissao de Usuarios--------------------------------------------------------------
    if (permissao[0].permission.create !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'usuariosCriar') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[0].permission.read !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'usuariosVisualizar') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[0].permission.update !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'usuariosEditar') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[0].permission.status !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'usuariosStatus') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[0].permission.delete !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'usuariosExcluir') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (
      permissao[0].permission.create !== true &&
      permissao[0].permission.read !== true &&
      permissao[0].permission.update !== true &&
      permissao[0].permission.status !== true &&
      permissao[0].permission.delete !== true
    ) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'usuarios') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    // Fim permissao de Usuarios -------------------------------------------------------------------

    // // Início de Permissao de Relatórios------------------------------------------------
    // if (permissao[5].permission.read !== true) {
    //   selectedpermissao.forEach((item, index) => {
    //     if (item.data === 'relatoriosVisualizar') {
    //       selectedpermissao.splice(index, 1);
    //     }
    //   });
    // }
    // if (permissao[5].permission.read !== true) {
    //   selectedpermissao.forEach((item, index) => {
    //     if (item.data === 'relatorios') {
    //       selectedpermissao.splice(index, 1);
    //     }
    //   });
    // }
    // // Fim permissao de Relatórios------------------------------------------------

    // Início de Permissao de Empresas--------------------------------------------------------------
    if (permissao[1].permission.create !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'empresaCriar') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[1].permission.read !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'empresaVisualizar') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[1].permission.update !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'empresaEditar') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[1].permission.status !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'empresaStatus') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[1].permission.delete !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'empresaExcluir') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (
      permissao[1].permission.create !== true &&
      permissao[1].permission.read !== true &&
      permissao[1].permission.update !== true &&
      permissao[1].permission.status !== true &&
      permissao[1].permission.delete !== true
    ) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'empresa') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    // Fim permissao de Empresas -------------------------------------------------------------------







    // Verificar Node de Cadastro-------------------------------------------------------------------
    if (
      permissao[0].permission.create !== true &&
      permissao[0].permission.read !== true &&
      permissao[0].permission.update !== true &&
      permissao[0].permission.status !== true &&
      permissao[0].permission.delete !== true &&
      permissao[1].permission.create !== true &&
      permissao[1].permission.read !== true &&
      permissao[1].permission.update !== true &&
      permissao[1].permission.status !== true &&
      permissao[1].permission.delete !== true &&
      permissao[2].permission.create !== true &&
      permissao[2].permission.read !== true &&
      permissao[2].permission.update !== true &&
      permissao[2].permission.status !== true &&
      permissao[2].permission.delete !== true &&
      permissao[3].permission.create !== true &&
      permissao[3].permission.read !== true &&
      permissao[3].permission.update !== true &&
      permissao[3].permission.status !== true &&
      permissao[3].permission.delete !== true &&
      permissao[4].permission.read !== true &&
      permissao[4].permission.update !== true &&
      permissao[4].permission.delete !== true &&
      permissao[5].permission.create !== true &&
      permissao[5].permission.read !== true &&
      permissao[5].permission.update !== true &&
      permissao[5].permission.status !== true &&
      permissao[5].permission.delete !== true &&
      permissao[6].permission.create !== true &&
      permissao[6].permission.read !== true &&
      permissao[6].permission.update !== true &&
      permissao[6].permission.status !== true &&
      permissao[6].permission.delete !== true &&
      permissao[7].permission.create !== true &&
      permissao[7].permission.read !== true &&
      permissao[7].permission.update !== true &&
      permissao[7].permission.status !== true &&
      permissao[7].permission.delete !== true
    ) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'cadastroNode') {
          selectedpermissao.splice(index, 1);
        }
      });
    }

  }
}

