import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GymStrechesComponent } from './gym-streches/gym-streches.component';


const routes: Routes = [
  {
    path: '',
    component: GymStrechesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GymStrechesRoutingModule { }
