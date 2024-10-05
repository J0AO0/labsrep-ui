import { Injectable } from '@angular/core';
import { FiltroCategorias } from '../../models/filtros.model';

@Injectable({
    providedIn: 'root',
})

export class FiltroCategoriasService {


    constructor() { }

    async filtro(value: any, oldFiltro: FiltroCategorias): Promise<FiltroCategorias> {

        let filtro = new FiltroCategorias();

        filtro = { ...oldFiltro };

        filtro.pagina = 0;
        filtro.itensPorPagina = 10;

        if (value.field === 'codigo') {
            filtro.codigo = value.qty;
        }

        if (value.field === 'descricao') {
            filtro.descricao = value.qty;
        }

        if (value.field === 'usuariocriacao') {
            filtro.usuariocriacao = value.qty;
        }

        if (value.field === 'usuarioalteracao') {
            filtro.usuarioalteracao = value.qty;
        }

        return filtro;
    }
}
