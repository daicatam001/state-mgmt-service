import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, combineLatest, Observable, of, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, mergeMap, switchMap, takeUntil, tap} from 'rxjs/operators';
import {ApiService} from '../../../services/api.service';
import {PaginationTeam, Team} from '../../../models/team';
import {PageState} from '../../../components/paginator/paginator.component';

@Injectable()
export class ListService implements OnDestroy {

  private loading = new BehaviorSubject<boolean>(false);
  private query = new BehaviorSubject<string>('');
  private paginationTeam = new BehaviorSubject<PaginationTeam>({count: 0, teams: []});
  private filter = new BehaviorSubject<Team[]>([]);
  private currentPage = new BehaviorSubject<number>(1);
  private rows = new BehaviorSubject<number>(10);
  private destroy = new Subject();


  readonly loading$: Observable<boolean> = this.loading.asObservable();
  readonly paginationTeam$: Observable<PaginationTeam> = this.paginationTeam.asObservable();
  readonly teams$: Observable<Team[]> = this.paginationTeam$.pipe(map(item => item.teams));
  readonly count$: Observable<number> = this.paginationTeam$.pipe(map(item => item.count));
  readonly currentPage$: Observable<number> = this.currentPage.asObservable().pipe(distinctUntilChanged());
  readonly rows$: Observable<number> = this.rows.asObservable().pipe(distinctUntilChanged());
  readonly pageState$: Observable<{
    currentPage: number,
    rows: number,
    count: number
  }> = combineLatest([this.currentPage$, this.rows$, this.count$])
    .pipe(mergeMap(([currentPage, rows, count]) => of({currentPage, rows, count})));
  readonly query$: Observable<string> = this.query.asObservable();
  readonly filter$: Observable<Team[]> = this.filter.asObservable();
  readonly destroy$: Observable<any> = this.destroy.asObservable();


  constructor(private apiService: ApiService) {
    // Load Data
    combineLatest([this.currentPage$, this.rows$])
      .pipe(takeUntil(this.destroy$))
      .pipe(
        debounceTime(400),
        tap(() => this.loading.next(true)),
        switchMap(([currentPage, rows]) => this.apiService.getTeams(currentPage - 1, rows))
      )
      .subscribe(res => {
        this.paginationTeam.next({...res});
        this.loading.next(false);
      });

    // filter
    combineLatest([this.query$, this.teams$])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([query, team]) => {
        const filter = team.filter(item => item.name.toLowerCase().includes(query.toLowerCase().trim()));
        this.filter.next(filter);
      });
  }


  changePage(pageState: PageState): void {
    this.currentPage.next(pageState.first);
    this.rows.next(pageState.rows);
  }

  setQuery(val: string): void {
    this.query.next(val);
  }

  ngOnDestroy(): void {
    this.destroy.next();
  }
}
