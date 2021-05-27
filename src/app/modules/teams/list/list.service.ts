import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, combineLatest, Observable, of, Subject} from 'rxjs';
import {distinctUntilChanged, map, mergeMap, switchMap, takeUntil, tap} from 'rxjs/operators';
import {ApiService} from '../../../services/api.service';
import {PaginationTeam, Team} from '../../../models/team';
import {PageState} from '../../../components/paginator/paginator.component';

@Injectable({
  providedIn: 'root'
})
export class ListService implements OnDestroy {

  private isLoading = new BehaviorSubject<boolean>(false);
  private query = new BehaviorSubject<string>('');
  private paginationTeam = new BehaviorSubject<PaginationTeam>({count: 0, teams: []});
  private filter = new BehaviorSubject<Team[]>([]);
  private currentPage = new BehaviorSubject<number>(1);
  private rows = new BehaviorSubject<number>(10);
  private destroy = new Subject();


  readonly isLoading$: Observable<boolean> = this.isLoading.asObservable();
  readonly paginationTeam$: Observable<PaginationTeam> = this.paginationTeam.asObservable();
  readonly teams$: Observable<Team[]> = this.paginationTeam$.pipe(map(item => item.teams));
  readonly count$: Observable<number> = this.paginationTeam$.pipe(map(item => item.count));
  readonly currentPage$: Observable<number> = this.currentPage.asObservable();
  readonly rows$: Observable<number> = this.rows.asObservable();
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
    combineLatest([this.currentPage$.pipe(distinctUntilChanged()), this.rows$.pipe(distinctUntilChanged())])
      .pipe(takeUntil(this.destroy$))
      .pipe(
        tap(() => this.isLoading.next(true)),
        switchMap(([currentPage, rows]) => this.apiService.getTeams(currentPage - 1, rows))
      )
      .subscribe(res => {
        console.log(res);
        this.paginationTeam.next({...res});
        this.isLoading.next(false);
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
