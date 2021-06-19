import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {DetailStore} from './detail.store';

@Component({
  selector: 'detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  providers: [DetailStore],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailComponent implements OnInit {

  vm$ = this.detailStore.vm$;

  constructor(private detailStore: DetailStore) {
  }

  ngOnInit(): void {

  }

}
