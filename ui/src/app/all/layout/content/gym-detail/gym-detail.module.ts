import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GymDetailRoutingModule } from './gym-detail-routing.module';
import { GymDetailComponent } from './gym-detail/gym-detail.component';
import { SharedModule } from '../../../shared-module/shared.module';


@NgModule({
  declarations: [GymDetailComponent],
  imports: [
    CommonModule,
    GymDetailRoutingModule,
    SharedModule
  ]
})
export class GymDetailModule { }
