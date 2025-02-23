import { iPoesiaClassifica } from "./i-poesia-classifica";
import { Pageable } from "./pageable";
import { Sort } from "./sort";

export interface PagedClassificaPoesia {
        content: iPoesiaClassifica[];
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
