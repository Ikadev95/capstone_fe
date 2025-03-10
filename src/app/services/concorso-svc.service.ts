import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConcorsoSvcService {

  baseUrl:string = environment.baseUrl;
  $concorsoSubject$ = new BehaviorSubject<any | null>(null);

  constructor(private http:HttpClient) {
    this.getDatiConcorso().subscribe(
      (data) => {
        this.$concorsoSubject$.next(data);
      }
    );
   }

  getDatiConcorso() {
    return this.http.get(`${this.baseUrl}concorso`);
  }
}
