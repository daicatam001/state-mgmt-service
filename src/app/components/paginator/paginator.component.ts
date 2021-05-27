import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

export interface PageState {
  first: number;
  rows: number;
  totalRecords: number;
}

@Component({
  selector: 'paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginatorComponent implements OnInit, OnChanges {

  @Input() currentPage: number;
  @Input() rows: number;
  @Input() rowPerPageOptions: number[] = [];
  @Input() totalRecords: number;
  @Output() onPageChange = new EventEmitter<PageState>();
  private pageCount = 0;
  pages: number[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.totalRecords) {
      this.updatePageLink();
    }
  }

  updatePageLink(): void {
    this.pageCount = Math.ceil(this.totalRecords / this.rows);
    this.pages = [];
    for (let i = 0; i < this.pageCount; i++) {
      this.pages.push(i + 1);
    }
  }

  getPageCount(): number {
    return Math.floor(this.totalRecords / this.rows) || 1;
  }

  changePage(page: number): void {
    this.onPageChange.emit({first: page, rows: this.rows, totalRecords: this.totalRecords});
  }

  onRppChange(): void {
    this.onPageChange.emit({first: 1, rows: this.rows, totalRecords: this.totalRecords});
    this.updatePageLink();
  }
}
