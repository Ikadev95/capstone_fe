import { BehaviorSubject, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { iPagamentoResponse } from '../interfaces/i-pagamento-response';

@Injectable({
  providedIn: 'root'
})
export class PagamentiSvcService {

  pagamentiSubject$ = new BehaviorSubject<any | null>(null)

  constructor(private http:HttpClient) {
    this.getPagamentiUser().subscribe();
   }

  getPagamentiUser(){
    return this.http.get<iPagamentoResponse[]>('http://localhost:8080/pagamenti/user').pipe(
      tap(data => {
        if(data == null){
          this.pagamentiSubject$.next(data)
        }
     }
       ))
  }
}
