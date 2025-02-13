import { Injectable } from '@angular/core';
import { iComponimentoFullResponse } from '../interfaces/i-componimento-full-response';
import { BehaviorSubject, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ComponimentiJudgeSvcService {

  componimentiJudge$ = new BehaviorSubject<iComponimentoFullResponse[] | null>(null);

  constructor(private http:HttpClient) {
  }

  getComponimentiBySezione( page :number, size: number){
    return this.http.get<iComponimentoFullResponse[]>(`http://localhost:8080/api/componimenti/sezione/?page=${page}&size=${size}` ).pipe(
      tap(data => this.componimentiJudge$.next(data))
    );
  }
}
