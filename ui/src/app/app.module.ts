import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './all/layout/content/index/index.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ng6-toastr-notifications';
import { CookieService } from 'ngx-cookie-service';
import {NgcCookieConsentModule, NgcCookieConsentConfig} from 'ngx-cookieconsent';

const cookieConfig:NgcCookieConsentConfig = {
  cookie: {
    domain: 'Paninomap.com/test' // or 'your.domain.com' // it is mandatory to set a domain, for cookies to work properly (see)
  },
  palette: {
    popup: {
      background: '#f3efef'
    },
    button: {
      background: '#e11417'
    }
  },
  theme: 'edgeless',
  type: 'opt-out',
  content: {
        href: 'https://www.accademiapaninoitaliano.it/privacy.html',
        target: 'blank',
        },
};

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    NgcCookieConsentModule.forRoot(cookieConfig)
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
