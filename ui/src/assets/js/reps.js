var calculateReps = function() {
    var param1 = 1.0278;
    var param2 = 0.0278;
    var param3 = 0.75;
    var maxReps = 10;
    var trim = Math.round;
    var unit = $("input[name='weightunit']:checked").val();
    var nrOfReps = $("#reps").val();
    var weight = $("#weight").val();
    if (unit == "kg") {}
    var oneRepMax = null;
    if (nrOfReps > maxReps) {
        alert("You can't enter more than 10 reps!");
        return false;
    } else if (nrOfReps < maxReps) {
        oneRepMax = trim(weight / (param1 - param2 * nrOfReps));
    } else if (nrOfReps == maxReps) {
        oneRepMax = trim(weight / param3);
    }
    $("#test-circle50").find('text')[0].innerHTML = trim(oneRepMax * 0.50);
    $("#test-circle55").find('text')[0].innerHTML = trim(oneRepMax * 0.55);
    $("#test-circle60").find('text')[0].innerHTML = trim(oneRepMax * 0.60);
    $("#test-circle65").find('text')[0].innerHTML = trim(oneRepMax * 0.65);
    $("#test-circle70").find('text')[0].innerHTML = trim(oneRepMax * 0.70);
    $("#test-circle75").find('text')[0].innerHTML = trim(oneRepMax * 0.75);
    $("#test-circle80").find('text')[0].innerHTML = trim(oneRepMax * 0.80);
    $("#test-circle85").find('text')[0].innerHTML = trim(oneRepMax * 0.85);
    $("#test-circle90").find('text')[0].innerHTML = trim(oneRepMax * 0.90);
    $("#test-circle95").find('text')[0].innerHTML = trim(oneRepMax * 0.95);
    $("#maxrep").text(oneRepMax);
    return false;
}
$(document).ready(function() {
    $("input[name='reps']").TouchSpin({
        min: 1,
        max: 10,
        step: 1,
        decimals: 0
    });
    $("input[name='weight']").TouchSpin({
        min: 1,
        max: 500,
        step: 5,
        decimals: 1
    });
    $("input[name='weightunit']").change(function() {
        console.log("Unit changed");
        var unit = $("input[name='weightunit']:checked").val();
        if (unit == "kg") {
            $("#weight").val(($("#weight").val() / 2.20462).toFixed(1));
            $(".svgunit").text("KG");
            $(".svgunit2").text(" KG");
        } else if (unit == "lbs") {
            $("#weight").val(($("#weight").val() * 2.20462).toFixed(1));
            $(".svgunit").text("LBS");
            $(".svgunit2").text(" LBS");
        }
        calculateReps();
    });
});
