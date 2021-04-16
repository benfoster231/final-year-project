$(document).ready(function() {
	getData();
});

/**
 * get list 
 * @returns
 */
function getData(){
	
	$('#shopreview').dataTable({
		"processing" : true,
		"ordering" : false,
		"serverSide" : true,
		"ajax" : {
			url : "/panino/shop-review/list-data?approve=" + $('#viewSortList').val(),
			dataFilter : function(data) {
				var json = jQuery.parseJSON(data);
				var data = json.data;
				var jsonData = [];
				var count = json.startFrom + 1;
				
				for (var i = 0; i < data.length; i++) {
					
					var reject = " ";
					var approve = " ";
					
					if(data[i].approve != false)
						reject = "<span><a class='btn btn-sm' title='Reject' href=\"/panino/shop-review/reject?id="+ data[i].id+ "\" ><i class='ft-x'></i></a></span>";
					
					if(data[i].approve != true)
						approve = "<span><a class='btn btn-sm' title='Approve' href=\"/panino/shop-review/approve?id="+ data[i].id+ "\" ><i class='ft-check'></i></a></span>";
					
					var deleteButton = "<span><a class='btn btn-sm' title='Delete' onclick='deleteReview(" + data[i].id + ")' href=\"/panino/shop-review/delete?id="+ data[i].id + "\" ><i class='ft-trash'></i></a></span>";
					
					var actions =  approve + "</br>" + reject + "</br>" + deleteButton;
					
					var star = "";
					var k = data[i].rating;
					
					for(var j = 0; j < 5;j++){
						
						if(j<k){
//							star = star + "<img src='/assets/images/ico/goldStar.png' class='menuicon'/>";
							star = star + "<span style='color: orange;' class='fa fa-star'></span>";
						}else{
//							star = star + "<img src='/assets/images/ico/whiteStar.png' class='menuicon'/>";
							star = star + "<span class='fa fa-star'></span>";
						}
						
					}
					
					var rating = "<span style='float:left;width: 90px;'>" + star + "</span>";
					
					var row = [ count, 
						data[i].status,
						data[i].storeName,
						getDate(data[i].date),
						data[i].userName,
						rating, 
						actions];
					jsonData.push(row);
					count++;
				}

				json.data = jsonData;
				return JSON.stringify(json);
			}
		}
	});
	
}
/**
 * get selected list
 */
function getSortList(){
	$("#shopreview").dataTable().fnDestroy();
	getData();
}

/**
 * Delete review
 * @param url
 * @returns
 */
function deleteReview(url) {
	
	var isConfirm = confirm("Are you sure want to delete?");
	
	if(isConfirm == true) {
		location.href = url;
	}
}