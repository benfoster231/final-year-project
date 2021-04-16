import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExerciseOneRepMaxToolRoutingModule } from './exercise-one-rep-max-tool-routing.module';
import { ExerciseOneRepMaxToolComponent } from './exercise-one-rep-max-tool/exercise-one-rep-max-tool.component';


@NgModule({
  declarations: [ExerciseOneRepMaxToolComponent],
  imports: [
    CommonModule,
    ExerciseOneRepMaxToolRoutingModule
  ]
})
export class ExerciseOneRepMaxToolModule { }
