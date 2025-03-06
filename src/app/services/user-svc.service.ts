import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, debounceTime, delay, switchMap, tap, of } from 'rxjs';
import { iUserPaged } from '../interfaces/i-user-paged';
import { State } from '../interfaces/state';
import { Paged } from '../interfaces/paged';
import { StateOnlyPagination } from '../interfaces/state-only-pagination';
import { environment } from '../../environments/environment.development';

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
  private sorted = true;
  baseUrl:string = environment.baseUrl;
  user_id = 0;
  user_name = '';

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
        switchMap(() => this._search()),
        delay(200),
        tap(() => this._loading$.next(false)),
      )
      .subscribe((result) => {
        this._users$.next(result.users);
      });

    this._search$.next();
  }

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
  get sorting(): boolean {
    return this.sorted;
  }

  set page(page: number) {
    this._set({ page });
  }
  set pageSize(pageSize: number) {
    this._set({ pageSize });
  }
  set searchTerm(searchTerm: string) {
    this._set({ searchTerm });
  }
  set sorting(sorting: boolean) {
    this.sorted = sorting;
  }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private matches(user: iUserPaged, term: string): boolean {
    return (
      user.nome.toLowerCase().includes(term.toLowerCase()) ||
      user.cognome.toLowerCase().includes(term.toLowerCase()) ||
      user.username.toLowerCase().includes(term.toLowerCase()) ||
      user.email.toLowerCase().includes(term.toLowerCase())
    );
  }

  private _search(): Observable<SearchResult> {
    const { pageSize, page, searchTerm } = this._state;
    const fetchUsers = this.sorted ? this.getAllUsers(page - 1, pageSize) : this.getUsers(page - 1, pageSize);

    return fetchUsers.pipe(
      switchMap((data) => {
        let filteredUsers = data.content.filter(user => this.matches(user, searchTerm));

        const pages = Array.from({ length: data.totalPages }, (_, i) => i + 1);

        this._pages$.next(pages);
        this._total$.next(data.totalElements);

        return of({ users: filteredUsers, total: this._total$.getValue() });
      })
    );
  }

  getUsers(page: number, size: number) {
    let url = `${this.baseUrl}utenti/paged/year?page=${page}&size=${size}`;
    return this.http.get<Paged>(url);
  }
  getAllUsers(page: number, size: number) {
    let url = `${this.baseUrl}utenti/paged?page=${page}&size=${size}`;
    return this.http.get<Paged>(url);
  }

  deleteUser(id: number) {
    let url = `${this.baseUrl}utenti/${id}/delete`;
    return this.http.delete(url);
  }
}
