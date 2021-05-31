import {Injectable, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BehaviorSubject, Subject} from 'rxjs';
import {distinctUntilChanged, filter, map, mergeMap, pluck, takeUntil} from 'rxjs/operators';
import {ApiService} from '../../../services/api.service';
import {TeamView} from '../../../models/team';

@Injectable()
export class DetailService implements OnDestroy {

  private team = new BehaviorSubject<TeamView>(null);
  private destroy = new Subject();

  readonly team$ = this.team.asObservable();
  readonly teamIds$ = this.team$.pipe(map(item => item.id));
  readonly destroy$ = this.destroy.asObservable();

  constructor(private route: ActivatedRoute,
              private apiService: ApiService) {
    this.route.params
      .pipe(takeUntil(this.destroy$))
      .pipe(
        distinctUntilChanged(),
        pluck('id'),
        filter(id => !!id),
        mergeMap((id: number) => this.apiService.getTeam(id)))
      .subscribe((team: TeamView) => {
        this.team.next(team);
      });
  }

  ngOnDestroy(): void {
    this.destroy.next();
  }
}
