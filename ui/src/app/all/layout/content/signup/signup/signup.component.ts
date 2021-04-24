import { Component, OnInit } from '@angular/core';
import { ROUTS, MESSAGES } from '../../../../constants/constants';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FieldmatchesDirective } from '../../../../services/fieldmatches.directive';
import { LoginService } from '../../../../services/login.service';
import { HttpRepository } from '../../../../repositorys/http.repository';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  ROUTS:any=ROUTS;
  MESSAGES:any=MESSAGES;
  form:FormGroup;
  error:string;
  disabled:boolean = false;
  
  constructor(private formBuilder:FormBuilder,
    public loginService:LoginService,
    public toastr: ToastrManager,
    public httpRepository:HttpRepository) {
  }

  ngOnInit() {
    this.init();
  }

  init() {

    this.form = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: [
        null,
        Validators.compose([Validators.email, Validators.required])
      ],
      password: [
        null,
        Validators.compose([
          Validators.required,
          // check whether the entered password has a number
          FieldmatchesDirective.patternValidator(/\d/, {
            hasNumber: true
          }),
          // check whether the entered password has upper case letter
          FieldmatchesDirective.patternValidator(/[A-Z]/, {
            hasCapitalCase: true
          }),
          // check whether the entered password has a lower case letter
          FieldmatchesDirective.patternValidator(/[a-z]/, {
            hasSmallCase: true
          }),
          FieldmatchesDirective.patternValidator(/[a-z]/, {
            hasSmallCase: true
          }),
          
          Validators.minLength(8)
        ])
      ],
      password_match: ['', [Validators.required]],
    });
  }

  submit(){
    console.log(this.form.controls);
    if (this.form.valid) {
        if(this.form.controls.password.value != this.form.controls.password_match.value){
          this.error = "This password not match with re-type";
          return;
        }
        this.error = undefined;
        this.disabled = true;

        this.httpRepository.signUp(this.form.value).subscribe(res => {
          this.disabled = false;
          this.loginService.loginSubmit(this.form.controls.email.value , this.form.controls.password.value );
          this.loginService.isLogin = true;
          this.toastr.successToastr(this.MESSAGES.SINGN_UP);
          
        }, err => {
          this.disabled = false;
          this.error = err.error.message;
        });

    } else {
      if(this.form.controls.username.errors){
        this.error = "Name is not available.";
        return;
      }
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
      if(this.form.controls.password.errors && this.form.controls.password.errors.minlength){
        this.error = "Password required 8 latter.";
        return;
      }
      if(this.form.controls.password.errors && this.form.controls.password.errors.hasCapitalCase){
        this.error = "Password required 1 Capital Case.";
        return;
      }
      if(this.form.controls.password.errors && this.form.controls.password.errors.hasSmallCase){
        this.error = "Password required 1 Small Case.";
        return;
      }
      if(this.form.controls.password.errors && this.form.controls.password.errors.hasNumber){
        this.error = "Password required 1 numeric.";
        return;
      }
      if(this.form.controls.password.errors){
        this.error = "Please check password.";
        return;
      }
      
    }
  }
}
