import { Injectable } from '@angular/core';
import { CONSTANTS } from '../constants/constants';
import { Any } from 'json2typescript';

declare var google: any;
declare var MarkerClusterer:any;

export class MapMarker {
  lat: number;
  lng: number;
  infoText: string;
  extraData: any;
  icon: string;
  centerLat:number;
  centerLog:number;
}

@Injectable({
  providedIn: 'root'
})
export class ManageMapService {

  constructor() { }

  markers: any = [];

  public dataModelVars = {
    city: '',
    state: '',
    country: '',
    postCode: '',
    lat: '',
    lng: ''
  }

  /**
   * This is the base component where map instance is created
   */
  private baseComponentInstance: any;

  /**
   * Initialize map
   * @param map 
   * @param gmapElement 
   */
  init(baseComponentInstance: any) {

    this.baseComponentInstance = baseComponentInstance;

    // var bounds = new google.maps.LatLngBounds();
    var mapProp = {
      center: new google.maps.LatLng(CONSTANTS.AUSTRALIA_MAP_LAT_LNG.lat, CONSTANTS.AUSTRALIA_MAP_LAT_LNG.lng),
      zoom: 20,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.baseComponentInstance.map = new google.maps.Map(this.baseComponentInstance.gmapElement.nativeElement, mapProp);
    this.baseComponentInstance.map.setCenter(new google.maps.LatLng(CONSTANTS.AUSTRALIA_MAP_LAT_LNG.lat, CONSTANTS.AUSTRALIA_MAP_LAT_LNG.lng));

    this.markers = [];
    // let mapLocation = new google.maps.LatLng(CONSTANTS.AUSTRALIA_MAP_LAT_LNG.lat, CONSTANTS.AUSTRALIA_MAP_LAT_LNG.lng);

    // let marker = new google.maps.Marker({
    //   position: mapLocation,
    //   map: this.baseComponentInstance.map,
    //   title: 'Got you!'
    // });

  }

  /**
   * Set multiple markers on map
   */
  setMarkers(mapMarkers: MapMarker[], isBoundAllMarkersAtView: boolean, isDraggable: boolean) {

    var bounds = new google.maps.LatLngBounds();

    for (let index = 0; index < mapMarkers.length; index++) {

      let mapMarker = mapMarkers[index];
      var position = new google.maps.LatLng(Number(mapMarker.lat), Number(mapMarker.lng));

      if(isBoundAllMarkersAtView)
        bounds.extend(position);

      let marker;

      if(isDraggable) {
        marker = new google.maps.Marker({
          position: position,
          map: this.baseComponentInstance.map,
          icon: 'assets/css/images/'+ mapMarker.icon,
          draggable: true,
          animation: google.maps.Animation.DROP,
          customInfo: "Marker A"
        });

        this.applyDragDropEvent(marker);
      } else {
        marker = new google.maps.Marker({
          position: position,
          map: this.baseComponentInstance.map,
          icon: 'assets/css/images/'+ mapMarker.icon,
          animation: google.maps.Animation.DROP
        });

      }
        
      let infowindow = new google.maps.InfoWindow({ content: mapMarker.infoText});
      marker.addListener('click', () => {

        //When external info text not present then go with current info text
        if('mapMarkerCallback' in this.baseComponentInstance) {
        // if(typeof this.baseComponentInstance.mapMarkerCallback() !== undefined) {
          this.baseComponentInstance.mapMarkerCallback(mapMarker.extraData, marker);
        } else {

          //When there is no method in basecomponent
          infowindow.open(this.baseComponentInstance.map, marker);
        }
      });

      marker.setMap(this.baseComponentInstance.map);

      if(isBoundAllMarkersAtView) {
        // Automatically center the map fitting all markers on the screen
        if(mapMarker.centerLat !== undefined || mapMarker.centerLog !== undefined){
          
          this.baseComponentInstance.map.setCenter(new google.maps.LatLng(mapMarker.centerLat, mapMarker.centerLog));
          this.baseComponentInstance.map.setZoom(10);

        } else {
          this.baseComponentInstance.map.fitBounds(bounds);
          var map:any = this.baseComponentInstance.map;
          var listener = google.maps.event.addListener(this.baseComponentInstance.map, "idle", function() { 
            
            if (map.getZoom() > 15) map.setZoom(15); 
            google.maps.event.removeListener(listener); 
          });
          
        }
        
        
      } else {
        // this.baseComponentInstance.map.setZoom(1);
        this.baseComponentInstance.map.setCenter(marker.getPosition());
      }

      this.markers.push(marker);
    }
    var mcOptions = {
      gridSize: 40,
      styles: [
              {
                  height: 52,
                  width: 52,
                  textColor: '#fff'
              }
      ]
  };
    // Add a marker clusterer to manage the markers.
    var markerCluster = new MarkerClusterer(this.baseComponentInstance.map, this.markers, mcOptions);
  }

  /**
   * Apply drag and drop event
   * @param marker 
   */
  applyDragDropEvent(marker: any) {

    google.maps.event.addListener(marker, "dragend", (e) => {
      var lat, lng, address;
      new google.maps.Geocoder().geocode({ 'latLng': marker.getPosition() }, (results, status) => {
          if (status == google.maps.GeocoderStatus.OK) {
              lat = marker.getPosition().lat();
              lng = marker.getPosition().lng();
              address = results[0].address_components;

              let basicInfoJson = this.getBasicInfos(address);
              this.setFormValues(basicInfoJson.city, basicInfoJson.state, basicInfoJson.country, basicInfoJson.postCode, lat.toString(), lng.toString());
          }
      });
    });
  }

  /**
   * Set single marker to map
   * @param lattitude 
   * @param longitude 
   */
  setMarker(lattitude: number, longitude: number, infoText: string, isDraggable: boolean) {

    let mapMarkers : MapMarker[] = [];
    let mapMarker: MapMarker = new MapMarker();
  //   let mapMarker: MapMarker = new google.maps.Marker({
  //     icon: '/assets/img/markers/default.png',
  //     optimized:false
  //  });
    mapMarker.lat = lattitude;
    mapMarker.lng = longitude;
    mapMarker.infoText = infoText;
    mapMarkers.push(mapMarker);
    this.removeAllMarkers();
    this.setMarkers(mapMarkers, false, isDraggable);
  }

  /**
   * Remove all markers from map
   */
  removeAllMarkers() {
    //Loop through all the markers and remove
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(null);
    }
    this.markers = [];
  }

  /**
   * Initialize form all fields
   */
  initForm() {

    this.dataModelVars = {
      city: '',
      state: '',
      country: '',
      postCode: '',
      lat: '',
      lng: ''
    }
  }

  /**
   * Set form values
   */
  setFormValues(city: string, state: string, country: string, postCode: string, lat: string, lng: string) {

    this.dataModelVars = {
      city: city,
      state: state,
      country: country,
      postCode: postCode,
      lat: lat,
      lng: lng
    }
  }

  /**
   * Get city, state, country, postcode 
   */
  getBasicInfos(addressArray) : any {

    if (addressArray.length == 0) return false;
    let address = addressArray;

    let basicInfoJson = {
      'city' : '',
      'state' : '',
      'country' : '',
      'postCode' : ''
    }
    
    for (let element of address) {
      if (element.length == 0 && !element['types']) continue

      //City
      if (element['types'].indexOf('locality') > -1) {
        basicInfoJson['city'] = element['long_name'];
        continue;
      }

      //State
      if (element['types'].indexOf('administrative_area_level_1') > -1) {
        basicInfoJson['state'] = element['long_name'];
        continue;
      }

      //Country
      if (element['types'].indexOf('country') > -1) {
        basicInfoJson['country'] = element['long_name'];
        continue;
      }

      //Postcode
      if (element['types'].indexOf('postal_code') > -1) {
        basicInfoJson['postCode'] = element['long_name'];
        continue;
      }
    }

    return basicInfoJson;
  }
}