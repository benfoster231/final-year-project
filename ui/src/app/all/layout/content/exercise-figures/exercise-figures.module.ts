import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExerciseFiguresRoutingModule } from './exercise-figures-routing.module';
import { ExerciseFiguresComponent } from './exercise-figures/exercise-figures.component';
import { SharedModule } from '../../../shared-module/shared.module';


@NgModule({
  declarations: [ExerciseFiguresComponent],
  imports: [
    CommonModule,
    ExerciseFiguresRoutingModule,
    SharedModule
  ]
})
export class ExerciseFiguresModule { }
