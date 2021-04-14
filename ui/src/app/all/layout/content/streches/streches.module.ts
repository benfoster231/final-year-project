import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StrechesRoutingModule } from './streches-routing.module';
import { StrechesComponent } from './streches/streches.component';


@NgModule({
  declarations: [StrechesComponent],
  imports: [
    CommonModule,
    StrechesRoutingModule
  ]
})
export class StrechesModule { }
