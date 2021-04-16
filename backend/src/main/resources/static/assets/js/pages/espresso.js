$(document).ready(function() {
	
	$("#imgInp").cropzee();
});
/**
 * On file change event
 * @param event
 * @param setToElmId
 * */
function onFileChange(event) {
	
	var fileList = event.target.files;
	var file = fileList[0];
	
	var reader = new FileReader();
    reader.onload = function(event) {
      $('#imgInp').attr('src', event.target.result);
      $('#imgInp').closest('.row').show();
    }
    reader.readAsDataURL(file);
}

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
		$('.isEdite').remove();
	} else {
		$('#img-upload').attr('src',"");
	}
	$('#img-upload').addClass("image-size");
	
}

