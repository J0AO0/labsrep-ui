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

        // Permissão em Categorias------- --------------------------
        case 'categoriasCriar':
          console.log('Categoria existente')
          permissao[2].permission.create = true;
          console.log(permissao[2].permission.read)
          break;
        case 'categoriasVisualizar':
          permissao[2].permission.read = true;
          break;
        case 'categoriasEditar':
          permissao[2].permission.update = true;
          break;
        case 'categoriasStatus':
          permissao[2].permission.status = true;
          break;
        case 'categoriasExcluir':
          permissao[2].permission.delete = true;
          break;

          case 'pedidosCriar':
            console.log('Pedido existente')
            permissao[3].permission.create = true;
            console.log(permissao[3].permission.read)
            break;
          case 'pedidosVisualizar':
            permissao[3].permission.read = true;
            break;
          case 'pedidosEditar':
            permissao[3].permission.update = true;
            break;
          case 'pedidosStatus':
            permissao[3].permission.status = true;
            break;
          case 'pedidosExcluir':
            permissao[3].permission.delete = true;
            break;

            case 'produtosCriar':
              console.log('Produto existente')
              permissao[4].permission.create = true;
              console.log(permissao[4].permission.read)
              break;
            case 'produtosVisualizar':
              permissao[4].permission.read = true;
              break;
            case 'produtosEditar':
              permissao[4].permission.update = true;
              break;
            case 'produtosStatus':
              permissao[4].permission.status = true;
              break;
            case 'produtosExcluir':
              permissao[4].permission.delete = true;
              break;

              case 'condPagamentosCriar':
                console.log('Condição de Pagamento existente')
                permissao[5].permission.create = true;
                console.log(permissao[5].permission.read)
                break;
              case 'condPagamentosVisualizar':
                permissao[5].permission.read = true;
                break;
              case 'condPagamentosEditar':
                permissao[5].permission.update = true;
                break;
              case 'condPagamentosStatus':
                permissao[5].permission.status = true;
                break;
              case 'condPagamentosExcluir':
                permissao[5].permission.delete = true;
                break;

                case 'tipoFretesCriar':
                  console.log('Tipo de Frete existente')
                  permissao[6].permission.create = true;
                  console.log(permissao[6].permission.read)
                  break;
                case 'tipoFretesVisualizar':
                  permissao[6].permission.read = true;
                  break;
                case 'tipoFretesEditar':
                  permissao[6].permission.update = true;
                  break;
                case 'tipoFretesStatus':
                  permissao[6].permission.status = true;
                  break;
                case 'tipoFretesExcluir':
                  permissao[6].permission.delete = true;
                  break;

                  case 'formaPagamentosCriar':
                    console.log('Forma de Pagamento existente')
                    permissao[7].permission.create = true;
                    console.log(permissao[7].permission.read)
                    break;
                  case 'formaPagamentosVisualizar':
                    permissao[7].permission.read = true;
                    break;
                  case 'formaPagamentosEditar':
                    permissao[7].permission.update = true;
                    break;
                  case 'formaPagamentosStatus':
                    permissao[7].permission.status = true;
                    break;
                  case 'formaPagamentosExcluir':
                    permissao[7].permission.delete = true;
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

    // Início de Permissao de Categorias--------------------------------------------------------------
    if (permissao[2].permission.create !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'categoriaCriar') {
          selectedpermissao.splice(index, 2);
        }
      });
    }
    if (permissao[2].permission.read !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'categoriaVisualizar') {
          selectedpermissao.splice(index, 2);
        }
      });
    }
    if (permissao[2].permission.update !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'categoriaEditar') {
          selectedpermissao.splice(index, 2);
        }
      });
    }
    if (permissao[2].permission.status !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'categoriaStatus') {
          selectedpermissao.splice(index, 2);
        }
      });
    }
    if (permissao[2].permission.delete !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'categoriaExcluir') {
          selectedpermissao.splice(index, 2);
        }
      });
    }
    if (
      permissao[2].permission.create !== true &&
      permissao[2].permission.read !== true &&
      permissao[2].permission.update !== true &&
      permissao[2].permission.status !== true &&
      permissao[2].permission.delete !== true
    ) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'categoria') {
          selectedpermissao.splice(index, 2);
        }
      });
    }
    // Fim permissao de categorias -------------------------------------------------------------------

    // Início de Permissao de pedidos--------------------------------------------------------------
    if (permissao[3].permission.create !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'pedidoCriar') {
          selectedpermissao.splice(index, 3);
        }
      });
    }
    if (permissao[3].permission.read !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'pedidoVisualizar') {
          selectedpermissao.splice(index, 3);
        }
      });
    }
    if (permissao[3].permission.update !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'pedidoEditar') {
          selectedpermissao.splice(index, 3);
        }
      });
    }
    if (permissao[3].permission.status !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'pedidoStatus') {
          selectedpermissao.splice(index, 3);
        }
      });
    }
    if (permissao[3].permission.delete !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'pedidoExcluir') {
          selectedpermissao.splice(index, 3);
        }
      });
    }
    if (
      permissao[3].permission.create !== true &&
      permissao[3].permission.read !== true &&
      permissao[3].permission.update !== true &&
      permissao[3].permission.status !== true &&
      permissao[3].permission.delete !== true
    ) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'pedido') {
          selectedpermissao.splice(index, 3);
        }
      });
    }
    // Fim permissao de pedidos -------------------------------------------------------------------

    // Início de Permissao de produtos--------------------------------------------------------------
    if (permissao[4].permission.create !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'produtoCriar') {
          selectedpermissao.splice(index, 4);
        }
      });
    }
    if (permissao[4].permission.read !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'produtoVisualizar') {
          selectedpermissao.splice(index, 4);
        }
      });
    }
    if (permissao[4].permission.update !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'produtoEditar') {
          selectedpermissao.splice(index, 4);
        }
      });
    }
    if (permissao[4].permission.status !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'produtoStatus') {
          selectedpermissao.splice(index, 4);
        }
      });
    }
    if (permissao[4].permission.delete !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'produtoExcluir') {
          selectedpermissao.splice(index, 4);
        }
      });
    }
    if (
      permissao[4].permission.create !== true &&
      permissao[4].permission.read !== true &&
      permissao[4].permission.update !== true &&
      permissao[4].permission.status !== true &&
      permissao[4].permission.delete !== true
    ) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'produto') {
          selectedpermissao.splice(index, 4);
        }
      });
    }
    // Fim permissao de produtos -------------------------------------------------------------------

        // Início de Permissao de condPagamentos--------------------------------------------------------------
        if (permissao[5].permission.create !== true) {
          selectedpermissao.forEach((item, index) => {
            if (item.data === 'condPagamentoCriar') {
              selectedpermissao.splice(index, 5);
            }
          });
        }
        if (permissao[5].permission.read !== true) {
          selectedpermissao.forEach((item, index) => {
            if (item.data === 'condPagamentoVisualizar') {
              selectedpermissao.splice(index, 5);
            }
          });
        }
        if (permissao[5].permission.update !== true) {
          selectedpermissao.forEach((item, index) => {
            if (item.data === 'condPagamentoEditar') {
              selectedpermissao.splice(index, 5);
            }
          });
        }
        if (permissao[5].permission.status !== true) {
          selectedpermissao.forEach((item, index) => {
            if (item.data === 'condPagamentoStatus') {
              selectedpermissao.splice(index, 5);
            }
          });
        }
        if (permissao[5].permission.delete !== true) {
          selectedpermissao.forEach((item, index) => {
            if (item.data === 'condPagamentoExcluir') {
              selectedpermissao.splice(index, 5);
            }
          });
        }
        if (
          permissao[5].permission.create !== true &&
          permissao[5].permission.read !== true &&
          permissao[5].permission.update !== true &&
          permissao[5].permission.status !== true &&
          permissao[5].permission.delete !== true
        ) {
          selectedpermissao.forEach((item, index) => {
            if (item.data === 'condPagamento') {
              selectedpermissao.splice(index, 5);
            }
          });
        }
        // Fim permissao de condPagamentos -------------------------------------------------------------------

                // Início de Permissao de tipoFretes--------------------------------------------------------------
                if (permissao[6].permission.create !== true) {
                  selectedpermissao.forEach((item, index) => {
                    if (item.data === 'tipoFreteCriar') {
                      selectedpermissao.splice(index, 6);
                    }
                  });
                }
                if (permissao[6].permission.read !== true) {
                  selectedpermissao.forEach((item, index) => {
                    if (item.data === 'tipoFreteVisualizar') {
                      selectedpermissao.splice(index, 6);
                    }
                  });
                }
                if (permissao[6].permission.update !== true) {
                  selectedpermissao.forEach((item, index) => {
                    if (item.data === 'tipoFreteEditar') {
                      selectedpermissao.splice(index, 6);
                    }
                  });
                }
                if (permissao[6].permission.status !== true) {
                  selectedpermissao.forEach((item, index) => {
                    if (item.data === 'tipoFreteStatus') {
                      selectedpermissao.splice(index, 6);
                    }
                  });
                }
                if (permissao[6].permission.delete !== true) {
                  selectedpermissao.forEach((item, index) => {
                    if (item.data === 'tipoFreteExcluir') {
                      selectedpermissao.splice(index, 6);
                    }
                  });
                }
                if (
                  permissao[6].permission.create !== true &&
                  permissao[6].permission.read !== true &&
                  permissao[6].permission.update !== true &&
                  permissao[6].permission.status !== true &&
                  permissao[6].permission.delete !== true
                ) {
                  selectedpermissao.forEach((item, index) => {
                    if (item.data === 'tipoFrete') {
                      selectedpermissao.splice(index, 6);
                    }
                  });
                }
                // Fim permissao de tipoFretes -------------------------------------------------------------------

                                // Início de Permissao de tipoFretes--------------------------------------------------------------
                if (permissao[6].permission.create !== true) {
                  selectedpermissao.forEach((item, index) => {
                    if (item.data === 'tipoFreteCriar') {
                      selectedpermissao.splice(index, 6);
                    }
                  });
                }
                if (permissao[6].permission.read !== true) {
                  selectedpermissao.forEach((item, index) => {
                    if (item.data === 'tipoFreteVisualizar') {
                      selectedpermissao.splice(index, 6);
                    }
                  });
                }
                if (permissao[6].permission.update !== true) {
                  selectedpermissao.forEach((item, index) => {
                    if (item.data === 'tipoFreteEditar') {
                      selectedpermissao.splice(index, 6);
                    }
                  });
                }
                if (permissao[6].permission.status !== true) {
                  selectedpermissao.forEach((item, index) => {
                    if (item.data === 'tipoFreteStatus') {
                      selectedpermissao.splice(index, 6);
                    }
                  });
                }
                if (permissao[6].permission.delete !== true) {
                  selectedpermissao.forEach((item, index) => {
                    if (item.data === 'tipoFreteExcluir') {
                      selectedpermissao.splice(index, 6);
                    }
                  });
                }
                if (
                  permissao[6].permission.create !== true &&
                  permissao[6].permission.read !== true &&
                  permissao[6].permission.update !== true &&
                  permissao[6].permission.status !== true &&
                  permissao[6].permission.delete !== true
                ) {
                  selectedpermissao.forEach((item, index) => {
                    if (item.data === 'tipoFrete') {
                      selectedpermissao.splice(index, 6);
                    }
                  });
                }
                // Fim permissao de tipoFretes -------------------------------------------------------------------

                                // Início de Permissao de tipoFretes--------------------------------------------------------------
                if (permissao[6].permission.create !== true) {
                  selectedpermissao.forEach((item, index) => {
                    if (item.data === 'tipoFreteCriar') {
                      selectedpermissao.splice(index, 6);
                    }
                  });
                }
                if (permissao[6].permission.read !== true) {
                  selectedpermissao.forEach((item, index) => {
                    if (item.data === 'tipoFreteVisualizar') {
                      selectedpermissao.splice(index, 6);
                    }
                  });
                }
                if (permissao[6].permission.update !== true) {
                  selectedpermissao.forEach((item, index) => {
                    if (item.data === 'tipoFreteEditar') {
                      selectedpermissao.splice(index, 6);
                    }
                  });
                }
                if (permissao[6].permission.status !== true) {
                  selectedpermissao.forEach((item, index) => {
                    if (item.data === 'tipoFreteStatus') {
                      selectedpermissao.splice(index, 6);
                    }
                  });
                }
                if (permissao[6].permission.delete !== true) {
                  selectedpermissao.forEach((item, index) => {
                    if (item.data === 'tipoFreteExcluir') {
                      selectedpermissao.splice(index, 6);
                    }
                  });
                }
                if (
                  permissao[6].permission.create !== true &&
                  permissao[6].permission.read !== true &&
                  permissao[6].permission.update !== true &&
                  permissao[6].permission.status !== true &&
                  permissao[6].permission.delete !== true
                ) {
                  selectedpermissao.forEach((item, index) => {
                    if (item.data === 'tipoFrete') {
                      selectedpermissao.splice(index, 6);
                    }
                  });
                }
                // Fim permissao de tipoFretes -----------------------------------------------------------------
                          // Início de Permissao de formaPagamentos--------------------------------------------------------------
                          if (permissao[7].permission.create !== true) {
                            selectedpermissao.forEach((item, index) => {
                              if (item.data === 'formaPagamentoCriar') {
                                selectedpermissao.splice(index, 7);
                              }
                            });
                          }
                          if (permissao[7].permission.read !== true) {
                            selectedpermissao.forEach((item, index) => {
                              if (item.data === 'formaPagamentoVisualizar') {
                                selectedpermissao.splice(index, 7);
                              }
                            });
                          }
                          if (permissao[7].permission.update !== true) {
                            selectedpermissao.forEach((item, index) => {
                              if (item.data === 'formaPagamentoEditar') {
                                selectedpermissao.splice(index, 7);
                              }
                            });
                          }
                          if (permissao[7].permission.status !== true) {
                            selectedpermissao.forEach((item, index) => {
                              if (item.data === 'formaPagamentoStatus') {
                                selectedpermissao.splice(index, 7);
                              }
                            });
                          }
                          if (permissao[7].permission.delete !== true) {
                            selectedpermissao.forEach((item, index) => {
                              if (item.data === 'formaPagamentoExcluir') {
                                selectedpermissao.splice(index, 7);
                              }
                            });
                          }
                          if (
                            permissao[7].permission.create !== true &&
                            permissao[7].permission.read !== true &&
                            permissao[7].permission.update !== true &&
                            permissao[7].permission.status !== true &&
                            permissao[7].permission.delete !== true
                          ) {
                            selectedpermissao.forEach((item, index) => {
                              if (item.data === 'formaPagamento') {
                                selectedpermissao.splice(index, 7);
                              }
                            });
                          }
                          // Fim permissao de formaPagamentos -------------------------------------------------------------------

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

