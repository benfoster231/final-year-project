$(document).ready(function() {
	
	$('#news').dataTable({
		"processing" : true,
		"ordering" : false,
		"serverSide" : true,
		"ajax" : {
			url : context + "panino/news/list-data",
			dataFilter : function(data) {
				var json = jQuery.parseJSON(data);
				var data = json.data;
				var jsonData = [];
				var count = json.startFrom + 1;
				
				for (var i = 0; i < data.length; i++) {
					var deleteButton = "<span class='col-4' style=' display: inline-block';>" +
									   "<a data-toggle=tooltip' data-placement='bottom' title='Delete' href=\"/panino/news/delete/" + data[i].id+ "\" onclick=\"return confirm('Are you sure want to delete news?')\">" +
									   "<i class='ft-trash'></i></a>" +
									   "</span>";
					var editButton = "<div><span style=' display: inline-block';><a data-toggle=tooltip' data-placement='bottom' title='Edit' href=\"/panino/news/add?id=" + data[i].id + "\"><i class='ft-edit'></i></a></span>";
					var actions = editButton + " " + deleteButton;
					var row = [ count, 
						getDate(data[i].date),
						data[i].title,
						getDate(data[i].expectedSendDateLocale),
						actions ];
					jsonData.push(row);
					count++;
				}

				json.data = jsonData;
				return JSON.stringify(json);
			}
		}
	});
	
});
