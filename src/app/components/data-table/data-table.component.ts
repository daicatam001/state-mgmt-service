import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {SimplifiedRank} from '../../models/rank';

@Component({
  selector: 'data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableComponent implements OnInit {

  @Input() data: SimplifiedRank[] = [];
  @Input() fields: { name: string, field: string, type?: string }[];
  @Input() loading: boolean;

  constructor() {
  }

  ngOnInit(): void {
  }

}
