import { Component, OnInit } from '@angular/core';
import { CustomJs } from 'src/app/all/constants/customJs';
import { muscleJs } from 'src/app/all/constants/muscleJs';
import { ManageCookieService } from '../../../../services/manage-cookie.service';
import { CONSTANTS, ROUTS } from '../../../../constants/constants';
import { LoginService } from '../../../../services/login.service';
import { Router } from '@angular/router';

//To run jquery
declare var $: any;
@Component({
  selector: 'app-exercise-figures',
  templateUrl: './exercise-figures.component.html',
  styleUrls: ['./exercise-figures.component.css']
})
export class ExerciseFiguresComponent implements OnInit {

  CONSTANTS:any=CONSTANTS;
  ROUTS:any=ROUTS;
  login:boolean = false;
  constructor(public manageCookieService:ManageCookieService,
    public loginService:LoginService,
    public router:Router) { }

  ngOnInit(): void {
    
    CustomJs.init();
    muscleJs.init();
    setTimeout(() => {
      this.init();
    }, 1000);
    
  }

  init(){
    this.manageCookieService.setCookie('sex','m');
  }

  change(){
    if ($(".radio-option input[type=radio]:checked").val() == "male") {
      $('#malefigures').css("display", "block");
      $('#femalefigures').css("display", "none");
      
      this.manageCookieService.setCookie('sex','m');
    } else {
        $('#malefigures').css("display", "none");
        $('#femalefigures').css("display", "block");
        this.manageCookieService.setCookie('sex','f');
    }
  }
  setType(value){
    if(value == this.getType()){
      this.manageCookieService.setCookie(CONSTANTS.TYPE_URL,'');
    } else {
      this.manageCookieService.setCookie(CONSTANTS.TYPE_URL,value);
    }
  }
  getType(){
   return this.manageCookieService.getCookie(CONSTANTS.TYPE_URL);
  }
}
