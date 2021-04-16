$(document).ready(function() {
	
	$('#shopkeepers').dataTable({
		"processing" : true,
		"ordering" : false,
		"serverSide" : true,
		"ajax" : {
			url : context + "shopkeeper/list-data",
			dataFilter : function(data) {
				var json = jQuery.parseJSON(data);
				var data = json.data;
				var jsonData = [];
				var count = json.startFrom + 1;
				
				for (var i = 0; i < data.length; i++) {
					var editButton = "";
					if(data[i].flgEnabledUpgradeShop != true || isAdmin == true){
						editButton = "<div><span style=' display: inline-block';><a data-toggle=tooltip' data-placement='bottom' title='Edit' href=\"/shopkeeper/sales-point?storeSaleId=" + data[i].id + "\"><i class='ft-edit'></i></a></span>";
					} else {
						editButton = "<div><span style=' display: inline-block';><a data-toggle=tooltip' data-placement='bottom' title='Edit' href=\"/shopkeeper/sales-point?storeSaleId=" + data[i].id + "\"><i class='ft-info'></i></a></span>";
					}
					
					var actions = editButton ;
					var row = [ count, 
						data[i].concreteName,
						data[i].address,
						data[i].city,
						data[i].state,
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
	

