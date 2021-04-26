import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ManageCookieService } from '../services/manage-cookie.service';
import { URL, CONSTANTS } from '../constants/constants';
import * as FUNCTION from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class HttpRepository {

  CONTSANT:any=CONSTANTS;
  token:any = this.manageCookieService.getCookie(this.CONTSANT.ACCESS_TOKEN_COOKIE_TYPE) + ' ' + this.manageCookieService.getCookie(this.CONTSANT.ACCESS_TOKEN_COOKIE);
  constructor(private httpClient: HttpClient,
    private manageCookieService: ManageCookieService) { }

  /**
   * Generic post method
   */
  post(url: string, data: any, options: any): Observable<any> {

    return this.httpClient.post<any>(url, data, options);
  }

  /**
   * Get request
   */
  get(url: string, options: any): Observable<any> {

    return this.httpClient.get<any>(url, options);
  }

  /**
     * get gym list
     * @param lang 
     * @param lattitude 
     * @param longitude 
  */
  getGymList(lattitude:string, longitude:string) : Observable<any> {

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('lattitude', lattitude);
    urlSearchParams.append('longittude', longitude);
    let body = urlSearchParams.toString();
    
    return this.get(URL.GYM_LIST + "?" + body, '');
  }

  getGymDetailsOnMap(gymId:string): Observable<any> {
     
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('gymId', gymId);
    let body = urlSearchParams.toString();

    return this.get(URL.GYM_DETAILS_ON_MAP + "?" + body, '');
  }

  /**
   * Load streches data
   */
  public loadStrechesData(): Observable<any> {

    return this.httpClient.get('assets/data/strechesData.json');
    return this.get(FUNCTION.getDomain() + 'assets/data/strechesData.json', null)
		// return this.http.get('../../' + URL.LOAD_ALL_SECTIONS)
		// 		.map((res: Response) => res.json() || {});
	}

  getGymDetails(gymId: number) {

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('gymId', gymId.toString());
    let body = urlSearchParams.toString();

    return this.get(URL.GYM_DETAIL + "?" + body, '');
  }

  login(email: string, password: string): Observable<any> {

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('email',email);
    urlSearchParams.append('password',password);
    let body = urlSearchParams.toString();

    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    let options = {
      headers: httpHeaders
    };

    return this.post(URL.LOGIN + "?" + body, '', options);
  }

  signUp(signupDTO: any): Observable<any> {
      
    //get language
    let urlSearchParams = new URLSearchParams();
    let body = urlSearchParams.toString();
    let requestBody = {};
    requestBody['email'] = signupDTO.email;
    requestBody['name'] = signupDTO.username;
    requestBody['password'] = signupDTO.password;

    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    let options = {
      headers: httpHeaders
    };

    return this.post(URL.SIGNUP + "?" + body, requestBody, options);
  }

  checkLogin() : Observable<any> {
    
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.token
    });

    let options = {
      headers: httpHeaders
    };
    
    return this.get(URL.CHECK_LOGIN , options);
  }

  logout() : Observable<any> {

    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.token
    });

    let options = {
      headers: httpHeaders
    };

    return this.get(URL.LOGOUT, options);
  }

  getHistory(type: any) : Observable<any> {

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('calculation',type);
    let body = urlSearchParams.toString();

    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.token
    });

    let options = {
      headers: httpHeaders
    };

    return this.get(URL.GET_HISTORY + '?' + body, options);
  }

  historyCalculation(data:string, calculation: string): Observable<any> {

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('data',data);
    urlSearchParams.append('calculation',calculation);
    let body = urlSearchParams.toString();

    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.token
    });

    let options = {
      headers: httpHeaders
    };

    return this.post(URL.CALCULATION_HISTORY + "?" + body, '', options);
  }
}
