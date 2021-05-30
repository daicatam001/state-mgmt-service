import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ListService} from './list.service';
import {FormControl} from '@angular/forms';
import {debounceTime} from 'rxjs/operators';
import {PageState} from '../../../components/paginator/paginator.component';

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ListService]
})
export class ListComponent implements OnInit {

  query = new FormControl('');

  teams$ = this.listService.filter$;
  pageState$ = this.listService.pageState$;
  loading$ = this.listService.loading$;


  constructor(private listService: ListService) {
  }

  ngOnInit(): void {
    this.query.valueChanges
      .pipe(debounceTime(300))
      .subscribe(val => this.listService.setQuery(val));
  }

  onPageChange(pageState: PageState): void {
    this.listService.changePage(pageState);
  }

}
