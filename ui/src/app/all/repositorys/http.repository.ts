import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ManageCookieService } from '../services/manage-cookie.service';
import { URL, CONSTANTS } from '../constants/constants';
import * as FUNCTION from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class HttpRepository {

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
}
