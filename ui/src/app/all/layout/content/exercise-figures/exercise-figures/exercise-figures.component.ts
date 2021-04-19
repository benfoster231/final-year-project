import { Component, OnInit } from '@angular/core';
import { CustomJs } from 'src/app/all/constants/customJs';
import { muscleJs } from 'src/app/all/constants/muscleJs';

//To run jquery
declare var $: any;
@Component({
  selector: 'app-exercise-figures',
  templateUrl: './exercise-figures.component.html',
  styleUrls: ['./exercise-figures.component.css']
})
export class ExerciseFiguresComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    CustomJs.init();
    muscleJs.init();
    $(".radio-option input:radio").change(function () {
      if ($(this).val() == "male") {
          $('#malefigures').css("display", "block");
          $('#femalefigures').css("display", "none");
      } else {
          $('#malefigures').css("display", "none");
          $('#femalefigures').css("display", "block");
      }
    });
  }

}
