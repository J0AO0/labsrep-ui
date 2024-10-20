import { CondPagamentos } from "./condpagamentos.model";
import { FormaPagamentos } from "./formapagamentos.model";
import { Produtos } from "./produtos.model";
import { TipoFretes } from "./tipofretes.model";
import { TipoPedidos } from "./tipopedidos.model";

export class Pedidos {
    id?: number;
    cliente?: string;
    produtos = new Produtos();
    tipoPedido = new TipoPedidos();
    CondPagamentos = new CondPagamentos();
    formaPagamento = new FormaPagamentos();
    tipoFretes = new TipoFretes();
    quantidade: number;
    preco: number;
    datagravacao: Date;
    emailusuario: string;
    status?: boolean;
}