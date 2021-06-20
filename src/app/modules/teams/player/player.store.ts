import {Injectable} from '@angular/core';
import {ComponentStore, tapResponse} from '@ngrx/component-store';
import {Player} from '../../../models/team';
import {ApiService} from '../../../services/api.service';
import {ActivatedRoute} from '@angular/router';
import {filter, pluck, switchMap} from 'rxjs/operators';
import {EMPTY} from 'rxjs';
import {AuthStore} from '../../../stores/auth.store';

@Injectable()
export class PlayerStore extends ComponentStore<Player> {

  readonly vm$ = this.state$;

  constructor(private apiService: ApiService,
              private route: ActivatedRoute,
              private authStore: AuthStore) {
    super({
      nationality: null,
      dateOfBirth: null,
      name: null,
      id: null,
      position: null
    });

    this.getPlayerEffect(route.params.pipe(
      pluck('id'),
      filter(id => !!id)
    ));
  }


  readonly incrementLike = this.authStore.incrementLike

  readonly incrementDislike = this.authStore.incrementDislike

  getPlayerEffect = this.effect<number>(id$ => id$.pipe(
    switchMap(id => this.apiService.getPlayer(id).pipe(
      tapResponse(
        res => this.patchState({...res}),
        error => EMPTY
      )
    ))
  ))


}
