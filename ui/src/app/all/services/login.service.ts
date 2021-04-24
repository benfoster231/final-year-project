import { Injectable } from '@angular/core';
import { ManageCookieService } from './manage-cookie.service';
import { Router } from '@angular/router';
import { HttpRepository } from '../repositorys/http.repository';
import { CONSTANTS, ROUTS, MESSAGES } from '../constants/constants';
import { JsonConvert, OperationMode, ValueCheckingMode } from 'json2typescript';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrManager } from 'ng6-toastr-notifications';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public httpRepository : HttpRepository,
    public manageCookieService: ManageCookieService,
    public toastr: ToastrManager,
    public router: Router) { }
  
  public isLogin: boolean = false;
  public checkIsLoginResponse: any;
  public ROUTS:any=ROUTS;
  public CONSTANTS:any=CONSTANTS;
  public MESSAGES:any=MESSAGES;

   /**
   * Check is user login
   */
  checkIsLogin(): boolean {

    let accessToken = this.getAccessToken();

    if(accessToken != null) {
      this.checkIsLoginResponse = this.httpRepository.checkLogin().subscribe(res => {
        if(res.data != null){
          this.isLogin = true;
          return true;
        } else {
          return false;
        }
      }, err => {
        return false;
      });
    } else {
      this.isLogin = false;
      return false;
    }

  }

  /**
   * Check is access token expired or not
   */
  checkAccessTokenExpired(error: HttpErrorResponse) {
    if (error.statusText === 'Unknown Error' || (error.status === CONSTANTS.ERROR_CODE_401 && error.error.error === 'Unauthorized')) {
      this.manageCookieService.deleteAllCookie();
      this.isLogin = false;
    }
  }

  /**
   * Submit login form
   */
  loginSubmit(email : string, password : string) {

    this.httpRepository.login(email, password).subscribe(res => {

      try {
        // SUCCESS
        this.manageCookieService.setCookie(CONSTANTS.ACCESS_TOKEN_COOKIE, res.accessToken);
        this.manageCookieService.setCookie(CONSTANTS.ACCESS_TOKEN_COOKIE_TYPE, res.tokenType);
        this.isLogin = true;
        //reload page
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigateByUrl(ROUTS.HOME_PAGE);
        });
        
      } catch (e) {
        console.log((<Error>e));
      }

    }, err => {
      if(err.status == this.CONSTANTS.ERROR_CODE_401){
        this.toastr.errorToastr( this.MESSAGES.EMAIL_OR_PASS);
      } else {
        this.toastr.errorToastr(err.error.message);
      }
      
    });
  }

  /**
   * Get access token
   */
  public getAccessToken() {
    return this.manageCookieService.getCookie(CONSTANTS.ACCESS_TOKEN_COOKIE);
  }
  public getAccessTokenType() {
    return this.manageCookieService.getCookie(CONSTANTS.ACCESS_TOKEN_COOKIE_TYPE);
  }

  signOut(): void {
    this.manageCookieService.deleteAllCookie();
    // this.httpRepository.logout().subscribe(res => { });
    this.isLogin = false;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigateByUrl(ROUTS.HOME_PAGE);
    });
  }

}
