import {Injectable} from '@angular/core';
import {ComponentStore, tapResponse} from '@ngrx/component-store';
import {Member, TeamView} from '../../../models/team';
import {filter, pluck, switchMap, tap} from 'rxjs/operators';
import {ApiService} from '../../../services/api.service';
import {EMPTY} from 'rxjs';
import {ActivatedRoute} from '@angular/router';


@Injectable()
export class DetailStore extends ComponentStore<TeamView> {

  readonly vm$ = this.state$;

  constructor(private apiService: ApiService, private route: ActivatedRoute) {
    super({
      coach: null,
      players: [],
      id: null,
      name: '',
      crestUrl: ''
    });

    this.fetchTeamEffect(this.route.params.pipe(
      pluck('id'),
      filter(id => !!id)
    ));

  }

  fetchTeamEffect = this.effect<number>(id$ =>
    id$.pipe(
      switchMap((id: number) => this.apiService.getTeam(id).pipe(
        tap((res) => console.log(res)),
        tapResponse(
          (res) => {
            this.patchState({...res});
          },
          error => EMPTY
        )
      )),
    )
  );

}
