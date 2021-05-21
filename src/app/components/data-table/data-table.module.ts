import {NgModule} from '@angular/core';
import {DataTableComponent} from './data-table.component';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [DataTableComponent],
  imports: [CommonModule],
  exports: [DataTableComponent]
})
export default class DataTableModule {

}
