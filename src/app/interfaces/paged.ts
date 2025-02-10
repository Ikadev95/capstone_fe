import { iUserPaged } from "./i-user-paged";
import { Pageable } from "./pageable";
import { Sort } from "./sort";

export interface Paged {
  content: iUserPaged[];
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
