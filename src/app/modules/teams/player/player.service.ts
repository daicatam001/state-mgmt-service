import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../../services/api.service';
import {distinctUntilChanged, filter, mergeMap, pluck, takeUntil} from 'rxjs/operators';
import {Player} from '../../../models/team';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable()
export class PlayerService {

  private player = new BehaviorSubject<Player>(null);
  private destroy = new Subject();

  readonly player$ = this.player.asObservable();
  readonly destroy$ = this.destroy.asObservable();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private apiService: ApiService) {
    console.log(this.router.getCurrentNavigation().extras.state);
    this.route.params
      .pipe(takeUntil(this.destroy$))
      .pipe(
        distinctUntilChanged(),
        pluck('id'),
        filter(id => !!id),
        mergeMap((id) => this.apiService.getPlayer(id)))
      .subscribe((team: Player) => {
        this.player.next(team);
      });
  }
}
