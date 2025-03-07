import { iItemPaymentCash } from './../interfaces/i-pagamento-cash';
import { BehaviorSubject, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { iPagamentoResponse } from '../interfaces/i-pagamento-response';
import { environment } from '../../environments/environment.development';
import { iPagamentoResponseWithDate } from '../interfaces/i-pagamento-response-with-date';

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
    return this.http.get<iPagamentoResponseWithDate[]>(`${this.baseUrl}pagamenti/userFromAdmin?id=${id}`).pipe(
      tap(data => {
        data.forEach(pagamento => {
          pagamento.data_pagamento = new Date(pagamento.data_pagamento);
        })
      })
    )

  }

  pagamentoInContanti(item: iItemPaymentCash){
    console.log(item)
    return this.http.post(`${this.baseUrl}payments/pagamento-in-contanti`, item);
  }
}
