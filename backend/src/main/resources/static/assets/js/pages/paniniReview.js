$(document).ready(function() {
	
	getData();
});

/**
 * get sortlisted details 
 */
function getSortList(){
	$("#paninireview").dataTable().fnDestroy();
	getData();
	
 }

/**
 * get list data
 */
function getData(){
	$('#paninireview').dataTable({
		"processing" : true,
		"ordering" : false,
		"serverSide" : true,
		"ajax" : {
			url : "/panino/panini-review/list-data?approve=" + $('#viewSortList').val(),
			dataFilter : function(data) {
				var json = jQuery.parseJSON(data);
				var data = json.data;
				var jsonData = [];
				var count = json.startFrom + 1;
				 
				for (var i = 0; i < data.length; i++) {
					var reject = " ";
					var approve = " ";
					
					if(data[i].approve != false)
						reject = "<span><a class='btn btn-sm' title='Reject' href=\"/panino/panini-review/reject?id="+ data[i].id+ "\"><i class='ft-x'></i></a></span>";
					
					if(data[i].approve != true)
						approve = "<span><a class='btn btn-sm' title='Approve' href=\"/panino/panini-review/approve?id="+ data[i].id+ "\" ><i class='ft-check'></i></a></span>";
					
					var deleteButton = "<span><a class='btn btn-sm' title='Delete' onclick='deleteReview(" + data[i].id + ")' href=\"/panino/panini-review/delete?id="+ data[i].id + "\" ><i class='ft-trash'></i></a></span>";
					
					var actions = approve + "</br> " + reject + "</br>" + deleteButton;
					
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
					
					var rating = "<div style='float:left;width: 90px;'>" + star + "</div>";
					
					var row = [ count, 
						data[i].status,
						data[i].paninoName,
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