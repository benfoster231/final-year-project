import { Component, OnInit } from '@angular/core';
import { CONSTANTS, ROUTS } from '../../../../constants/constants';
import { ResponseDataInterface } from '../../../../model/response.model';
import { JsonConvert, OperationMode, ValueCheckingMode } from 'json2typescript';
import { GymListResponse } from 'src/app/all/model/gym-list';
import { HttpRepository } from 'src/app/all/repositorys/http.repository';
import { CalculationHistoryResponse } from '../../../../model/calculation-history-response.model';
import { LoginService } from '../../../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calculation-history',
  templateUrl: './calculation-history.component.html',
  styleUrls: ['./calculation-history.component.css']
})
export class CalculationHistoryComponent implements OnInit {

  itemsPerPage = CONSTANTS.ITEMS_PER_PAGE;
  currentPage = CONSTANTS.CURRENT_PAGE ;
  calculationHistoryResponse: ResponseDataInterface;
  type:string = 'ALL';
  login:boolean = false;
  ROUTS:any=ROUTS;
  constructor(public httpRepository:HttpRepository,
    public loginService:LoginService,
    public router:Router) { }

  ngOnInit(): void {
    this.login = this.loginService.checkIsLogin();
    if(this.login == false){
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigateByUrl(ROUTS.HOME_PAGE);
      });
    }
    this.getHistory(this.type);
  }

  getHistory(type){
    this.httpRepository.getHistory(type).subscribe(res => {

      let jsonConvert: JsonConvert = new JsonConvert();
      jsonConvert.operationMode = OperationMode.ENABLE; // print some debug data
      jsonConvert.ignorePrimitiveChecks = true; // don't allow assigning number to string etc.
      jsonConvert.valueCheckingMode = ValueCheckingMode.ALLOW_OBJECT_NULL; // never allow null
      
      let calculationHistoryResponse: CalculationHistoryResponse;
      
      try {

        calculationHistoryResponse = jsonConvert.deserializeObject(res, CalculationHistoryResponse);
        let responseDataInterface: ResponseDataInterface = <ResponseDataInterface> calculationHistoryResponse;
        
        this.calculationHistoryResponse = responseDataInterface;

      } catch (e) {
        console.log("Exception", (<Error>e));
      }
        
    }, err => {

    });
  }

  getJson(data){
    return JSON.parse(data);
  }
}
