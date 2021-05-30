import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Team} from '../../models/team';

@Component({
  selector: 'data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableComponent<T> implements OnInit {

  @Input() data: T[] = [];
  @Input() loading: boolean;

  constructor() {
  }

  ngOnInit(): void {
  }

}
