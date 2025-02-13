import { iComponimentoFullResponse } from "./i-componimento-full-response";
import { Pageable } from "./pageable";
import { Sort } from "./sort";

export interface PagedComponimenti {
      content: iComponimentoFullResponse[];
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
