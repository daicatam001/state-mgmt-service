import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {PlayerStore} from './player.store';

@Component({
  selector: 'player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [PlayerStore]
})
export class PlayerComponent implements OnInit {

  readonly vm$ = this.playerStore.vm$;

  constructor(private playerStore: PlayerStore) {
  }

  ngOnInit(): void {
  }

  like(): void {
    this.playerStore.incrementLike();
  }

  dislike(): void {
    this.playerStore.incrementDislike();
  }
}
