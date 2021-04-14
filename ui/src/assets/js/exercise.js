$(document).ready(function() {

    $(".radio-option input:radio").change(function () {
        if ($(this).val() == "male") {
            $('#malefigures').css("display", "block");
            $('#femalefigures').css("display", "none");
        } else {
            $('#malefigures').css("display", "none");
            $('#femalefigures').css("display", "block");
        }
    });
});
