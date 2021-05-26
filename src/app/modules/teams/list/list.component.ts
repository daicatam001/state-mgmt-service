import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Team} from '../../../models/team';
import {ListService} from './list.service';
import {FormControl} from '@angular/forms';
import {debounceTime} from 'rxjs/operators';

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

  teams$: Observable<Team[]> = this.listService.filter$;
  isLoading$: Observable<boolean>;


  constructor(private listService: ListService) {
  }

  ngOnInit(): void {
    this.query.valueChanges
      .pipe(debounceTime(300))
      .subscribe(val => this.listService.setQuery(val));
  }


}
