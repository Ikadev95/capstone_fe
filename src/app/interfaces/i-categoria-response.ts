import { iAppUserRequest } from "./i-app-user-request";

export interface iCategoriaResponse {
  id:number
  nome_categoria: string;
  sezione: SEZIONI;
  giudici: iAppUserRequest[];
}

enum SEZIONI {
 POESIA,
 FOTOGRAFIA}
