var MAX_FILE_UPLOAD_SIZE_LIMIT = 4000000
var deleteImageIds = [];

$(document).ready(function() {
	$('#expresso').dataTable({
		"processing" : true,
	});
	$('#salespoint').dataTable({
		"processing" : true,
	});
	
	if($('#notSaveForm').length > 0){
		$('#notSaveForm').submit();
	}
	
	$('#stores').dataTable({
		"processing" : true,
		"ordering" : false,
		"serverSide" : true,
		"ajax" : {
			url : context + "panino/store/list-data",
			dataFilter : function(data) {
				var json = jQuery.parseJSON(data);
				var data = json.data;
				var jsonData = [];
				var count = json.startFrom + 1;
				
				for (var i = 0; i < data.length; i++) {
					
					var deleteButton = "<span class='col-4'>" +
					"<a data-toggle=tooltip' data-placement='bottom' title='Delete' href=\"/panino/store/delete/" + data[i].id+ "\" onclick=\"return confirm('Are you sure want to delete Store?')\">" +
					"<i class='ft-trash'></i></a>" +
					"</span>";
					var editButton = "<div><span><a data-toggle=tooltip' data-placement='bottom' title='Edit' href=\"/panino/store/add?storeId=" + data[i].id + "\"><i class='ft-edit'></i></a></span>";
					var actions = editButton + " " + deleteButton;
					var row = [ count, data[i].id, data[i].concreteName,data[i].city, data[i].address,data[i].website,actions ];
					jsonData.push(row);
					count++;
				}
				
				json.data = jsonData;
				return JSON.stringify(json);
			}
		}
	});
	
	function readURL(input) {
		if (input.files && input.files[0]) {
			var reader = new FileReader();
			
			reader.onload = function (e) {
				$('.imgdisplaydiv').show();
				$('#img-upload').attr('src', e.target.result);
			}
			
			reader.readAsDataURL(input.files[0]);
		} else {
			$('#img-upload').attr('src',"");
		}
		$('#img-upload').addClass("image-size");
	}
	
	if($('#imgInp').length > 0){
		$('#imgInp').cropzee();
	};
	
});

/**
 * On file change event
 * @param event
 * @param setToElmId
 * @returns
 */
function onFileChange(event) {
	
	var fileList = event.target.files;

	if (fileList.length < 1) {
	  return;
	}
	
	//Remove old selected images from view
	$('#imageAppendDiv').find('.copyImageDiv').remove();
	
	for (var index = 0; index < fileList.length; index++) {
	
	  var file = fileList[index];
	
	  // Check is file already selected
//	  if (this.checkFileAlreadySelected(file)) {
//	    continue;
//	  }
	
	  // Add file to list
	  if (file.size > MAX_FILE_UPLOAD_SIZE_LIMIT) {
		  //Show toaster error message with image name about max size exceded
		  continue;
	  }
	
	  var reader = new FileReader();
	  reader.onload = function(event) {
		  var imageUrl = event.target.result;
		  var copyImageElm = $("#copyImageElm").clone();
		  
		  $(copyImageElm).removeAttr('id');
		  $(copyImageElm).removeClass('hide');
		  
		  $(copyImageElm).find('img').attr('src', imageUrl);
		  $(copyImageElm).appendTo("#imageAppendDiv");
	  }
	  reader.readAsDataURL(file);
	}
}

function removeImage(thisData, id, isEditMode) {
	
	//Check if edit then take id and set to hidden input to manage previously selected image is deleted
	if(isEditMode) {
		
		//Edit mode
		deleteImageIds.push(id);
		$('#imageIds').val(deleteImageIds);
	}
	
	$(thisData).closest('label').remove();
}

function initMap() {
	var lat = $('#lat').val();
	var longt = $('#longt').val();
	var myLatLng;
	var zoom;
	if(lat && longt) {
		myLatLng = {lat: parseFloat(lat), lng: parseFloat(longt)};
		zoom = 17;
	} else {
		myLatLng = {lat: -33.8688, lng: 151.2195};
		zoom = 13;
	}
    var map = new google.maps.Map(document.getElementById('map'), {
      center: myLatLng,
      zoom: zoom
    });
    var card = document.getElementById('pac-card');
    var input = document.getElementById('pac-input');
    var types = document.getElementById('type-selector');
    var strictBounds = document.getElementById('strict-bounds-selector');

    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(card);

    var autocomplete = new google.maps.places.Autocomplete(input);

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

      var latitude = place.geometry.location.lat();
      var longitude = place.geometry.location.lng();
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
    
    // Add click event listenecal
//    calcRadius(marker, map, 60000);
}

function importFileChange() {
	if( document.getElementById("importFile").value.toLowerCase().lastIndexOf(".xls")==-1 && document.getElementById("importFile").value.toLowerCase().lastIndexOf(".xlsx")==-1) {
        alert("Please upload a file with .xlsx or .xls extension.");
        return false;
	} else {
		if (confirm('Are you sure you want to import this file?')) {
			$("#importFileForm").submit();  
		} else {
			$("#importFile").val('');
		}
	}
	
}
