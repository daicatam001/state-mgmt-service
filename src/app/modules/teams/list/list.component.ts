import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {PageState} from '../../../components/paginator/paginator.component';
import {ListStore} from './list.store';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ListStore]
})
export class ListComponent implements OnInit {

  query = new FormControl('');

  readonly vm$ = this.listStore.vm$


  constructor(private listStore: ListStore) {
  }

  ngOnInit(): void {
    this.query.valueChanges
      .pipe(debounceTime(300))
      .subscribe(val => this.listStore.patchState({query: val}));
  }

  onPageChange(pageState: PageState): void {
    this.listStore.patchState({
      first: pageState.first,
      rows: pageState.rows
    });
    this.query.setValue('');
  }

}
