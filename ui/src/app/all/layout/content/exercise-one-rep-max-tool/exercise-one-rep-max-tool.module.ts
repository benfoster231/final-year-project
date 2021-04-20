import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExerciseOneRepMaxToolRoutingModule } from './exercise-one-rep-max-tool-routing.module';
import { ExerciseOneRepMaxToolComponent } from './exercise-one-rep-max-tool/exercise-one-rep-max-tool.component';
import { SharedModule } from '../../../shared-module/shared.module';


@NgModule({
  declarations: [ExerciseOneRepMaxToolComponent],
  imports: [
    CommonModule,
    ExerciseOneRepMaxToolRoutingModule,
    SharedModule
  ]
})
export class ExerciseOneRepMaxToolModule { }
