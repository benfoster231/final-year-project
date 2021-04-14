import { Component, OnInit } from '@angular/core';
import { HttpRepository } from 'src/app/all/repositorys/http.repository';

@Component({
  selector: 'app-streches',
  templateUrl: './streches.component.html',
  styleUrls: ['./streches.component.css']
})
export class StrechesComponent implements OnInit {

  strechData : any;

  constructor(public httpRepository: HttpRepository) { }

  ngOnInit(): void {

    this.httpRepository.loadStrechesData().subscribe(res => {

      //TODO : url mathi aa parameter levano 6 j ama pass karvano
      let strechName = 'chest';
      this.strechData = res[strechName];
    }, err => {
    });
  }

}
