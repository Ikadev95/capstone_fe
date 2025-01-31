import { iAppUserRequest } from "./i-app-user-request";
import { iComponimentoResponse } from "./i-componimento-response";
import { iSezioni } from "./i-sezioni";

export interface iCategoriaResponse {
  nome_categoria: string;
  sezione: iSezioni;
  giudici: iAppUserRequest[];
  componimenti: iComponimentoResponse[];
}
