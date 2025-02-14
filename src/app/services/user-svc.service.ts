import { HttpClient } from '@angular/common/http';
import { Injectable, PipeTransform } from '@angular/core';
import { BehaviorSubject, Observable, Subject, debounceTime, delay, switchMap, tap, of } from 'rxjs';
import { iUserPaged } from '../interfaces/i-user-paged';
import { State } from '../interfaces/state';
import { SortColumn, SortDirection } from '../directives/sortable.directive';
import { Paged } from '../interfaces/paged';

interface SearchResult {
	users: iUserPaged[];
	total: number;
}

@Injectable({ providedIn: 'root' })
export class UserSvcService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  _search$ = new Subject<void>();
  private _users$ = new BehaviorSubject<iUserPaged[]>([]);
  private _total$ = new BehaviorSubject<number>(0);
  _pages$ = new BehaviorSubject<number[]>([]);
  private sorted = false;

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
  get users$(): Observable<iUserPaged[]> {
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
  get sorting():boolean {
    return this.sorted;
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
  set sorting(sorting: boolean) {
    this.sorted = sorting;
  }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  // Funzione per ordinamento
  private sort(users: iUserPaged[], column: SortColumn, direction: SortDirection): iUserPaged[] {
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
  private matches(user: iUserPaged, term: string): boolean {
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

    if(!this.sorted){
      return this.getUsers(page - 1, pageSize).pipe(
        switchMap((data) => {
          let sortedUsers = this.sort(data.content, sortColumn, sortDirection); // Ordinamento

          sortedUsers = sortedUsers.filter(user => this.matches(user, searchTerm)); // Filtraggio

          const pages = Array.from({ length: data.totalPages }, (_, i) => i + 1);

          this._pages$.next(pages);
          this._total$.next(data.totalElements);

          return of({ users: sortedUsers, total: this._total$.getValue() });
        })
      );
    };

    return this.getAllUsers(page - 1, pageSize).pipe(
      switchMap((data) => {
        let sortedUsers = this.sort(data.content, sortColumn, sortDirection); // Ordinamento

        sortedUsers = sortedUsers.filter(user => this.matches(user, searchTerm)); // Filtraggio

        const pages = Array.from({ length: data.totalPages }, (_, i) => i + 1);

        this._pages$.next(pages);
        this._total$.next(data.totalElements);

        return of({ users: sortedUsers, total: this._total$.getValue() });
      })
    );


  }

  // Ottieni gli utenti dalla API
  getUsers(page: number, size: number) {
    let url = `http://localhost:8080/api/utenti/paged/year?page=${page}&size=${size}`;
    return this.http.get<Paged>(url);
  }
  getAllUsers(page: number, size: number) {
    let url = `http://localhost:8080/api/utenti/paged?page=${page}&size=${size}`;
    return this.http.get<Paged>(url);
  }

  deleteUser(id:number){
    let url = `http://localhost:8080/api/utenti/${id}/delete`
    return this.http.delete(url)
  }
}
