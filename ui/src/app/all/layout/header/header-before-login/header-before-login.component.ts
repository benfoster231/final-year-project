import { Component, OnInit } from '@angular/core';
import { ROUTS } from '../../../constants/constants';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-header-before-login',
  templateUrl: './header-before-login.component.html',
  styleUrls: ['./header-before-login.component.css']
})
export class HeaderBeforeLoginComponent implements OnInit {

  constructor(public loginService:LoginService) { }
  public ROUTS:any=ROUTS;
  
  ngOnInit(): void {
    this.loginService.checkIsLogin();
  }

}
