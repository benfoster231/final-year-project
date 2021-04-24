import { Component, OnInit } from '@angular/core';
import { ROUTS } from '../../../constants/constants';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../../services/login.service';
import { HttpRepository } from '../../../repositorys/http.repository';
import { FieldmatchesDirective } from '../../../services/fieldmatches.directive';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  ROUTS:any=ROUTS;
  form:FormGroup;
  error:string;
  disabled:boolean = false;
  
  constructor(private formBuilder:FormBuilder,
    public loginService:LoginService,
    public httpRepository:HttpRepository) {
  }

  ngOnInit() {
    this.init();
  }

  init() {

    this.form = this.formBuilder.group({
      email: [
        null,
        Validators.compose([Validators.email, Validators.required])
      ],
      password: [
        null,
        Validators.compose([
          Validators.required
        ])
      ],
    });
  }

  submit(){
    console.log(this.form.controls);
    if (this.form.valid) {
        this.error = undefined;

        this.loginService.loginSubmit(this.form.controls.email.value , this.form.controls.password.value );

    } else {
      if(this.form.controls.email.errors && this.form.controls.email.errors.required){
        this.error = "Email is not available. ";
        return;
      }
      if(this.form.controls.email.errors && this.form.controls.email.errors.email){
        this.error = "This email is not valid. ";
        return;
      }
      if(this.form.controls.password.errors && this.form.controls.password.errors.required){
        this.error = "Password is not available. ";
        return;
      }
    }
  }
}
