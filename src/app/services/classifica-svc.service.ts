import { Injectable } from '@angular/core';
import { iPoesiaClassifica } from '../interfaces/i-poesia-classifica';
import { BehaviorSubject, debounceTime, delay, Observable, of, Subject, switchMap, tap } from 'rxjs';
import { iFotografiaClassifica } from '../interfaces/i-fotografia-classifica';
import { StateOnlyPagination } from '../interfaces/state-only-pagination';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { PagedClassificaPoesia } from '../interfaces/paged-classifica-poesia';
import { PagedClassificaFoto } from '../interfaces/paged-classifica-foto';


@Injectable({
  providedIn: 'root'
})
export class ClassificaSvcService {
 _poesie$ = new BehaviorSubject<iPoesiaClassifica[]>([])
 _foto$ = new BehaviorSubject<iFotografiaClassifica[]>([])
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _total$ = new BehaviorSubject<number>(0);
  _pages$ = new BehaviorSubject<number[]>([]);
  _search$ = new Subject<void>();
    baseUrl:string = environment.baseUrl;
    switch = 'Poesia';

    private _state: StateOnlyPagination = {
      page: 1,
      pageSize: 9,
      searchTerm: ''
    };

  constructor(private http: HttpClient) {
    this._search$
    .pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search('Poesia in ITALIANO a tema fisso')),
      delay(200),
      tap(() => this._loading$.next(false)),
    )
    .subscribe();

  this._search$.next();
   }



    get total$(): Observable<number> {
      return this._total$.asObservable();
    }
    get loading$(): Observable<boolean> {
      return this._loading$.asObservable();
    }
    get page(): number {
      return this._state.page;
    }
    get pageSize(): number {
      return this._state.pageSize;
    }

    set page(page: number) {
      this._set({ page });
    }
    set pageSize(pageSize: number) {
      this._set({ pageSize });
    }

    private _set(patch: Partial<StateOnlyPagination>) {
      Object.assign(this._state, patch);
      this._search$.next();
    }

    public _search(nomeCategoria: string): Observable<{ total: number }> {
      const { pageSize, page } = this._state;

      if( this.switch !== 'Poesia') {
         return this.getFoto(nomeCategoria,page - 1, pageSize).pipe(
        tap((data) => {
          const pages = Array.from({ length: data.totalPages }, (_, i) => i + 1);
          this._pages$.next(pages);
          this._total$.next(data.totalElements);
          this._foto$.next(data.content);
        }),
        switchMap(() => of({ total: this._total$.getValue() }))
      );}
      else {
        return this.getPoesie(nomeCategoria,page - 1, pageSize).pipe(
        tap((data) => {
          const pages = Array.from({ length: data.totalPages }, (_, i) => i + 1);
          this._pages$.next(pages);
          this._total$.next(data.totalElements);
          this._poesie$.next(data.content);
        }),
        switchMap(() => of({ total: this._total$.getValue() }))
      );}
    }

  getPoesie(nomeCategoria: string, page:number, size: number) {
    return this.http.get<PagedClassificaPoesia>(`${this.baseUrl}poesie/categoria?nomeCategoria=${nomeCategoria}&page=${page}&size=${size}`)
  }
  getFoto(nomeCategoria: string, page:number, size: number) {
    return this.http.get<PagedClassificaFoto>(`${this.baseUrl}fotografie/categoria?nomeCategoria=${nomeCategoria}&page=${page}&size=${size}`)
  }
}
