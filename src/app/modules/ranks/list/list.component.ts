import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {RanksService} from '../../../services/ranks.service';
import {Observable} from 'rxjs';
import {Rank, SimplifiedRank} from '../../../models/rank';

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit {

  years = [2021, 2020, 2019, 2018, 2017];
  columns = [
    {name: 'Position', field: 'position'},
    {name: 'Played Game', field: 'playedGames'},
    {name: 'Team Name', field: 'teamName'},
    {name: 'Logo', field: 'teamCrestUrl', type: 'image'},
    {name: 'Won', field: 'won'},
    {name: 'Draw', field: 'draw'},
    {name: 'Lost', field: 'lost'},
    {name: 'Points', field: 'points'},
  ];

  selectedYear$: Observable<number>;
  ranks$: Observable<SimplifiedRank[]>;
  isLoading$: Observable<boolean>;


  constructor(private ranksService: RanksService) {
    this.selectedYear$ = this.ranksService.selectedYear$;
    this.ranks$ = this.ranksService.rankings$;
    this.isLoading$ = this.ranksService.isLoading$;
  }

  ngOnInit(): void {
    this.ranksService.getRanks();
  }

  getRankByYear(year: number): void {
    this.ranksService.getRanks(year);
  }

}
