import { Injectable } from '@angular/core';
import { FiltrosTipoFretes } from '../../models/filtros.model';


@Injectable({
    providedIn: 'root',
})

export class FiltroTipoFretesService {


    constructor() { }

    async filtro(value: any, oldFiltro: FiltrosTipoFretes): Promise<FiltrosTipoFretes> {

        let filtro = new FiltrosTipoFretes();

        filtro = { ...oldFiltro };

        filtro.pagina = 0;
        filtro.itensPorPagina = 10;

        if (value.field === 'id') {
            filtro.id = value.qty;
        }

        if (value.field === 'descricao') {
            filtro.descricao = value.qty;
        }

        if (value.field === 'emailusuario') {
            filtro.emailusuario = value.qty;
        }

        if(value.field === 'status'){
            filtro.status = value.qty;
          }

        return filtro;
    }
}
