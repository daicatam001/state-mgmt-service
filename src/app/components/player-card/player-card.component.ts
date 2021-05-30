import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Player} from '../../models/team';

@Component({
  selector: 'player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerCardComponent implements OnInit {

  @Input() data: Player;

  constructor() {
  }

  ngOnInit(): void {
  }

}
