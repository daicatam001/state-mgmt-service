import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {PlayerService} from './player.service';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [PlayerService]
})
export class PlayerComponent implements OnInit {

  readonly player$ = this.playerService.player$;

  constructor(private playerService: PlayerService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  like(): void {
    this.authService.incrementLike();
  }

  dislike(): void {
    this.authService.incrementDislike();
  }
}
