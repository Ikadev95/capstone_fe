import { iProvinciaRequest } from "./i-provincia-request"

export interface iComuneResponse {
  id:number
  nome_comune:string
  cap:string
  provincia: iProvinciaRequest

}
