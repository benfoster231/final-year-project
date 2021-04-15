import { Component, OnInit } from '@angular/core';
import { HttpRepository } from 'src/app/all/repositorys/http.repository';

//To run jquery
// declare var $: any;
@Component({
  selector: 'app-gym-streches',
  templateUrl: './gym-streches.component.html',
  styleUrls: ['./gym-streches.component.css']
})
export class GymStrechesComponent implements OnInit {

  constructor(public httpRepository: HttpRepository) { }

  strechData : any;

  ngOnInit(): void {

    this.httpRepository.loadStrechesData().subscribe(res => {

      //TODO : url mathi aa parameter levano 6 j ama pass karvano
      let strechName = 'chest';
      this.strechData = res[strechName];
      console.log('test' + this.strechData);
    }, err => { 
      console.log('test');
    });
  }
}
