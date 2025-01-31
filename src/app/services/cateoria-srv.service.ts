import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { iComuneResponse } from '../interfaces/i-comune-response';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { iCategoriaResponse } from '../interfaces/i-categoria-response';

@Injectable({
  providedIn: 'root'
})
export class CateoriaSrvService {

    categoriaSubject$ = new BehaviorSubject<iCategoriaResponse[] | null>(null);

    private provinciaUrl:string = `${environment.baseUrl}categorie`

  constructor(private http:HttpClient) { }
}
