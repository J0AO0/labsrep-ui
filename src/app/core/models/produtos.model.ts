import { Categorias } from './categorias.model';
export class Produtos {
    id?: number;
    sku: number;
    name?: string;
    descricao?: string;
    preco?: number;
    categoria = new Categorias()    
    datagravacao: Date;
    emailusuario: string;
    status?: boolean
}