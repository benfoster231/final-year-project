import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalculationHistoryRoutingModule } from './calculation-history-routing.module';
import { CalculationHistoryComponent } from './calculation-history/calculation-history.component';
import { SharedModule } from '../../../shared-module/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [CalculationHistoryComponent],
  imports: [
    CommonModule,
    CalculationHistoryRoutingModule,
    SharedModule,
    NgxPaginationModule
  ]
})
export class CalculationHistoryModule { }
