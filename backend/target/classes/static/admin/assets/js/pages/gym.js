$(document).ready(function() {
	submitForm();
	photoGallery();
});

function photoGallery() {
	$('input[name=images]').change(function() { 
		$('#gallery-images').css("display", "none");
	 });
	//$('#photo-gallery-input').change(function(){
	//	$('#gallery-images').css("display", "none");
	//});
}

function viewBlog(id) {
	$.ajax({
        url: context + "gym/" + id,
        success: function(response) {
//            $('#viewUserHolder').html(response);
            $('#add_trainer1').replaceWith(response);
            $('#add_trainer').modal('show');
            initAutocomplete();
            applyPopUpJs();
            submitForm();
            hideInput();
            photoGallery();
            initMap();
        }
    });
}

function hideInput() {
	if($('#img-input').length > 0 ){
		$("#img-input").click(function() {
			$('#image-path').hide();
			$('#image-path1').hide();
		});
		}
}

function submitForm() {
	$("#add-blog-form").submit(function (e) {
        e.preventDefault();
        ajaxSubmitForm();
    });
}

function ajaxSubmitForm() {
	 
    // Get form
    var form = $('#add-blog-form')[0];
 
    var data = new FormData(form);
    
    $("#submitButton").prop("disabled", true);
 
    $.ajax({
        type: "POST",
        enctype: 'multipart/form-data',
        url: context + "gym/addGym",
        data: data,
 
        // prevent jQuery from automatically transforming the data into a query string
        processData: false,
        contentType: false,
        cache: false,
        timeout: 1000000,
        success: function(data, textStatus, jqXHR) {
        	if(data.includes("<!DOCTYPE html>")) {
        		location.reload();
        	} else {
                $('#add_trainer1').replaceWith(data);
                initAutocomplete();
                applyPopUpJs();
                submitForm();
                hideInput();
                photoGallery();
                initMap();
        	}
        },
        error: function(jqXHR, textStatus, errorThrown) {  
 
        	location.reload();
        }
    });
 
}

function openDeleteBlogModal(id) {
	var val = $('#blog_url').attr('href') + id;
	$('#blog_url').attr('href',val);
	var name  = $('#id_'+id).text();
	if (confirm('Delete Gym!, Are you sure want to delete?')) {
		location.href="/gym/delete/"+id;
	} else {
	}


//	$('#delete_training').modal('show');
}

function closeDeleteBlogModal() {
	 $('#add_trainer').modal('hide');
}
function readURL(input) {
	if (input.files && input.files[0]) {
		var reader = new FileReader();
		
		reader.onload = function (e) {
			$('#img-upload').attr('src', e.target.result);
		}
		
		reader.readAsDataURL(input.files[0]);
	} else {
		$('#img-upload').attr('src',"");
	}
}

function applyPopUpJs() {
	if($('.summernote').length > 0) {
		$('.summernote').summernote({
			height: 200,                 // set editor height
			minHeight: null,             // set minimum height of editor
			maxHeight: null,             // set maximum height of editor
			focus: false                 // set focus to editable area after initializing summernote
		});
	}
	$("#img-input").change(function(){
		readURL(this);
	});
	$('.radio-evernote').change(function() {
	    // read the value of the selected radio
	    var value = $(this).val();
	    if(value == 'evernote') {
	    	$('#search-input').css('display','block');
	    } else {
	    	$('#search-input').css('display','none');
	    }
	});
}

function getPath() {
	return 30;
}