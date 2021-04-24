import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgcCookieConsentModule } from 'ngx-cookieconsent';
import { SharedModule } from '../../../shared-module/shared.module';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    NgbModule,
    NgcCookieConsentModule,
    SharedModule
  ]
})
export class LoginModule { }
