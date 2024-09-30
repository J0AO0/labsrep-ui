import { Injectable } from '@angular/core';
import { TreeNode } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class TreeNodePermissoesService {

  treeNodePermissoes: TreeNode[];
  constructor() { }

  criarTreeNodePermissoes() {
    return [

      {
        label: 'Todas Permissões',
        selectable: true,
        data: 'cadastroNode',
        key: 'cadastroNode',

        children: [
          {
            label: 'Empresas',
            data: 'empresas',
            key: 'empresas',
            children: [
              {
                label: 'Criar',
                data: 'empresasCriar',
                key: 'empresasCriar',
              },
              {
                label: 'Visualizar',
                data: 'empresasVisualizar',
                key: 'empresasVisualizar',
              },
              {
                label: 'Editar',
                data: 'empresasEditar',
                key: 'empresasEditar',
              },
              {
                label: 'Status',
                data: 'empresasStatus',
                key: 'empresasStatus',
              },
            ],
          },
          {
            label: 'Usuários',
            data: 'usuarios',
            key: 'usuarios',
            children: [
              {
                label: 'Criar',
                data: 'usuariosCriar',
                key: 'usuariosCriar',
              },
              {
                label: 'Visualizar',
                data: 'usuariosVisualizar',
                key: 'usuariosVisualizar',
              },
              {
                label: 'Editar',
                data: 'usuariosEditar',
                key: 'usuariosEditar',
              },
              {
                label: 'Status',
                data: 'usuariosStatus',
                key: 'usuariosStatus',
              },
            ],
          }

        ]
      }
    ];
  }
}
