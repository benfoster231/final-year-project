import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GymDetailComponent } from './gym-detail/gym-detail.component';


const routes: Routes = [
  {
    path: '',
    component: GymDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GymDetailRoutingModule { }
