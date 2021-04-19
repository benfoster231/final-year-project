import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GymDetailRoutingModule } from './gym-detail-routing.module';
import { GymDetailComponent } from './gym-detail/gym-detail.component';


@NgModule({
  declarations: [GymDetailComponent],
  imports: [
    CommonModule,
    GymDetailRoutingModule
  ]
})
export class GymDetailModule { }
