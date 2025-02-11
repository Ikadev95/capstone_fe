import { iGiudiceResponse } from "./i-giudice-response";
import { Pageable } from "./pageable";
import { Sort } from "./sort";

export interface PagedGiudice {
    content: iGiudiceResponse[];
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
