import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Team} from '../../models/team';

@Component({
  selector: 'data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableComponent implements OnInit {

  @Input() data: Team[] = [];
  @Input() fields: { name: string, field: string, type?: string }[];
  @Input() loading: boolean;

  constructor() {
  }

  ngOnInit(): void {
  }

}
