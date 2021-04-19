import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { JsonConvert, OperationMode, ValueCheckingMode } from 'json2typescript';
import { ToastrManager } from 'ng6-toastr-notifications';
import { GymDetailResponse } from 'src/app/all/model/gym-detail-response.model';
import { ResponseDataInterface } from 'src/app/all/model/response.model';
import { HttpRepository } from 'src/app/all/repositorys/http.repository';
import * as CONSTANTS_CLASS from '../../../../constants/constants';

@Component({
  selector: 'app-gym-detail',
  templateUrl: './gym-detail.component.html',
  styleUrls: ['./gym-detail.component.css']
})
export class GymDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router,
    private httpRepository: HttpRepository,
    public toastr:ToastrManager,
    private _sanitizer: DomSanitizer) { }

  gymDetailResponse: GymDetailResponse;
  URL: any = CONSTANTS_CLASS.URL;
  ROUTS: any = CONSTANTS_CLASS.ROUTS;
  public videoUrl: SafeResourceUrl;

  ngOnInit() {
    let id: string = this.route.snapshot.paramMap.get('id');

    if(!id)
      return this.router.navigateByUrl('/' + CONSTANTS_CLASS.ROUTS.HOME_PAGE);

    this.getGymDetails(id);
  }

  getGymDetails(id){
    this.httpRepository.getGymDetails(id).subscribe(res => {
      let jsonConvert: JsonConvert = new JsonConvert();
      jsonConvert.operationMode = OperationMode.ENABLE; // convert response to json
      jsonConvert.ignorePrimitiveChecks = true; // don't allow assigning number to string etc.
      jsonConvert.valueCheckingMode = ValueCheckingMode.ALLOW_OBJECT_NULL; // never allow null 

      let gymDetailResponse: GymDetailResponse;

      try {
        gymDetailResponse = jsonConvert.deserializeObject(res, GymDetailResponse);
        let responseDataInterface: ResponseDataInterface = <ResponseDataInterface>gymDetailResponse;
        this.gymDetailResponse = responseDataInterface;
        if (this.gymDetailResponse && this.gymDetailResponse.data && this.gymDetailResponse.data.videoUrl)
          this.setYouTubeUrl();
      }catch (e) {
        console.log('Exception', (<Error>e));
      }

    }, err => {
      console.log(err);
      this.toastr.errorToastr(err.error.message);
      this.router.navigateByUrl('/' + CONSTANTS_CLASS.ROUTS.HOME_PAGE);
    });
  }

  setYouTubeUrl() {
    this.videoUrl = this._sanitizer.bypassSecurityTrustResourceUrl(this.gymDetailResponse.data.videoUrl);
  }
}
