import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {DetailService} from './detail.service';

@Component({
  selector: 'detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  providers: [DetailService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailComponent implements OnInit {

  readonly team$ = this.detailService.team$;
  readonly teamIds$ = this.detailService.teamIds$;

  constructor(private detailService: DetailService) {
  }

  ngOnInit(): void {

  }

}
