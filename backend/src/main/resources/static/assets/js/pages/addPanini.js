$( document ).ready(function() {
	
	//Select
	$('#shopDw').on('select2:select', function (e) {
		
		var storeId = e.params.data.id;
		
		addOrRemoveStores(storeId, 'addedStoreId');
	});
	
	//Un-select
	$('#shopDw').on('select2:unselect', function (e) {
		
		var storeId = e.params.data.id;
		addOrRemoveStores(storeId, 'removedStoreId');
	});
	
	searchLocation();
	searchIngredients();
	$("#mainPhoto").cropzee();
	$("#draftImage").cropzee();
	$("#homePhoto").cropzee();
	$("#masteryImage").cropzee();
	
});

function searchLocation() {
	
	$("#searchLocation").on("keyup", function() {
		var value = $(this).val().toLowerCase();
		$(".locationTable .table tbody tr").filter(function() {
			$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
		});
		$(".locationSearchTable .table tbody tr").filter(function() {
			$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
		});
	});
}

function searchIngredients() {
	
	$("#searchIng").on("keyup", function() {
		var value = $(this).val().toLowerCase();
		$(".ingTable .table tbody tr").filter(function() {
			$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
		});
	});
}

/**
 * Add or remove stores
 * @param storeId
 * @param addOrRemoveParam
 * @returns
 */
function addOrRemoveStores(storeId, addOrRemoveParam) {
	
	var formData = $("#editPaninForm").serialize() + '&storeLocations=storeLocations&' + addOrRemoveParam + '=' + parseInt(storeId);
	
	$.ajax({
        type: "POST",
        url: context + 'panino/panini/addOrRemoveLocations',
        data: formData, // serializes the form's elements.
        success: function(data) {

        	$('.addOrRemoveLocations').replaceWith(data);
        	$('.addOrRemoveLocationsForm').replaceWith($('.addOrRemoveLocationsForm').html());
        	searchLocation();
        }
	});
}

/**
 * On file change event
 * @param event
 * @param setToElmId
 * @returns
 */
function onFileChange(event, setToElmId) {
	
	var fileList = event.target.files;
	var file = fileList[0];
	
	var reader = new FileReader();
    reader.onload = function(event) {
      $('#' + setToElmId).attr('src', event.target.result);
      $('#' + setToElmId).closest('.row').show();
    }
    reader.readAsDataURL(file);
}

/**
 * Get chef detail
 * @returns
 */
function getChefDetails(){
	var chefId = document.getElementById("mySelect").value;
	$.ajax ({
		url : context + "panino/panini/chef?chefId=" + chefId,
		success : function(data) {
			CKEDITOR.instances['chef-notes-en'].setData(data.englishInfo);
			CKEDITOR.instances['chef-notes'].setData(data.englishInfo);
//			var json = jQuery.parseJSON(data);
//			var data = json.data;
//			var jsonData = [];
//			json.data = jsonData;
//			return JSON.stringify(json);
		}
	});
}

/**
 * Add or remove ingredient ids
 * @param thisData
 * @param ingredientId
 * @returns
 */
function addRemoveIngredientIds(thisData, ingredientId) {
	
	var selectedIngredientIds = $('#selectedIngredientIds').val();
	selectedIngredientIds = selectedIngredientIds.split(',');
	
	//If add
	if($(thisData).is(':checked')) {
		selectedIngredientIds.push(ingredientId);
	} else {
		
		var index = selectedIngredientIds.indexOf(ingredientId);
		if (index !== -1) {
			selectedIngredientIds.splice(index, 1);
		}
	}
	
	$('#selectedIngredientIds').val(selectedIngredientIds.join());
}

function searchStoreSelect(storeId, thisValue) {
	if(thisValue.checked) {
		addOrRemoveStores(storeId, 'addedStoreId');
		$(thisValue).closest('tr').remove();
    }
}


