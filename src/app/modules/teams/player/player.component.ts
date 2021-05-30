import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {PlayerService} from './player.service';

@Component({
  selector: 'player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [PlayerService]
})
export class PlayerComponent implements OnInit {

  readonly player$ = this.playerService.player$;

  constructor(private playerService: PlayerService) {
  }

  ngOnInit(): void {
  }

}
