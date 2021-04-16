$(document).ready(function() {
	$(".expected-send-date").on("change", function() {
		if(this.value == ""){
			this.setAttribute("data-date","Date");
		} else {
			this.setAttribute(
		        "data-date",
		        moment(this.value, "YYYY-MM-DD")
		        .format( this.getAttribute("data-date-format") )
		    )
		}
			
	}).trigger("change");
	
//	$("#zone").val(new Date().toLocaleString('en', {timeZoneName:'short'}).split(' ').pop());
	$("#zone").val(Intl.DateTimeFormat().resolvedOptions().timeZone);

	var options24 = {
        show24Hours: true,
        spinnerImage: null,
        immediateset: true,
        autoclose: true
    };
    jQuery('#date2').timeEntry(options24).on('clockpickerdone', function (e) {
        jQuery(this).timeEntry('setTime', jQuery(this).val());
        console.log('clockpickerdone');
    });
    jQuery('#date2').parent().clockpicker(options24);
	
});