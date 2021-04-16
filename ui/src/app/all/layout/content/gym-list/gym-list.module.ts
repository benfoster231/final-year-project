import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GymListRoutingModule } from './gym-list-routing.module';
import { GymListComponent } from './gym-list/gym-list.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [GymListComponent],
  imports: [
    CommonModule,
    GymListRoutingModule,
    NgxPaginationModule
  ]
})
export class GymListModule { }
