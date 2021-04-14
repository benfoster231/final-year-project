import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as CONSTANTS from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class HttpRepository {

  constructor(private httpClient: HttpClient) { }

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
   * Load streches data
   */
  loadStrechesData(): Observable<any> {

    return this.get(CONSTANTS.getDomain() + 'assets/data/strechesData.json', null)
		// return this.http.get('../../' + URL.LOAD_ALL_SECTIONS)
		// 		.map((res: Response) => res.json() || {});
	}
}
