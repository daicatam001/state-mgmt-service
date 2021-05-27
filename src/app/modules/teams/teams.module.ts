import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListComponent} from './list/list.component';
import {RouterModule, Routes} from '@angular/router';
import DataTableModule from '../../components/data-table/data-table.module';
import {ReactiveFormsModule} from '@angular/forms';
import {PaginatorModule} from '../../components/paginator/paginator.module';

const routes: Routes = [
  {
    path: '',
    component: ListComponent
  }
];

@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PaginatorModule,
    DataTableModule,
    RouterModule.forChild(routes)
  ]
})
export class TeamsModule {
}
