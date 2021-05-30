import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListComponent} from './list/list.component';
import {RouterModule, Routes} from '@angular/router';
import DataTableModule from '../../components/data-table/data-table.module';
import {ReactiveFormsModule} from '@angular/forms';
import {PaginatorModule} from '../../components/paginator/paginator.module';
import {DetailComponent} from './detail/detail.component';
import {PlayerComponent} from './player/player.component';
import {PlayerCardComponent} from '../../components/player-card/player-card.component';
import {PlayerCardModule} from '../../components/player-card/player-card.module';

const routes: Routes = [
  {
    path: '',
    component: ListComponent
  },
  {
    path: ':id',
    component: DetailComponent
  },
  {
    path: 'player/:id',
    component: PlayerComponent
  },
];

@NgModule({
  declarations: [
    ListComponent,
    DetailComponent,
    PlayerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PaginatorModule,
    DataTableModule,
    PlayerCardModule,
    RouterModule.forChild(routes)
  ]
})
export class TeamsModule {
}
