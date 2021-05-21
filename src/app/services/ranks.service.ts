import {Injectable} from '@angular/core';
import {Rank, SimplifiedRank} from '../models/rank';
import {BehaviorSubject, EMPTY, Observable} from 'rxjs';
import {catchError, concatMap, map, take, tap} from 'rxjs/operators';
import {ApiService} from './api.service';


export interface IRankingState {
  isLoading: boolean;
  selectedYear: number;
  rankings: SimplifiedRank[];
  lastUpdated: Date;
}

@Injectable({
  providedIn: 'root'
})
export class RanksService {

  private currentState = new BehaviorSubject<IRankingState>({
    isLoading: false,
    selectedYear: 2021,
    rankings: [],
    lastUpdated: null
  });
  readonly currentState$: Observable<IRankingState> = this.currentState.asObservable();
  readonly isLoading$: Observable<boolean> = this.currentState.asObservable().pipe(map(item => item.isLoading));
  readonly selectedYear$: Observable<number> = this.currentState.asObservable().pipe(map(item => item.selectedYear));
  readonly rankings$: Observable<SimplifiedRank[]> = this.currentState.asObservable().pipe(map(item => item.rankings));

  constructor(private apiService: ApiService) {
  }

  getRanks(year?: number): void {
    this.currentState$
      .pipe(
        take(1),
        tap(current => this.currentState.next({...current, isLoading: true, selectedYear: year || current.selectedYear})),
        concatMap((current: IRankingState) => this.apiService.getRanks(year || current.selectedYear)
          .pipe(map(rankingTable => ({
              current,
              rankingTable
            })),
            catchError(e => {
              this.currentState.next({...current, isLoading: false});
              return EMPTY;
            })))
      )
      .subscribe(({current, rankingTable}) => {
        this.currentState.next({...current, rankings: rankingTable.ranks, lastUpdated: rankingTable.competition.lastUpdate});
      });
  }
}
