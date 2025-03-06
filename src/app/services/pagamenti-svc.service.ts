import { BehaviorSubject, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { iPagamentoResponse } from '../interfaces/i-pagamento-response';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PagamentiSvcService {

  pagamentiSubject$ = new BehaviorSubject<any | null>(null)
  baseUrl:string = environment.baseUrl;

  constructor(private http:HttpClient) {
    this.getPagamentiUser().subscribe();
   }

   getPagamentiUser(){
    return this.http.get<iPagamentoResponse[]>(`${this.baseUrl}pagamenti/user`).pipe(
      tap(data => {
        this.pagamentiSubject$.next(data);
      })
    );
  }

  getPagamentiUserId(id: number) {
    return this.http.get<iPagamentoResponse[]>(`${this.baseUrl}pagamenti/userFromAdmin?id=${id}`)

  }
}
