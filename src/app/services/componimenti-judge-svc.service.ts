import { Injectable } from '@angular/core';
import { iComponimentoFullResponse } from '../interfaces/i-componimento-full-response';
import { BehaviorSubject, debounceTime, delay, Observable, of, Subject, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PagedComponimenti } from '../interfaces/paged-componimenti';
import { State } from '../interfaces/state';
import { StateOnlyPagination } from '../interfaces/state-only-pagination';
import { iVotoRequest } from '../interfaces/i-voto-request';

interface SearchResult {
  componimenti: iComponimentoFullResponse[];
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class ComponimentiJudgeSvcService {
  private _loading$ = new BehaviorSubject<boolean>(true);
   _search$ = new Subject<void>();
  private _componimenti$ = new BehaviorSubject<iComponimentoFullResponse[]>([]);
  private _total$ = new BehaviorSubject<number>(0);
  _pages$ = new BehaviorSubject<number[]>([]);

  private _state: StateOnlyPagination = {
    page: 1,
    pageSize: 15,
    searchTerm: '',
  };

  componimentiJudge$ = new BehaviorSubject<PagedComponimenti | null>(null);

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
        this._componimenti$.next(result.componimenti);
        this._total$.next(result.total);
      });

    // Avvia la ricerca iniziale
    this._search$.next();
  }

  // **GETTER per lo stato reattivo**
  get componimenti$(): Observable<iComponimentoFullResponse[]> {
    return this._componimenti$.asObservable();
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
  get pages$(): Observable<number[]> {
    return this._pages$.asObservable();
  }

  // **SETTER per aggiornare lo stato**
  set page(page: number) {
    this._set({ page });
  }
  set pageSize(pageSize: number) {
    this._set({ pageSize });
  }
  set searchTerm(searchTerm: string) {
    this._set({ searchTerm });
  }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  // **Funzione per eseguire la ricerca e la paginazione**
  private _search(): Observable<SearchResult> {
    const { page, pageSize, searchTerm } = this._state;

    return this.getComponimentiBySezione(page - 1, pageSize).pipe(
      switchMap((data) => {
        // Filtraggio lato frontend se necessario (da rimuovere se il backend gestisce già la ricerca)
        let filteredComponimenti = data.content;
        if (searchTerm) {
          filteredComponimenti = filteredComponimenti.filter((comp) =>
            comp.titolo.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }

        // Aggiornamento paginazione
        const pages = Array.from({ length: data.totalPages }, (_, i) => i + 1);
        this._pages$.next(pages);

        return of({ componimenti: filteredComponimenti, total: data.totalElements });
      })
    );
  }

  getComponimentiBySezione(page: number, size: number) {
    return this.http.get<PagedComponimenti>(`http://localhost:8080/api/componimenti/sezione/?page=${page}&size=${size}`)
      .pipe(tap(data => {
        data.content = data.content.map((componimento: iComponimentoFullResponse) => ({
          ...componimento,
          percorsoFile: componimento.percorsoFile
            ? `http://localhost:8080/api/uploads/fotografie/${componimento.percorsoFile.split('/').pop()}`
            : ''
        }))
        this.componimentiJudge$.next(data)
      }));
  }

  vote(vote:iVotoRequest){
    return this.http.post<iVotoRequest>(`http://localhost:8080/api/voto/create`, vote)
  }

  updateVote(vote:iVotoRequest){
    return this.http.patch<iVotoRequest>(`http://localhost:8080/api/voto/update`, vote)
  }
}
