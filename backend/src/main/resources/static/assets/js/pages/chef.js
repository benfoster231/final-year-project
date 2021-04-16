$(document).ready(function() {
	$('#chefs').dataTable({
		"processing" : true,
		"ordering" : false,
		"serverSide" : true,
		"ajax" : {
			url : context + "panino/chef/list-data",
			dataFilter : function(data) {
				var json = jQuery.parseJSON(data);
				var data = json.data;
				var jsonData = [];
				var count = json.startFrom + 1;
				
				for (var i = 0; i < data.length; i++) {
					var deleteButton = "<span class='col-4'>" +
									   "<a data-toggle=tooltip' data-placement='bottom' title='Delete' href=\"/panino/chef/delete/" + data[i].id+ "\" onclick=\"return confirm('Are you sure want to delete chef?')\">" +
									   "<i class='ft-trash'></i></a>" +
									   "</span>";
					var editButton = "<div><span><a data-toggle=tooltip' data-placement='bottom' title='Edit' href=\"/panino/chef/add?chefId=" + data[i].id + "\"><i class='ft-edit'></i></a></span>";
					var actions = editButton + " " + deleteButton;
					var row = [ count, data[i].firstName, data[i].lastName, data[i].info, data[i].infoEn, actions ];
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
	
	$("#imgInp").cropzee();
	
	
//	$('#type-success').on('click',function(){
//		toastr.success('Have fun storming the castle!', 'Miracle Max Says');
//	});
});


//function chefDeleteConfirmation(id) {
//	if (confirm('Are you sure want to delete chef?')) {
//		$.post("/panino/chef/delete",
//			{
//				chefId : id
//			},
//			function(data, status) {
////				location.reload();
////				toastr.success(data);
//			});
//	} else {
//		//Save nothing
//	}
//	
//}