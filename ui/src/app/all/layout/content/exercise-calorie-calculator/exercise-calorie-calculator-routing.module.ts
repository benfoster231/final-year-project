import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExerciseCalorieCalculatorComponent } from './exercise-calorie-calculator/exercise-calorie-calculator.component';


const routes: Routes = [
  {
    path: '',
    component: ExerciseCalorieCalculatorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExerciseCalorieCalculatorRoutingModule { }
