import { iIndirizzoRequest } from "../../interfaces/i-indirizzo-request"

export interface iRegisterRequest {
  username:string
  password:string
  nome:string
  cognome:string
  email:string
  telefono:string
  privacy:boolean
  data_di_nascita:string
  indirizzo:iIndirizzoRequest
}
