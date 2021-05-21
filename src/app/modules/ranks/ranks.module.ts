import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListComponent} from './list/list.component';
import {RouterModule, Routes} from '@angular/router';
import DataTableModule from '../../components/data-table/data-table.module';

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
    DataTableModule,
    RouterModule.forChild(routes)
  ]
})
export class RanksModule {
}
