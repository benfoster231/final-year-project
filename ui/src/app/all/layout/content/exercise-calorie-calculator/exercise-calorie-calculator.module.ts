import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExerciseCalorieCalculatorRoutingModule } from './exercise-calorie-calculator-routing.module';
import { ExerciseCalorieCalculatorComponent } from './exercise-calorie-calculator/exercise-calorie-calculator.component';
import { SharedModule } from '../../../shared-module/shared.module';


@NgModule({
  declarations: [ExerciseCalorieCalculatorComponent],
  imports: [
    CommonModule,
    ExerciseCalorieCalculatorRoutingModule,
    SharedModule
  ]
})
export class ExerciseCalorieCalculatorModule { }
