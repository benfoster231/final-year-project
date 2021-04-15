import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GymStrechesRoutingModule } from './gym-streches-routing.module';
import { GymStrechesComponent } from './gym-streches/gym-streches.component';

@NgModule({
  declarations: [GymStrechesComponent],
  imports: [
    CommonModule,
    GymStrechesRoutingModule
  ]
})
export class GymStrechedModule { }
