$(document).ready(function() {
	submitForm();
});

function viewBook(id) {
	$.ajax({
        url: context + "admin/book/" + id,
        success: function(response) {
//            $('#viewUserHolder').html(response);
            $('#add_book1').replaceWith(response);
            $('#add_book').modal('show');
            applyPopUpJs();
            submitForm();
            hideInput();
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
        url: context + "admin/book",
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
                $('#add_book1').replaceWith(data);
                applyPopUpJs();
                submitForm();
                hideInput();
        	}
        },
        error: function(jqXHR, textStatus, errorThrown) {  
 
        	location.reload();
        }
    });
 
}

function openDeleteBookModal(id) {
	var val = $('#blog_url').attr('href') + id;
	$('#blog_url').attr('href',val);
	var name  = $('#id_'+id).text();
	$('#delete_training').modal('show');
}

function closeDeleteBookModal() {
	$('#add_book').modal('hide');
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
	$('#autocomplete').autocomplete({
		serviceUrl: context + 'admin/suggestion',
	    paramName: 'searchstr',
	    minChars: 1,
	    appendTo : '#clinic-suggestions',
	    transformResult: function(response) {
	    	
	    	response = JSON.parse(response);
	    	
	        return {
	            suggestions: $.map(response, function(dataItem) {
	            	return { value: dataItem.title, data: dataItem.guid };
//	                return { value: dataItem.firstName };
	            })
	        };
	    },
	    onSelect: (suggestion) => {
	    	blockDiv($('#add_book'));
	    	$.ajax({
	            url: context + "admin/getEvernoteBookById/" + suggestion.data,
	            success: function(response) {
	            	
	                $('#add_book1').replaceWith(response);
	                applyPopUpJs();
	                submitForm();
	                hideInput();
	            	unBlockDiv($('#add_book'));
	            }
	        });
	    	
        }
	});
}
