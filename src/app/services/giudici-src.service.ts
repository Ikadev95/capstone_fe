import { StateOnlyPagination } from './../interfaces/state-only-pagination';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { iGiudiceRegister } from '../interfaces/i-giudice-register';
import { BehaviorSubject, debounceTime, delay, Observable, of, Subject, switchMap, tap } from 'rxjs';
import { iGiudiceResponse } from '../interfaces/i-giudice-response';
import { PagedGiudice } from '../interfaces/paged-giudice';
import { environment } from '../../environments/environment.development';

interface SearchResult {
  users: iGiudiceResponse[];
  total: number;
}


@Injectable({
  providedIn: 'root'
})
export class GiudiciSrcService {

  baseUrl:string = environment.baseUrl;

  registerGiudice(giudice: Partial<iGiudiceRegister>) {
    return this.http.post(`${this.baseUrl}auth/registerJudge`, giudice);
  }

  getGiudici(page: number, size: number) {
    return this.http.get<PagedGiudice>(`${this.baseUrl}utenti/paged/judge?page=${page}&size=${size}`);
  }

  assegnaGiudice(selectedUserId : number, selectedCategoryId: number) {
    return this.http.post(`${this.baseUrl}categorie/${selectedCategoryId}/giudice/${selectedUserId}`, {})
  }

  private _loading$ = new BehaviorSubject<boolean>(true);
  _search$ = new Subject<void>();
  private _users$ = new BehaviorSubject<iGiudiceResponse[]>([]);
  private _total$ = new BehaviorSubject<number>(0);
  _pages$ = new BehaviorSubject<number[]>([]);

  private _state: StateOnlyPagination = {
    page: 1,
    pageSize: 15,
    searchTerm: ''
  };

  constructor(private http: HttpClient) {
    this._search$
      .pipe(
        tap(() => this._loading$.next(true)),
        debounceTime(200),
        switchMap(() => this._search()),
        delay(200),
        tap(() => this._loading$.next(false))
      )
      .subscribe((result) => {
        this._users$.next(result.users);
      });

    this._search$.next();
  }

  // GETTER per lo stato reattivo
  get users$(): Observable<iGiudiceResponse[]> {
    return this._users$.asObservable();
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
  get searchTerm(): string {
    return this._state.searchTerm;
  }

  // SETTER per aggiornare lo stato
  set page(page: number) {
    this._set({ page });
  }
  set pageSize(pageSize: number) {
    this._set({ pageSize });
  }
  set searchTerm(searchTerm: string) {
    this._set({ searchTerm });
  }

  private _set(patch: Partial<typeof this._state>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  // Funzione per filtrare i risultati
  private matches(user: iGiudiceResponse, term: string): boolean {
    return (
      user.nome.toLowerCase().includes(term.toLowerCase()) ||
      user.cognome.toLowerCase().includes(term.toLowerCase()) ||
      user.username.toLowerCase().includes(term.toLowerCase()) ||
      user.email.toLowerCase().includes(term.toLowerCase())
    );
  }

  // Funzione per eseguire la ricerca e la paginazione
  private _search(): Observable<SearchResult> {
    const { pageSize, page, searchTerm } = this._state;

    return this.getGiudici(page - 1, pageSize).pipe(
      switchMap((data) => {
        let filteredUsers = data.content.filter(user => this.matches(user, searchTerm));

        const pages = Array.from({ length: data.totalPages }, (_, i) => i + 1);
        this._pages$.next(pages);
        this._total$.next(data.totalElements);

        return of({ users: filteredUsers, total: this._total$.getValue() });
      })
    );
  }
}
