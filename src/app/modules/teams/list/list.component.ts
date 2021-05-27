import {ChangeDetectionStrategy, Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Observable} from 'rxjs';
import {Team} from '../../../models/team';
import {ListService} from './list.service';
import {FormControl} from '@angular/forms';
import {debounceTime} from 'rxjs/operators';
import {PageState} from '../../../components/paginator/paginator.component';

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit {

  columns = [
    {name: 'Team Name', field: 'name'},
    {name: 'Logo', field: 'crestUrl', type: 'image'},
  ];

  query = new FormControl('');

  teams$ = this.listService.filter$;
  pageState$ = this.listService.pageState$;
  isLoading$ = this.listService.isLoading$;


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
