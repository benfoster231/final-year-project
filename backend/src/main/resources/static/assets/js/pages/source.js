$(document).ready(function() {
	
	$('#source').dataTable({
		"processing" : true,
		"ordering" : false,
		"serverSide" : true,
		"ajax" : {
			url : context + "panino/source/list-data",
			dataFilter : function(data) {
				var json = jQuery.parseJSON(data);
				var data = json.data;
				var jsonData = [];
				var count = json.startFrom + 1;
				
				for (var i = 0; i < data.length; i++) {
					var deleteButton = "<span class='col-4'>" +
									   "<a data-toggle=tooltip' data-placement='bottom' title='Delete' href=\"/panino/source/delete/" + data[i].id+ "\" onclick=\"return confirm('Are you sure want to delete source?')\">" +
									   "<i class='ft-trash'></i></a>" +
									   "</span>";
					var editButton = "<div><span><a data-toggle=tooltip' data-placement='bottom' title='Edit' href=\"/panino/source/add?sourceId=" + data[i].id + "\"><i class='ft-edit'></i></a></span>";
					var actions = editButton + " " + deleteButton;
					var row = [ count, data[i].name , actions ];
					jsonData.push(row);
					count++;
				}

				json.data = jsonData;
				return JSON.stringify(json);
			}
		}
	});
	
});
	