import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ManageCookieService {

  constructor(private cookieService: CookieService,
  @Inject(PLATFORM_ID) private platformId: Object) { }
  
  public setCookie(key : string, value : string) {
    // this.cookieService.set(key, value);
    if (isPlatformBrowser(this.platformId))
      localStorage.setItem(key, value);
  }
  
  public getCookie(key : string) {
    // return this.cookieService.get(key);
    if (isPlatformBrowser(this.platformId))
      return localStorage.getItem(key);
  }
  
  public deleteCookie(key : string) {
    // this.cookieService.delete(key);
    localStorage.removeItem(key);
  }
  
  public deleteAllCookie() {
    // this.cookieService.deleteAll('/');
    localStorage.clear();

  }
  
}

