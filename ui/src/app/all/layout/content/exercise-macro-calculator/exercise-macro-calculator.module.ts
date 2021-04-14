import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExerciseMacroCalculatorRoutingModule } from './exercise-macro-calculator-routing.module';
import { ExerciseMacroCalculatorComponent } from './exercise-macro-calculator/exercise-macro-calculator.component';


@NgModule({
  declarations: [ExerciseMacroCalculatorComponent],
  imports: [
    CommonModule,
    ExerciseMacroCalculatorRoutingModule
  ]
})
export class ExerciseMacroCalculatorModule { }
