import { Component, OnInit } from '@angular/core';
import { CustomJs } from 'src/app/all/constants/customJs';
import { repsJs } from 'src/app/all/constants/repsJs';

//To run jquery
declare var $: any;
@Component({
  selector: 'app-exercise-one-rep-max-tool',
  templateUrl: './exercise-one-rep-max-tool.component.html',
  styleUrls: ['./exercise-one-rep-max-tool.component.css']
})
export class ExerciseOneRepMaxToolComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    CustomJs.init();
    repsJs.init();
  }

  calculateReps() {
    var param1 = 1.0278;
    var param2 = 0.0278;
    var param3 = 0.75;
    var maxReps = 10;
    var trim = Math.round;
    var unit = $("input[name='weightunit']:checked").val();
    var nrOfReps = $("#reps").val();
    var weight = $("#weight").val();
    if (unit == "kg") {}
    var oneRepMax = null;
    if (nrOfReps > maxReps) {
        alert("You can't enter more than 10 reps!");
        return false;
    } else if (nrOfReps < maxReps) {
        oneRepMax = trim(weight / (param1 - param2 * nrOfReps));
    } else if (nrOfReps == maxReps) {
        oneRepMax = trim(weight / param3);
    }
    $("#test-circle50").find('text')[0].innerHTML = trim(oneRepMax * 0.50);
    $("#test-circle55").find('text')[0].innerHTML = trim(oneRepMax * 0.55);
    $("#test-circle60").find('text')[0].innerHTML = trim(oneRepMax * 0.60);
    $("#test-circle65").find('text')[0].innerHTML = trim(oneRepMax * 0.65);
    $("#test-circle70").find('text')[0].innerHTML = trim(oneRepMax * 0.70);
    $("#test-circle75").find('text')[0].innerHTML = trim(oneRepMax * 0.75);
    $("#test-circle80").find('text')[0].innerHTML = trim(oneRepMax * 0.80);
    $("#test-circle85").find('text')[0].innerHTML = trim(oneRepMax * 0.85);
    $("#test-circle90").find('text')[0].innerHTML = trim(oneRepMax * 0.90);
    $("#test-circle95").find('text')[0].innerHTML = trim(oneRepMax * 0.95);
    $("#maxrep").text(oneRepMax);
    return false;
}

}
