import { Component, OnInit } from '@angular/core';
import { CustomJs } from 'src/app/all/constants/customJs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    CustomJs.init();
  }

}
