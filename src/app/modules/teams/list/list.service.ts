import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, combineLatest, Observable, Subject} from 'rxjs';
import {map, switchMap, takeUntil, tap} from 'rxjs/operators';
import {ApiService} from '../../../services/api.service';
import {PaginationTeam, Team} from '../../../models/team';

@Injectable({
  providedIn: 'root'
})
export class ListService implements OnDestroy {

  private isLoading = new BehaviorSubject<boolean>(false);
  private query = new BehaviorSubject<string>('');
  private paginationTeam = new BehaviorSubject<PaginationTeam>({count: 0, teams: []});
  private filter = new BehaviorSubject<Team[]>([]);
  private first = new BehaviorSubject<number>(0);
  private rows = new BehaviorSubject<number>(10);
  private destroy = new Subject();


  readonly isLoading$: Observable<boolean> = this.isLoading.asObservable();
  readonly paginationTeam$: Observable<PaginationTeam> = this.paginationTeam.asObservable();
  readonly teams$: Observable<Team[]> = this.paginationTeam$.pipe(map(item => item.teams));
  readonly count$: Observable<number> = this.paginationTeam$.pipe(map(item => item.count));
  readonly first$: Observable<number> = this.first.asObservable();
  readonly rows$: Observable<number> = this.rows.asObservable();
  readonly query$: Observable<string> = this.query.asObservable();
  readonly filter$: Observable<Team[]> = this.filter.asObservable();
  readonly destroy$: Observable<any> = this.destroy.asObservable();

  constructor(private apiService: ApiService) {

    // Load Data
    combineLatest([this.first$, this.rows$])
      .pipe(takeUntil(this.destroy$))
      .pipe(
        tap(() => this.isLoading.next(true)),
        switchMap(([first, rows]) => this.apiService.getTeams(first, rows))
      )
      .subscribe(res => {
        this.paginationTeam.next({...res});
        this.isLoading.next(false);
      });

    // filter
    combineLatest([this.query$, this.teams$])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([query, team]) => {
        const filter = team.filter(item => item.name.includes(query.trim()));
        this.filter.next(filter);
      });
  }


  setQuery(val: string): void {
    this.query.next(val);
  }

  ngOnDestroy(): void {
    this.destroy.next();
  }
}
