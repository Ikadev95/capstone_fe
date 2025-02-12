import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { iGiudiceRegister } from '../interfaces/i-giudice-register';
import { BehaviorSubject, debounceTime, delay, Observable, of, Subject, switchMap, tap } from 'rxjs';
import { iGiudiceResponse } from '../interfaces/i-giudice-response';
import { State } from '../interfaces/state';
import { SortColumn, SortDirection } from '../directives/sortable.directive';
import { PagedGiudice } from '../interfaces/paged-giudice';

interface SearchResult {
  users: iGiudiceResponse[];
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class GiudiciSrcService {

  registerGiudice(giudice:Partial<iGiudiceRegister>){
    return this.http.post('http://localhost:8080/api/auth/registerJudge',giudice)
  }

  getGiudici(page: number, size: number) {
    let url = `http://localhost:8080/api/utenti/paged/judge?page=${page}&size=${size}`;
    return this.http.get<PagedGiudice>(url)
  }


 private _loading$ = new BehaviorSubject<boolean>(true);
   _search$ = new Subject<void>();
  private _users$ = new BehaviorSubject<iGiudiceResponse[]>([]);
  private _total$ = new BehaviorSubject<number>(0);
 _pages$ = new BehaviorSubject<number[]>([]);

  private _state: State = {
    page: 1,
    pageSize: 15,
    searchTerm: '',
    sortColumn: '',
    sortDirection: '',
  };

  constructor(private http: HttpClient) {
    this._search$
      .pipe(
        tap(() => this._loading$.next(true)),
        debounceTime(200),
        switchMap(() => this._search()),
        delay(200),
        tap(() => this._loading$.next(false)),
      )
      .subscribe((result) => {
        this._users$.next(result.users);
       // this._total$.next(result.total);
      });

    // Iniziamo la ricerca
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
  set sortColumn(sortColumn: SortColumn) {
    this._set({ sortColumn });
  }
  set sortDirection(sortDirection: SortDirection) {
    this._set({ sortDirection });
  }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  // Funzione per ordinamento
  private sort(users: iGiudiceResponse[], column: SortColumn, direction: SortDirection): iGiudiceResponse[] {
    if (direction === '' || column === '') {
      return users;
    } else {
      return [...users].sort((a, b) => {
        const res = this.compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }

  // Funzione di confronto
  private compare(v1: string | number, v2: string | number): number {
    return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
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

  // Funzione per eseguire la ricerca, ordinamento e paginazione
  private _search(): Observable<SearchResult> {
    const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;

    console.log(this._state);

    return this.getGiudici(page - 1, pageSize).pipe(
      switchMap((data) => {
        console.log(data.content)
        let sortedUsers = this.sort(data.content, sortColumn, sortDirection); // Ordinamento

        sortedUsers = sortedUsers.filter(user => this.matches(user, searchTerm)); // Filtraggio

        const pages = Array.from({ length: data.totalPages }, (_, i) => i + 1);
        console.log(pages , "pages");
        this._pages$.next(pages);
        this._total$.next(data.totalElements);

        return of({ users: sortedUsers, total: this._total$.getValue() });
      })
    );
  }



}
