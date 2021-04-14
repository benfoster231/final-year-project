import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExerciseFiguresRoutingModule } from './exercise-figures-routing.module';
import { ExerciseFiguresComponent } from './exercise-figures/exercise-figures.component';


@NgModule({
  declarations: [ExerciseFiguresComponent],
  imports: [
    CommonModule,
    ExerciseFiguresRoutingModule
  ]
})
export class ExerciseFiguresModule { }
