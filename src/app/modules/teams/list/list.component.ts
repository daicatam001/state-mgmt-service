import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ListService} from './list.service';
import {FormControl} from '@angular/forms';
import {PageState} from '../../../components/paginator/paginator.component';
import {ListStore} from './list.store';

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
    // this.listStore.getPaginationTeamEffect()
    // this.query.valueChanges
    //   .pipe(debounceTime(300))
    //   .subscribe(val => this.listService.setQuery(val));
  }

  onPageChange(pageState: PageState): void {
    console.log('Page state ', pageState);
    this.listStore.patchState({
      first: pageState.first,
      rows: pageState.rows
    });
    // this.listService.changePage(pageState);
  }

}
