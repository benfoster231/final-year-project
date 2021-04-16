import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import {NgcCookieConsentModule} from 'ngx-cookieconsent';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NgbModule,
    GooglePlaceModule,
    NgcCookieConsentModule,
  ]
})
export class HomeModule { }
