$(document).ready(function() {
	getData();
});

/**
 * get list 
 * @returns
 */
function getData(){
	
	$('#userUploadPhoto').dataTable({
		"processing" : true,
		"ordering" : false,
		"serverSide" : true,
		"ajax" : {
			url : "/shopkeeper/user-upload-photo/list-data?approve=" + $('#viewSortList').val(),
			dataFilter : function(data) {
				var json = jQuery.parseJSON(data);
				var data = json.data;
				var jsonData = [];
				var count = json.startFrom + 1;
				
				for (var i = 0; i < data.length; i++) {
					var rejectButton = "";
					var approveButton = "";
					var deleteButton = "";
					
					if(data[i].status != "Rejected"){
						rejectButton = "<span><a class='btn btn-sm' title='Reject' href=\/shopkeeper/user-upload-photo/reject?id="+ data[i].id +"\ ><i class='ft-x'></i></a></span><br/>";
					}
					
					if(data[i].status != "Approved"){
						approveButton = "<span><a class='btn btn-sm' title='Approve' href=\/shopkeeper/user-upload-photo/approve?id="+ data[i].id + "\ ><i class='ft-check'></i></a></span>";
					}
					deleteButton = "<span><a class='btn btn-sm' title='Delete' href=\/shopkeeper/user-upload-photo/delete?id="+ data[i].id + "\ ><i class='ft-trash'></i></a></span>";
					
					var actions = approveButton + "  " + rejectButton + " " + deleteButton;
					var image = "<img id='img-upload' style='height: 135px;' alt='Image' src='/panino/files/getImage?name="+ data[i].imagePath +"'/>";
					var row = [ count, 
						image,
						data[i].concreteStoreName,
						data[i].status,
						getDate(data[i].date),
						data[i].userName,
						actions];
					jsonData.push(row);
					count++;
				}

				json.data = jsonData;
				return JSON.stringify(json);
			}
		}
	});
	
	removeSerch();
}

function removeSerch(){
	$("#userUploadPhoto_filter").addClass("hide");
}
/**
 * get selected list
 */
function getSortList(){
	$("#userUploadPhoto").dataTable().fnDestroy();
	getData();
}