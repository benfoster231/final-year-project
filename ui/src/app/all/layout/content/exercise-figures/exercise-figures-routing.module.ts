import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExerciseFiguresComponent } from './exercise-figures/exercise-figures.component';


const routes: Routes = [
  {
    path: '',
    component: ExerciseFiguresComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExerciseFiguresRoutingModule { }
