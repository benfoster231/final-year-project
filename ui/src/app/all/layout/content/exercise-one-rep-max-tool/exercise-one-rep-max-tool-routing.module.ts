import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExerciseOneRepMaxToolComponent } from './exercise-one-rep-max-tool/exercise-one-rep-max-tool.component';


const routes: Routes = [
  {
    path: '',
    component: ExerciseOneRepMaxToolComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExerciseOneRepMaxToolRoutingModule { }
