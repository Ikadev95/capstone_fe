import { iFotografiaClassifica } from "./i-fotografia-classifica";
import { Pageable } from "./pageable";
import { Sort } from "./sort";

export interface PagedClassificaFoto {
        content: iFotografiaClassifica[];
        empty: boolean;
        first: boolean;
        last: boolean;
        number: number;
        numberOfElements: number;
        pageable: Pageable;
        size: number;
        sort: Sort;
        totalElements: number;
        totalPages: number;
}
