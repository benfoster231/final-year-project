import { Component, OnInit } from '@angular/core';
import { CustomJs } from 'src/app/all/constants/customJs';
import { exerciseCalorieCalculatorJs } from 'src/app/all/constants/exerciseCalorieCalculatorJs';
import { LoginService } from '../../../../services/login.service';
import { Router } from '@angular/router';
import { ROUTS } from '../../../../constants/constants';
import { HttpRepository } from 'src/app/all/repositorys/http.repository';
import { ToastrManager } from 'ng6-toastr-notifications';

//To run jquery
declare var $: any;
@Component({
  selector: 'app-exercise-macro-calculator',
  templateUrl: './exercise-macro-calculator.component.html',
  styleUrls: ['./exercise-macro-calculator.component.css']
})
export class ExerciseMacroCalculatorComponent implements OnInit {

  login:boolean = false;
  ROUTS:any = ROUTS;
  constructor(private loginService:LoginService,
    private httpRepository:HttpRepository,
    private toastr:ToastrManager,
    private router:Router) { }

  ngOnInit(): void {
    this.login = this.loginService.checkIsLogin();
    if(this.login == false){
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigateByUrl(ROUTS.HOME_PAGE);
      });
    }
    CustomJs.init();
    exerciseCalorieCalculatorJs.init();
  }

  calculateCPF() {
    $("#carbs").data("roundSlider").setValue(+$("#carbs").data("roundSlider").option("value") + 0.001);
    $("#fat").data("roundSlider").setValue(+$("#fat").data("roundSlider").option("value") + 0.001);
    $("#protein").data("roundSlider").setValue(+$("#protein").data("roundSlider").option("value") + 0.001);

    var data = {
      result:{
        Carbs:'',
        Protein:'',
        Fat:''
      },
      units:'',
      calories:'',
      meals:''
    };

    data.result.Carbs = $("#carbinfo").text();
    data.result.Protein = $("#proteininfo").text();
    data.result.Fat = $("#fatinfo").text();
    data.units = $("input[name=diet]:checked").closest('div').find('span').text();
    data.calories = $("#calories").val();
    data.meals = $("#meals").val();

    this.httpRepository.historyCalculation(JSON.stringify(data),"EXERCISE_MACRO_CALCULATOR").subscribe(res => {
      
    }, err => {
      this.toastr.errorToastr(err.error.message);
    });
  }
}
