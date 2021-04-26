import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EliteMusclesAboutComponent } from './elite-muscles-about/elite-muscles-about.component';

const routes: Routes = [
  {
    path: '',
    component: EliteMusclesAboutComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EliteMusclesAboutRoutingModule { }
