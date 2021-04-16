import { Component, OnInit } from '@angular/core';
import { CustomJs } from 'src/app/all/constants/customJs';
import { exerciseCalorieCalculatorJs } from 'src/app/all/constants/exerciseCalorieCalculatorJs';

//To run jquery
declare var $: any;
@Component({
  selector: 'app-exercise-macro-calculator',
  templateUrl: './exercise-macro-calculator.component.html',
  styleUrls: ['./exercise-macro-calculator.component.css']
})
export class ExerciseMacroCalculatorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    CustomJs.init();
    exerciseCalorieCalculatorJs.init();
  }

  calculateCPF() {
    $("#carbs").data("roundSlider").setValue(+$("#carbs").data("roundSlider").option("value") + 0.001);
    $("#fat").data("roundSlider").setValue(+$("#fat").data("roundSlider").option("value") + 0.001);
    $("#protein").data("roundSlider").setValue(+$("#protein").data("roundSlider").option("value") + 0.001);
}
}
