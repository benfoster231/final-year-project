import { Component, OnInit } from '@angular/core';
import { HttpRepository } from 'src/app/all/repositorys/http.repository';
import { Router, ActivatedRoute } from '@angular/router';
import { ManageCookieService } from '../../../../services/manage-cookie.service';
import { CONSTANTS } from '../../../../constants/constants';

//To run jquery
// declare var $: any;
@Component({
  selector: 'app-gym-streches',
  templateUrl: './gym-streches.component.html',
  styleUrls: ['./gym-streches.component.css']
})
export class GymStrechesComponent implements OnInit {

  CONSTANTS:any=CONSTANTS;
  constructor(public httpRepository: HttpRepository,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public manageCookieService:ManageCookieService) { }

  strechData : any;
  type:string;
  gender:string;
  bodypart:string;

  ngOnInit(): void {
    this.type = this.activatedRoute.snapshot.paramMap.get('type');
    this.gender = this.activatedRoute.snapshot.paramMap.get('gender');
    this.bodypart = this.activatedRoute.snapshot.paramMap.get('bodypart');

    this.httpRepository.loadStrechesData().subscribe(res => {

      //TODO : url mathi aa parameter levano 6 j ama pass karvano
      let strechName = this.bodypart;
      this.strechData = res[this.gender][this.type][strechName];
    }, err => { 
      console.log('test');
    });
  }

  setType(value){
    if(value == this.getType()){
      this.manageCookieService.setCookie(CONSTANTS.TYPE_URL,'');
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        return this.router.navigateByUrl('/Exercises/'+this.gender +'/'+this.bodypart );
      });
      
    } else {
      this.manageCookieService.setCookie(CONSTANTS.TYPE_URL,value);
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        return this.router.navigateByUrl('/'+value+'/'+this.gender +'/'+this.bodypart);
      });
      
    }
  }
  getType(){
   return this.manageCookieService.getCookie(CONSTANTS.TYPE_URL);
  }
}
