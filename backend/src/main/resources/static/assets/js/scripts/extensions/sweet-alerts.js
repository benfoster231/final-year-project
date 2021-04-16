$(document).ready(function () {

	$('#confirm-dialog').on('click', function () {
		swal({
			title: 'Are you sure?',
			text: 'You won\'t be able to revert this. This change will take effect on the next billing cycle. You will continue to have access until that time.',
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			cancelButtonText: 'Close',
			confirmButtonText: 'Yes, cancel it!'
		  }).then(function (isConfrim) {
			if(isConfrim.value == true) {
				$('#cancel-plan-form').submit();
				$.blockUI({
		        	message: '<span class="semibold"> Please wait...</span>',
		            overlayCSS: {
		                backgroundColor: '#fff',
		                opacity: 0.8,
		                cursor: 'wait'
		            },
		            css: {
		                border: 0,
		                padding: 0,
		                backgroundColor: 'transparent'
		            }
		        });
			}
			
		  }).catch(swal.noop)
	});

});