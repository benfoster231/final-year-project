$(document).ready(function() {
	
	var latitude;
	var longitude;
	
	$('#city').dataTable({
		"processing" : true,
		"ordering" : false,
		"serverSide" : true,
		"ajax" : {
			url : context + "panino/city/list-data",
			dataFilter : function(data) {
				var json = jQuery.parseJSON(data);
				var data = json.data;
				var jsonData = [];
				var count = json.startFrom + 1;
				
				for (var i = 0; i < data.length; i++) {
					var deleteButton = "<span class='col-4'>" +
									   "<a data-toggle=tooltip' data-placement='bottom' title='Delete' href=\"/panino/city/delete/" + data[i].id+ "\" onclick=\"return confirm('Are you sure want to delete city?')\">" +
									   "<i class='ft-trash'></i></a>" +
									   "</span>";
					var editButton = "<div><span><a data-toggle=tooltip' data-placement='bottom' title='Edit' href=\"/panino/city/add?cityId=" + data[i].id + "\"><i class='ft-edit'></i></a></span>";
					var actions = editButton + " " + deleteButton;
					var row = [ count, data[i].name, actions ];
					jsonData.push(row);
					count++;
				}
				
				json.data = jsonData;
				return JSON.stringify(json);
			}
		}
	});
	
	$("#myform").validate({
	   ignore: ".ignore",
	   errorPlacement: function(error,element) {
		   return true;
	   }
	});
	
});

function plusClick() {
	fieldName = $('#radiusPlusButton').attr('data-field');
	var currentVal = parseFloat($('input[name='+fieldName+']').val());
	if (!isNaN(currentVal)) {
		// Increment
		$('input[name='+fieldName+']').val(currentVal + 0.5);
	} else {
		// Otherwise put a 0 there
		$('input[name='+fieldName+']').val(0);
	}
}

function minusClick() {
    fieldName = $('#radiusMinusButton').attr('data-field');
    var currentVal = parseFloat($('input[name='+fieldName+']').val());
    if (!isNaN(currentVal) && currentVal > 0) {
        // Decrement one
        $('input[name='+fieldName+']').val(currentVal - 0.5);
    } else {
        // Otherwise put a 0 there
        $('input[name='+fieldName+']').val(0);
    }
}

function initMap() {
	latitude = $('#lat').val();
	longitude = $('#longt').val();
	var myLatLng;
	var zoom;
	if(latitude && longitude) {
		myLatLng = {lat: parseFloat(latitude), lng: parseFloat(longitude)};
		zoom = 10;
	} else {
		myLatLng = {lat: -33.8688, lng: 151.2195};
		zoom = 13;
	}
    var map = new google.maps.Map(document.getElementById('map'), {
      center: myLatLng,
      zoom: zoom
    });
    var card = document.getElementById('pac-card');
    
    //Restrict search
    var options = {
	  types: ['(cities)']
//	  componentRestrictions: {country: "IN"}
    };

    var input = document.getElementById('pac-input');
    var types = document.getElementById('type-selector');
    var strictBounds = document.getElementById('strict-bounds-selector');

    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(card);

    var autocomplete = new google.maps.places.Autocomplete(input, options);

    // Bind the map's bounds (viewport) property to the autocomplete object,
    // so that the autocomplete requests use the current map bounds for the
    // bounds option in the request.
    autocomplete.bindTo('bounds', map);

    // Set the data fields to return when the user selects a place.
    autocomplete.setFields(
        ['address_components', 'geometry', 'icon', 'name']);

    var infowindow = new google.maps.InfoWindow();
    var infowindowContent = document.getElementById('infowindow-content');
    infowindow.setContent(infowindowContent);
    var marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      anchorPoint: new google.maps.Point(0, -29)
    });

    if(latitude && longitude) {
    	calcRadius(marker, map, $('#radiusInput').val() * 10000);
    }
    //place changed listner
    autocomplete.addListener('place_changed', function() {
    	
	      infowindow.close();
	      marker.setVisible(false);
	      var place = autocomplete.getPlace();
	      if (!place.geometry) {
	        // User entered the name of a Place that was not suggested and
	        // pressed the Enter key, or the Place Details request failed.
	        window.alert("No details available for input: '" + place.name + "'");
	        return;
	      }
	
	      // If the place has a geometry, then present it on a map.
	      if (place.geometry.viewport) {
	        map.fitBounds(place.geometry.viewport);
	      } else {
	        map.setCenter(place.geometry.location);
	        map.setZoom(17);  // Why 17? Because it looks good.
	      }
	      marker.setPosition(place.geometry.location);
	      marker.setVisible(true);
	
	      latitude = place.geometry.location.lat();
	      longitude = place.geometry.location.lng();
		  $('#lat').val(latitude);
		  $('#longt').val(longitude);
	      
	       var componentForm = {
	    		  street_number: 'short_name',
	    		  route: 'long_name',
	    		  locality: 'long_name',
	    		  administrative_area_level_1: 'short_name',
	    		  country: 'long_name',
	    		  postal_code: 'short_name'
	    		};
	 		for (var i = 0; i < place.address_components.length; i++) {
	             var addressType = place.address_components[i].types[0];
	              if (componentForm[addressType]) {
	               var val = place.address_components[i][componentForm[addressType]];
	//	               document.getElementById(addressType).value = val;
					$('#'+addressType).val(val);
	             } 
	          }
	      var addr = '';
	      if (place.address_components) {
	        address = [
	          (place.address_components[0] && place.address_components[0].short_name || ''),
	          (place.address_components[1] && place.address_components[1].short_name || ''),
	          (place.address_components[2] && place.address_components[2].short_name || '')
	        ].join(' ');
	      }
	
	      infowindowContent.children['place-icon'].src = place.icon;
	      infowindowContent.children['place-name'].textContent = place.name;
	      infowindowContent.children['place-address'].textContent = address;
	      infowindow.open(map, marker); 
    });
    
    document.getElementById("radiusMinusButton").addEventListener("click", function(){
    	minusClick();
    	var input = $('#radiusInput').val();
    	calcRadius(marker, map, input * 10000);
    });
    document.getElementById("radiusPlusButton").addEventListener("click", function(){
    	plusClick();
    	var input = $('#radiusInput').val();
    	calcRadius(marker, map, input * 10000);
    });
}

function calcRadius(marker, map, radiusVal) {
	
    var lat = latitude;
	var longt = longitude;
	if(radius != 0) {
		cityCircle.setMap(null);
	}
	radius = radiusVal;
	var circleOptions = {
       strokeColor: '#FF0000',
       strokeOpacity: 0.8,
       strokeWeight: 2,
       fillColor: '#FF0000',
       fillOpacity: 0.35,        
       center: new google.maps.LatLng(lat, longt),
       map: map,
       radius: radiusVal
	};  
   
	cityCircle = new google.maps.Circle(circleOptions);
}


