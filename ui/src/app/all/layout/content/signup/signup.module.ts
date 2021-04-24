import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../../shared-module/shared.module';
import { NgcCookieConsentModule } from 'ngx-cookieconsent';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup/signup.component';


@NgModule({
  declarations: [SignupComponent],
  imports: [
    CommonModule,
    SignupRoutingModule,
    NgbModule,
    NgcCookieConsentModule,
    SharedModule
  ]
})
export class SingupModule { }
