import { Component, OnInit } from '@angular/core';
import { CustomJs } from 'src/app/all/constants/customJs';
import { exerciseCalorieCalculatorJs } from 'src/app/all/constants/exerciseCalorieCalculatorJs';

@Component({
  selector: 'app-exercise-calorie-calculator',
  templateUrl: './exercise-calorie-calculator.component.html',
  styleUrls: ['./exercise-calorie-calculator.component.css']
})
export class ExerciseCalorieCalculatorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    CustomJs.init();
    exerciseCalorieCalculatorJs.init();
  }

}
