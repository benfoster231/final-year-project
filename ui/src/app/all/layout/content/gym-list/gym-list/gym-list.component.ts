import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JsonConvert, OperationMode, ValueCheckingMode } from 'json2typescript';
import { ToastrManager } from 'ng6-toastr-notifications';
import { CONSTANTS, ROUTS, URL } from 'src/app/all/constants/constants';
import { LocalScript } from 'src/app/all/constants/localScript';
import { GymListResponse } from 'src/app/all/model/gym-list';
import { ResponseDataInterface } from 'src/app/all/model/response.model';
import { HttpRepository } from 'src/app/all/repositorys/http.repository';
import { ManageMapService, MapMarker } from 'src/app/all/services/manage-map.service';
import { MESSAGES } from '../../../../constants/constants';

declare var google: any;
declare var $:any;
@Component({
  selector: 'app-gym-list',
  templateUrl: './gym-list.component.html',
  styleUrls: ['./gym-list.component.css']
})
export class GymListComponent implements OnInit {

  itemsPerPage = CONSTANTS.ITEMS_PER_PAGE;
  currentPage = CONSTANTS.CURRENT_PAGE ;
  gymListResponseDataInterface: ResponseDataInterface;

  /**
   * Reference
   * https://github.com/ultrasonicsoft/googlemaps-angular6/blob/master/src/app/app.component.ts
   */
   @ViewChild('gmap') gmapElement: any;
   map: any;
   
   public lattitude:string; 
   public longitude:string;
   public citySearch:string;
   public getStoreListDone: any;
   search:string = '';
   URL: any = URL;
   ROUTS: any = ROUTS;

  constructor(private httpRepository: HttpRepository,
    public manageMapService: ManageMapService,
    public activatedRoute: ActivatedRoute,
    public toastr: ToastrManager,
    private router: Router) { }

  ngOnInit(): void {
    this.lattitude = this.activatedRoute.snapshot.queryParams['lat'];
    this.longitude = this.activatedRoute.snapshot.queryParams['long'];
    this.citySearch = this.activatedRoute.snapshot.queryParams['citySearch'];
    this.search = this.activatedRoute.snapshot.queryParams['search'];
    if(this.citySearch == "true" || this.citySearch == undefined) {
      // this.getHomePagData();
    } else {
      this.itemsPerPage = 10;
    }
      
    this.getGymList();
  }

  /**
   * get markers on map
   * @param mapMarkers 
   */
   manageMap(mapMarkers : MapMarker[]) {
    
    this.manageMapService.init(this);
    this.manageMapService.setMarkers(mapMarkers, true, false);
  }

  /**
   * get marker store details 
   * @param concreteStoreId 
   * @param marker 
   */
  public mapMarkerCallback(concreteStoreId: string, marker: any) {
    
    //Call api for marker store info on map
    this.httpRepository.getGymDetailsOnMap(concreteStoreId).subscribe(res => {
    
      let infoTextHtml = `
        <div>
          <h4><a href=`+ CONSTANTS.FRONTEND_URL +`/`+ROUTS.GYM_DETAIL + res.data.gymId +` target="_blank">`+res.data.name+`</a></h4>
          <br/>
          <p>`+ res.data.address +`</p>
          <br/> 
        </div>
      `;

      let infowindow = new google.maps.InfoWindow({ content: infoTextHtml});
      infowindow.open(this.map, marker);
    });
   
  }

  /**
   * get store list
   */
   getGymList() {
    
    // blockUi();
    let lat:number =  +this.lattitude;
    let log:number =  +this.longitude;
    this.getStoreListDone = this.httpRepository.getGymList(this.lattitude, this.longitude).subscribe(res => {

      let jsonConvert: JsonConvert = new JsonConvert();
      jsonConvert.operationMode = OperationMode.ENABLE; // print some debug data
      jsonConvert.ignorePrimitiveChecks = true; // don't allow assigning number to string etc.
      jsonConvert.valueCheckingMode = ValueCheckingMode.ALLOW_OBJECT_NULL; // never allow null
      
      let gymListResponse: GymListResponse;
      
      try {

        gymListResponse = jsonConvert.deserializeObject(res, GymListResponse);
        let responseDataInterface: ResponseDataInterface = <ResponseDataInterface> gymListResponse;
        
        this.gymListResponseDataInterface = responseDataInterface;

        let mapMarkers : MapMarker[] = [];
        if(this.gymListResponseDataInterface.data.length > 0) {
          this.gymListResponseDataInterface.data.forEach(function (value) {
            let mapMarker1: MapMarker = new MapMarker();
            mapMarker1.lat = value.latitude;
            mapMarker1.lng = value.longitude;
            mapMarker1.centerLat = lat;
            mapMarker1.centerLog = log;
            mapMarker1.extraData = value.id;
            mapMarker1.icon = "mapAppIcon.png";

            mapMarkers.push(mapMarker1);
          });

          this.manageMap(mapMarkers);
          setTimeout(() => {
            $('#heder-login').addClass("fullscreen-top-md");
          }, 500);

        }
      } catch (e) {
        console.log("Exception", (<Error>e));
      }
        
      //To load all js for sticky header etc.
      LocalScript.init();
      // unBlockUi();

    }, err => {

      this.toastr.warningToastr(MESSAGES.GYM_NOT);
      //To load all js for sticky header etc.
      LocalScript.init();
      // unBlockUi();
      this.router.navigateByUrl('/' + ROUTS.HOME_PAGE);
    });
  }

  /**
   * go to top
   */
   goAtStartList(el: HTMLElement) {
    // el.scrollIntoView({behavior: 'smooth'});
    scroll(0, 0);
  }
}
