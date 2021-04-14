import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StrechesComponent } from './streches/streches.component';

const routes: Routes = [
  {
    path: '',
    component: StrechesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StrechesRoutingModule { }
