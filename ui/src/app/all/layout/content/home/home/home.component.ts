import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CONSTANTS, ROUTS } from 'src/app/all/constants/constants';
import { CustomJs } from 'src/app/all/constants/customJs';
import { HttpRepository } from 'src/app/all/repositorys/http.repository';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ManageCookieService } from 'src/app/all/services/manage-cookie.service';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'src/app/all/model/gmap/address';

//To run jquery
declare var google: any;
declare var $:any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public lattitude: string = CONSTANTS.LATITUDE;
  public longitude: string = CONSTANTS.LONGITUDE;
  placeholder: string = "search city"
  keyword = 'name';
  public citySearch:boolean = false;
  public cities = [];
  search ='';

  uptoLocationValues: any[];
  tagLinesValues: any[];
  // tagLineLabels: NameLabelModel[] = [];
  public mapOptions: any = {
    types: []
  };

  constructor(private router: Router, 
    private httpRepository: HttpRepository,
    private toastr: ToastrManager,
    public manageCookieService: ManageCookieService) { }

  @ViewChild("placesRef") placesRef: GooglePlaceDirective;

  ngOnInit(): void {
    CustomJs.init();
    this.saveLatLong();
  }

  /**
   * save lat long to local storege 
   */
   saveLatLong() {
    
    this.manageCookieService.setCookie(CONSTANTS.LAT, this.lattitude);
    this.manageCookieService.setCookie(CONSTANTS.LONG, this.longitude);
  }
  /**
   * Handle google place api change event
   */
  public locationChangeEvent(address: Address) {

    // location: address.formatted_address,
    this.lattitude =  address.geometry.location.lat().toString();
    this.longitude = address.geometry.location.lng().toString();
    this.citySearch = true;
    this.search = address.name;
  }

  /**
   * deselect city
   */
   DeSelectEvent() {
    this.citySearch = false;
  }

  /**
   * when search by city 
   */
  searchByCity() {

    this.router.navigateByUrl('/' + ROUTS.LIST_PAGE + '?lat=' + this.lattitude  + '&long=' + this.longitude +'&citySearch=' + this.citySearch +'&search=' + this.search);
  }
  
  /**
   * get current Location 
   */
  setCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.displayLocationInfo.bind(this));
    }
  }
  
  /**
   * get home page data according to current Location
   * @param position 
   */
  displayLocationInfo(position) {

    this.citySearch = false;
    let lng: string = position.coords.longitude;
    let lat: string = position.coords.latitude;
    this.lattitude = lat.toString();
    this.longitude = lng.toString();

    this.router.navigateByUrl('/' + ROUTS.LIST_PAGE + '?lat=' + this.lattitude  + '&long=' + this.longitude + '&citySearch=' + this.citySearch );
  }

}
