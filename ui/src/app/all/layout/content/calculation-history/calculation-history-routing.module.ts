import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalculationHistoryComponent } from './calculation-history/calculation-history.component';

const routes: Routes = [
  {
    path: '',
    component: CalculationHistoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalculationHistoryRoutingModule { }
