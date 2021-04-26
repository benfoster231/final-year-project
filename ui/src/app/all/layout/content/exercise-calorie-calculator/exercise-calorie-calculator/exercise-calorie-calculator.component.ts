import { Component, OnInit } from '@angular/core';
import { CustomJs } from '../../../../constants/customJs';
import { exerciseCalorieCalculatorJs } from '../../../../constants/exerciseCalorieCalculatorJs';
import { LoginService } from '../../../../services/login.service';
import { ROUTS } from '../../../../constants/constants';
import { Router } from '@angular/router';
import { HttpRepository } from '../../../../repositorys/http.repository';
import { ToastrManager } from 'ng6-toastr-notifications';

declare var $:any;
@Component({
  selector: 'app-exercise-calorie-calculator',
  templateUrl: './exercise-calorie-calculator.component.html',
  styleUrls: ['./exercise-calorie-calculator.component.css']
})
export class ExerciseCalorieCalculatorComponent implements OnInit {

  login:boolean = false;
  ROUTS:any = ROUTS;
  constructor(public loginService:LoginService,
    public httpRepository:HttpRepository,
    public toastr: ToastrManager,
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


  public calculateSave() {
    let b: any = "standard" === $("input[name='units']:checked").val();
    let a: any = 0;
    a = parseFloat($("input[name='weight']").val());
    let ac = parseFloat($("input[name='weight']").val());
    let c: any = parseFloat($("input[name='height']").val());
    let d: any = parseFloat($("input[name='age']").val());
    let e: any = $("input[name='sex']:checked").val();
    b = $("#activity_level").val();
    a = "male" == e ? 88.362 + 13.397 * a + 4.799 * c - 5.677 * d : 447.593 + 9.247 * a + 3.098 * c - 4.33 * d;
    "no" === b ? a *= 1.2 : "light" === b ? a *= 1.375 : "moderate" === b ? a *= 1.55 : "heavy" === b ? a *= 1.725 : "extreme" === b && (a *= 1.9);
    a = Math.round(a + parseInt($("#gain_loss_amount").val()));
    $("#calAmount").text(1200 < a ? a : 1200);

    var data = {
      result:'',
      units:'',
      weight:0,
      height:'',
      age:'',
      sex:'',
      activity:'',
      gainLoss:'',
      
    };

    data.result = $("#calAmount").text();
    data.weight = ac;
    data.units = $("input[name='units']:checked").val();
    data.activity = $("#activity_level option:selected").text();
    data.gainLoss = $("#gain_loss_amount option:selected").text();
    data.height = c;
    data.age = d;
    data.sex = e;

    this.httpRepository.historyCalculation(JSON.stringify(data),"EXERCISE_CALORIE_CALCULATOR").subscribe(res => {
      
    }, err => {
      this.toastr.errorToastr(err.error.message);
    });

  }

}
