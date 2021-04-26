import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EliteMusclesAboutRoutingModule } from './elite-muscles-about-routing.module';
import { EliteMusclesAboutComponent } from './elite-muscles-about/elite-muscles-about.component';
import { SharedModule } from '../../../shared-module/shared.module';


@NgModule({
  declarations: [EliteMusclesAboutComponent],
  imports: [
    CommonModule,
    EliteMusclesAboutRoutingModule,
    SharedModule
  ]
})
export class EliteMusclesAboutModule { }
