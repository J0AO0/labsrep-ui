import { Produtos } from "./produtos.model";
import { TipoPedidos } from "./tipopedidos.model";

export class Pedidos {
    id?: number;
    cliente?: string;
    produtos = new Produtos();
    tipoPedido = new TipoPedidos();
    datagravacao: Date;
    emailusuario: string;
    status?: boolean;
}