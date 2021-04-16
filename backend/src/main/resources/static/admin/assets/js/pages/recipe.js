$(document).ready(function() {
	submitForm();
});

function viewBlog(id) {
	$.ajax({
        url: context + "admin/recipe/" + id,
        success: function(response) {
//            $('#viewUserHolder').html(response);
            $('#add_recipe1').replaceWith(response);
            $('#add_recipe').modal('show');
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
        url: context + "admin/recipe",
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
                $('#add_recipe1').replaceWith(data);
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

function openDeleteBlogModal(id) {
	var val = $('#blog_url').attr('href') + id;
	$('#blog_url').attr('href',val);
	var name  = $('#id_'+id).text();
	$('#delete_training').modal('show');
}

function closeDeleteBlogModal() {
	$('#add_recipe').modal('hide');
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
	// Select 2
	if($('.select').length > 0) {
		$('.select').select2({
			minimumResultsForSearch: -1,
			width: '100%'
		});
	}
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
	    } else if(value == 'default') {
	    	$('#search-input').css('display','none');
	    } else if(value == 'evernoteList') {
	    	blockDiv($('#add_recipe'));
	    	$('#list-input').css('display','none');
	    	$.ajax({
	            url: context + "admin/recipe/getAllEvernoteRecipies",
	            success: function(response) {
	                $('#add_recipe1').replaceWith(response);
	            	$('#search-input').css('display','block');
	    	    	unBlockDiv($('#add_recipe'));
	                applyPopUpJs();
	                submitForm();
	                hideInput();
	                addAllEvernoteRecipes();
	            }
	        });
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
	    	blockDiv($('#add_recipe'));
	    	$.ajax({
	            url: context + "admin/getRecipeEvernoteById/" + suggestion.data,
	            success: function(response) {
	            	
	                $('#add_recipe1').replaceWith(response);
	                applyPopUpJs();
	                submitForm();
	                hideInput();
	            	
//	            	$('#blog-title').val(response.title);
//	            	$('.summernote').summernote('code', response.description);
//	            	$('#image-path').val(response.imagePath);
//	            	$('#image-path1').val(response.imagePath);
//	            	$('#image-path1').css('display','block');
	            	unBlockDiv($('#add_recipe'));
//	                $('#add_trainer1').replaceWith(response);
//	                $('#add_trainer').modal('show');
//	                applyPopUpJs();
//	                submitForm();
//	                hideInput();
	            }
	        });
	    	
	        // $('#clinicIdHiddenInput').val(suggestion.data);
//	        let duplicate: boolean = false;
//	        if(this.userDetailResponse2) {
//	          this.userDetailResponse2.forEach(element => {
//	            if(element.userId === suggestion.data) {
//	              duplicate = true;
//	              this.toastr.warningToastr(element.firstName + " " + element.lastName + " already selected.");
//	            }
//	          });
//	        }
//	        if(!duplicate)
//	          this.onSelect(suggestion.data);
//	        this.form.get('authorName').setValue("");
//	        return;
	        // $('#clinic-search').val(suggestion.value);
        }
	});
}

function addAllEvernoteRecipes() {
	if($('#img-input').length > 0 ){
		$("#img-input").click(function() {
			$('#image-path').hide();
			$('#image-path1').hide();
		});
	}
}

function submitEvernoteRecipes() {
	blockDiv($('#add_recipe'));
	$.ajax({
		type: "POST",
        url: context + "admin/saveEvernoteRecipes",
        success: function(response) {
        	$('#add_recipe').modal('show');
        	unBlockDiv($('#add_recipe'));
        	toastr["success"](response);
        }
    });
}
