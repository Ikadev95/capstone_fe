import { iAppUserResponse } from "./i-app-user-response";
import { iIndirizzoResponse } from "./i-indirizzo-response";

export interface iUtenteResponse {

    nome: string;
    cognome: string;
    email: string;
    data_di_nascita: string; // formato ISO (YYYY-MM-DD)
    telefono: string;
    avatar: string | null;
    privacy: boolean;
    indirizzo: iIndirizzoResponse;
    comune_di_nascita: string | null;
    appUser: iAppUserResponse;

}

