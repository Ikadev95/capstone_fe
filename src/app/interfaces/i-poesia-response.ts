import { iAppUserRequest } from "./i-app-user-request";
import { iCategoriaResponse } from "./i-categoria-response";

export interface iPoesiaResponse {
  id: number
  titolo: string;
  testo: string;
  data_inserimento: string;
  user: iAppUserRequest;
  categoria: iCategoriaResponse;
}
