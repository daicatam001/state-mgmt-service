import {ComponentStore, tapResponse} from '@ngrx/component-store';
import {Team} from '../../../models/team';
import {map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {ApiService} from '../../../services/api.service';
import {PageState} from '../../../components/paginator/paginator.component';
import {Injectable} from '@angular/core';
import {combineLatest} from 'rxjs';

export interface ListState extends PageState {
  loading: boolean;
  query: string;
  origin: Team[];
  filter: Team[];
}

@Injectable()
export class ListStore extends ComponentStore<ListState> {

  readonly vm$ = this.select(state => state);

  getPaginationTeamsEffect = this.effect<[number, number]>(pageState$ =>
    pageState$.pipe(
      tap(() => this.patchState({loading: true})),
      switchMap(([first, rows]) => this.apiService.getTeams(first - 1, rows).pipe(
        tapResponse((res) => {
            console.log(res)
            this.patchState(
              {
                origin: [...res.teams],
                filter: [...res.teams],
                totalRecords: res.count,
                loading: false
              });
          },
          error => this.patchState({loading: false}))
      )),
    )
  )

  filterTeamsEffect = this.effect<string>(query$ =>
    query$.pipe(
      withLatestFrom(this.select(s => s.origin)),
      tap(([query, origin]) => this.patchState({
        filter: query ? origin.filter(item => item.name.toLowerCase().includes(query.toLowerCase())) : origin
      }))
    )
  )

  constructor(private apiService: ApiService) {
    super({
      loading: false,
      query: '',
      origin: [],
      filter: [],
      first: 1,
      rows: 10,
      totalRecords: 0
    });
    this.getPaginationTeamsEffect(
      combineLatest([this.select(s => s.first), this.select(s => s.rows)])
    );
    this.filterTeamsEffect(this.select(s => s.query));
  }


}
