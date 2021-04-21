// This sample uses the Places Autocomplete widget to:
// 1. Help the user select a place
// 2. Retrieve the address components associated with that place
// 3. Populate the form fields with those address components.
// This sample requires the Places library, Maps JavaScript API.
// Include the libraries=places parameter when you first load the API.
// For example: <script
// src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
let autocomplete;
let address1Field;
let address2Field;
let postalField;
let marker;

function initMap() {
	let myLatLng;
  if($("#latitude").val() && $("#longitude").val()) {
  	myLatLng = { lat: parseFloat($("#latitude").val()), lng: parseFloat($("#longitude").val()) };
  } else {
  	myLatLng = { lat: 39.468085214027866, lng: -101.896103125 };
  }
  
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: myLatLng,
  });
  marker = new google.maps.Marker({
    position: myLatLng,
    map,
    draggable: true,
    animation: google.maps.Animation.DROP,
  });
  google.maps.event.addListener(marker, 'dragend', function() {
    geocodePosition(marker.getPosition());
  });
}

function geocodePosition(pos) {
	$("#latitude").val(marker.getPosition().lat());
  	$("#longitude").val(marker.getPosition().lng());
}

function toggleBounce() {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}

function initAutocomplete() {
  address1Field = document.querySelector("#ship-address");
  //address2Field = document.querySelector("#address2");
  postalField = document.querySelector("#postcode");
  // Create the autocomplete object, restricting the search predictions to
  // addresses in the US and Canada.
  autocomplete = new google.maps.places.Autocomplete(address1Field, {
    fields: ["address_components", "geometry"],
    types: ["address"],
  });
  address1Field.focus();
  // When the user selects an address from the drop-down, populate the
  // address fields in the form.
  autocomplete.addListener("place_changed", fillInAddress);
}

function getAddressFromComponents(geo) {
    const streetNumber = geo.find( g => g.types.find( t => t === 'street_number') ).long_name;
    const streetName = geo.find( g => g.types.find( t => t === 'route' )).long_name;
    const cityName = geo.find( g => g.types.find( t => t === 'locality') && g.types.find( t => t === 'political' )).long_name;
    const stateName = geo.find( g => g.types.find( t => t === 'administrative_area_level_1') && g.types.find( t => t === 'political' ))
      .long_name;
    const countryName = geo.find( g => g.types.find( t => t === 'country') && g.types.find( t => t === 'political' )).long_name;
    const zip = geo.find( g => g.types.find( t => t === 'postal_code' )).long_name;

    return {
      address: `${streetNumber} ${streetName}`,
      city: cityName,
      state: stateName,
      country: countryName,
      postalCode: zip
    };
  }

function fillInAddress() {
  // Get the place details from the autocomplete object.
  const place = autocomplete.getPlace();
  $("#latitude").val(place.geometry.location.lat());
  $("#longitude").val(place.geometry.location.lng());
  const myLatLng = { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() };
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: myLatLng,
  });
  marker = new google.maps.Marker({
    position: myLatLng,
    map,
    draggable: true,
    animation: google.maps.Animation.DROP,
  });
  google.maps.event.addListener(marker, 'dragend', function() {
    geocodePosition(marker.getPosition());
  });
  let address1 = "";
  let postcode = "";

  // Get each component of the address from the place details,
  // and then fill-in the corresponding field on the form.
  // place.address_components are google.maps.GeocoderAddressComponent objects
  // which are documented at http://goo.gle/3l5i5Mr
  for (const component of place.address_components) {
    const componentType = component.types[0];

    switch (componentType) {
      case "street_number": {
        address1 = `${component.long_name} ${address1}`;
        break;
      }

      case "route": {
        address1 += component.short_name;
        break;
      }

      case "postal_code": {
        postcode = `${component.long_name}${postcode}`;
        break;
      }

      case "postal_code_suffix": {
        postcode = `${postcode}-${component.long_name}`;
        break;
      }
      case "locality":
        document.querySelector("#locality").value = component.long_name;
        break;

      case "administrative_area_level_1": {
        document.querySelector("#state").value = component.short_name;
        break;
      }
      case "country":
        document.querySelector("#country").value = component.long_name;
        break;
    }
    
//    address1 = this.getAddressFromComponents(place.address_components);
  }
  address1Field.value = address1;
  postalField.value = postcode;
  // After filling the form with address components from the Autocomplete
  // prediction, set cursor focus on the second address line to encourage
  // entry of subpremise information such as apartment, unit, or floor number.
  //address2Field.focus();
}