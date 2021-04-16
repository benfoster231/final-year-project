$(document).ready(function() {
	
	$('#ingredients').dataTable({
		"processing" : true,
		"ordering" : false,
		"serverSide" : true,
		"ajax" : {
			url : context + "panino/ingredients/list-data",
			dataFilter : function(data) {
				var json = jQuery.parseJSON(data);
				var data = json.data;
				var jsonData = [];
				var count = json.startFrom + 1;
				
				for (var i = 0; i < data.length; i++) {
					var deleteButton = "<span class='col-4' style=' display: inline-block';>" +
									   "<a data-toggle=tooltip' data-placement='bottom' title='Delete' href=\"/panino/ingredients/delete/" + data[i].id+ "\" onclick=\"return confirm('Are you sure want to delete source?')\">" +
									   "<i class='ft-trash'></i></a>" +
									   "</span>";
					var editButton = "<div><span style=' display: inline-block';><a data-toggle=tooltip' data-placement='bottom' title='Edit' href=\"/panino/ingredients/add?ingredientId=" + data[i].id + "\"><i class='ft-edit'></i></a></span>";
					var actions = editButton + " " + deleteButton;
					var row = [ count, 
						data[i].ingredientName.name,
						data[i].ingredientName.nameEn,
						data[i].source.name,
						data[i].ingredientName.lkCodeIngredienttype, 
						actions ];
					jsonData.push(row);
					count++;
				}

				json.data = jsonData;
				return JSON.stringify(json);
			}
		}
	});
	
	$("#imgInp").change(function(){
		readURL(this);
	});
	
});

/**
 * Read url
 * @param input
 * @returns
 */
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

/**
 * On file change event
 * @param event
 * @param setToElmId
 * @returns
 */
function onFileChange(event) {
	
	var fileList = event.target.files;
	var file = fileList[0];
	
	var reader = new FileReader();
    reader.onload = function(event) {
      $('#photoImg').attr('src', event.target.result);
      $('#photoImg').closest('.row').show();
    }
    reader.readAsDataURL(file);
}