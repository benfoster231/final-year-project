import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExerciseMacroCalculatorComponent } from './exercise-macro-calculator/exercise-macro-calculator.component';


const routes: Routes = [
  {
    path: '',
    component: ExerciseMacroCalculatorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExerciseMacroCalculatorRoutingModule { }
