import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { iComuneResponse } from '../interfaces/i-comune-response';
import { iProvinciaRequest } from '../interfaces/i-provincia-request';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ComunesvcService {

    comuneSubject$ = new BehaviorSubject<iComuneResponse[] | null>(null);
  provinciaSubject$ = new BehaviorSubject<iProvinciaRequest[] | null>(null);
  id:number = 0;

  private comuneUrl:string = `${environment.baseUrl}comuni/byProvincia/${this.id}`
  private provinciaUrl:string = `${environment.baseUrl}province`

  constructor(private http:HttpClient) { }

  getComuni(id:number){
    this.id = id
    this.comuneUrl = `${environment.baseUrl}comuni/byProvincia/${this.id}`
    this.http.get<iComuneResponse[]>(this.comuneUrl).subscribe(data => this.comuneSubject$.next(data))
  }

  getProvince(){
    return this.http
    .get<iProvinciaRequest[]>(this.provinciaUrl)
    .pipe(tap(data => this.provinciaSubject$.next(data)))
  }
}
