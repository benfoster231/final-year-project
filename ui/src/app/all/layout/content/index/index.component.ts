import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTS } from 'src/app/all/constants/constants';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Check for is login
    this.router.navigateByUrl('/' + ROUTS.HOME_PAGE);
  }

}
