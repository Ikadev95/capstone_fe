import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { iComuneResponse } from '../interfaces/i-comune-response';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { iCategoriaResponse } from '../interfaces/i-categoria-response';

@Injectable({
  providedIn: 'root'
})
export class CategoriaSrvService {

    categoriaSubject$ = new BehaviorSubject<iCategoriaResponse[] | null>(null);
    sezionePoesieSubject$ = new BehaviorSubject<iCategoriaResponse[] | null>(null);
    sezioneFotografieSubject$ = new BehaviorSubject<iCategoriaResponse[] | null>(null);

    private provinciaUrl:string = `${environment.baseUrl}categorie`

  constructor(private http:HttpClient) { }


  getAllCategorie(){
    return this.http
    .get<iCategoriaResponse[]>(this.provinciaUrl)
    .pipe(tap(data => this.categoriaSubject$.next(data)))
  }

  getCategrieBySezionePoesia() {
    return this.http
    .get<iCategoriaResponse[]>(`${this.provinciaUrl}/sezione/${'POESIA'}`)
    .pipe(tap(data => this.sezionePoesieSubject$.next(data)))
  }

  getCategorieBySezioneFotografia() {
    return this.http
    .get<iCategoriaResponse[]>(`${this.provinciaUrl}/sezione/${'FOTOGRAFIA'}`)
    .pipe(tap(data => this.sezioneFotografieSubject$.next(data)))
  }
}
