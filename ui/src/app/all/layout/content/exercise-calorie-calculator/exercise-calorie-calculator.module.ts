import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExerciseCalorieCalculatorRoutingModule } from './exercise-calorie-calculator-routing.module';
import { ExerciseCalorieCalculatorComponent } from './exercise-calorie-calculator/exercise-calorie-calculator.component';


@NgModule({
  declarations: [ExerciseCalorieCalculatorComponent],
  imports: [
    CommonModule,
    ExerciseCalorieCalculatorRoutingModule
  ]
})
export class ExerciseCalorieCalculatorModule { }
