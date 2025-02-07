import { iAppUserRequest } from "./i-app-user-request";
import { iCategoriaResponse } from "./i-categoria-response";

export interface iFotografiaResponse {
  titolo: string;
  data_inserimento: string;
  user: iAppUserRequest;
  categoria: iCategoriaResponse;
  estensioneFile: string;
  percorsoFile: string;
}
