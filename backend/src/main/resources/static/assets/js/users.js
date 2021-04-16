//Datatable
$(document).ready(function() {
	$('#users').dataTable({
		"processing" : true,
		"ordering" : false,
		"serverSide" : true,
		"ajax" : {
			url : context + "panino/users/list-data",
			dataFilter : function(data) {
				var json = jQuery.parseJSON(data);
				var data = json.data;
				var jsonData = [];
				var count = json.startFrom + 1;

				for (var i = 0; i < data.length; i++) {
					var editButton = "<div><span><a data-toggle=tooltip' data-placement='bottom' title='Edit' href=\"/panino/users/add?userId=" + data[i].id + "\"><i class='ft-edit'></i></a></span>";
					var deleteButton = "<span class='col-4'>" +
					   "<a data-toggle=tooltip' data-placement='bottom' title='Delete' href=\"/panino/users/delete/" + data[i].id+ "\" onclick=\"return confirm('Are you sure want to delete user?')\">" +
					   "<i class='ft-trash'></i></a>" +
					   "</span>";
					var row = [ count, data[i].username,data[i].firstname,data[i].lastname,data[i].email, editButton + " " +deleteButton ];
					jsonData.push(row);
					count++;
				}

				json.data = jsonData;
				return JSON.stringify(json);
			}
		}
	});
});

function userDeleteConfirmation(id) {
	
	$('#confirmation-pop-up').modal('show');
	$('#yesButton').click(function(){
		window.location.href = "/panino/users/delete/"+id +"";
	});
}

var roleCheckBox = [];
$('.roles').click(function(el) {
    //console.log($(this).attr('checked'));
    //$('#result').append($(this).attr('value') + ',');
    values.push($(this).attr('value'));
    var str = values.join(", ");
});

//handling check uncheck of role
var roleCheckBox = [];
function checkUncheckRole(id, thisData) {
	id = parseInt(id);
	var roleInput = $('#contact-group-contact-ids');

	if ($(thisData).is(':checked')) {
		roleCheckBox.push(id);
		roleInput.val(roleCheckBox);
	} else {
		var index = roleCheckBox.indexOf(id);
		if (index != -1) {
			roleCheckBox.splice(index, 1);
			roleInput.val(roleCheckBox);
		}
	}
}