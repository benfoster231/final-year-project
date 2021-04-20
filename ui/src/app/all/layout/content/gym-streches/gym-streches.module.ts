import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GymStrechesRoutingModule } from './gym-streches-routing.module';
import { GymStrechesComponent } from './gym-streches/gym-streches.component';
import { SharedModule } from '../../../shared-module/shared.module';

@NgModule({
  declarations: [GymStrechesComponent],
  imports: [
    CommonModule,
    GymStrechesRoutingModule,
    SharedModule
  ]
})
export class GymStrechedModule { }
