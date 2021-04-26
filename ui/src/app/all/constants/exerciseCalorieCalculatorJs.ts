//To run jquery
declare var $:any;
declare var jQuery:any;
declare var smoothScroll:any;

export class exerciseCalorieCalculatorJs {

    public static init() {

        setTimeout(() => {
            exerciseCalorieCalculatorJs.initializeAll();
        }, 1000);
    }

    private static initializeAll() {
        $(function() {
            function b(a) {
                var b = $("#gain_loss_amount");
                b.empty();
                $.each(a, function(a, c) {
                    let d: any = {
                        value: c
                    };
                    0 === c && (d.selected = "selected");
                    b.append($("<option></option>").attr(d).text(a))
                })
            }
            var a = {
                "Lose 2 Pounds per Week": -1E3,
                "Lose 1.5 Pounds per Week": -750,
                "Lose 1 Pounds per Week": -500,
                "Lose 0.5 Pounds per Week": -250,
                "Stay the Same Weight": 0,
                "Gain 0.5 Pound per Week": 250,
                "Gain 1 Pound per Week": 500,
                "Gain 1.5 Pounds per Week": 750,
                "Gain 2 Pounds per Week": 1E3
            }
                , c = {
                "Lose 1 Kg per Week": -1100,
                "Lose 0.75 Kg per Week": -825,
                "Lose 0.5 Kg per Week": -550,
                "Lose 0.25 Kg per Week": -275,
                "Stay the Same Weight": 0,
                "Gain 0.25 Kg per Week": 275,
                "Gain 0.5 Kg per Week": 550,
                "Gain 0.75 Kg per Week": 825,
                "Gain 1 Kg per Week": 1100
            };
            var width = $(window).width();
            var height = $(window).height()
            if (width < 1200) {
                var radius = height / 12 - 10;
            } else {
                var radius = (7 / 12) * width / 6 - 10;
            }
            $("#age").roundSlider({
                radius: 80,
                width: 14,
                handleSize: "+8",
                handleShape: "dot",
                sliderType: "min-range",
                value: 40,
                min: 1,
                max: 100,
                step: 1,
                tooltipFormat: "ageYears",
                editableTooltip: false
            });
        
            $("#weight").roundSlider({
                radius: 80,
                width: 14,
                handleSize: "+8",
                handleShape: "dot",
                sliderType: "min-range",
                value: 40,
                min: 1,
                max: 300,
                step: 1,
                tooltipFormat: "weightMeasure",
                editableTooltip: false
            });
        
            $("#height").roundSlider({
                radius: 80,
                width: 14,
                handleSize: "+8",
                handleShape: "dot",
                sliderType: "min-range",
                min: 50,
                max: 220,
                step: 1,
                value: 150,
                tooltipFormat: "heightMeasure",
                editableTooltip: false
            });
            radius = 95;
            $("#carbs").roundSlider({
                min: 1,
                max: 100,
                step: 1,
                value: 60,
                sliderType: "min-range",
                tooltipFormat: "carbsArg",
                editableTooltip: false,
                radius: radius,
                width: 14,
                handleSize: "+8",
                handleShape: "dot",
            });
            $("#protein").roundSlider({
                min: 1,
                max: 100,
                step: 1,
                value: 20,
                sliderType: "min-range",
                tooltipFormat: "proteinArg",
                editableTooltip: false,
                radius: radius,
                width: 14,
                handleSize: "+8",
                handleShape: "dot",
            });
            $("#fat").roundSlider({
                min: 1,
                max: 100,
                step: 1,
                value: 20,
                sliderType: "min-range",
                tooltipFormat: "fatArg",
                editableTooltip: false,
                radius: radius,
                width: 14,
                handleSize: "+8",
                handleShape: "dot",
            });
            $("input[name='calories']").TouchSpin({
                min: 500,
                max: 10000,
                step: 5,
                decimals: 0
            });
            $("input[name='meals']").TouchSpin({
                min: 1,
                max: 10,
                step: 1,
                decimals: 0
            });
            $('input[name="units"]').change(function() {
                console.log("units changed");
                $("#height").data("roundSlider").setValue(+$("input[name='height']").val() + 0.001);
                $("#weight").data("roundSlider").setValue(+$("input[name='weight']").val() + 0.001);
                "standard" === $(this).val() ? (b(a)) : (b(c));
            });
            $('input[name="diet"]').change(function() {
                console.log("diet changed");
                var diet = $('input[name="diet"]:checked').val();
                if (diet === "602515") {
                    $("#carbs").data("roundSlider").setValue(60);
                    $("#protein").data("roundSlider").setValue(25);
                    $("#fat").data("roundSlider").setValue(15);
                } else if (diet === "503020") {
                    $("#carbs").data("roundSlider").setValue(50);
                    $("#protein").data("roundSlider").setValue(30);
                    $("#fat").data("roundSlider").setValue(20);
                } else if (diet === "403030") {
                    $("#carbs").data("roundSlider").setValue(40);
                    $("#protein").data("roundSlider").setValue(30);
                    $("#fat").data("roundSlider").setValue(30);
                } else if (diet === "254530") {
                    $("#carbs").data("roundSlider").setValue(25);
                    $("#protein").data("roundSlider").setValue(45);
                    $("#fat").data("roundSlider").setValue(30);
                }
            });
            if (typeof $.modal != "undefined")
                $('#calorie-form').on($.modal.OPEN, function(event, modal) {
                    var w = $("#age").data("roundSlider").option("value");
                    $("#age").data("roundSlider").setValue(+w + 0.00001);
                    w = $("#height").data("roundSlider").option("value");
                    $("#height").data("roundSlider").setValue(+w + 0.00001);
                    w = $("#weight").data("roundSlider").option("value");
                    $("#weight").data("roundSlider").setValue(w + 0.001);
                });
            $(document).on("change", "#weightinput", function() {
                var w = 0;
                if ("standard" === $("input[name='units']:checked").val())
                    w = $("#weightinput").val() / 2;
                else
                    w = $("#weightinput").val();
                $("#weight").data("roundSlider").setValue(w);
            });
            $(document).on("change", "#ageinput", function() {
                var w = 0;
                w = $("#ageinput").val();
                $("#age").data("roundSlider").setValue(w);
            });
            $(document).on("change", "#heightmetricinput", function() {
                var w = 0;
                w = $("#heightmetricinput").val();
                $("#height").data("roundSlider").setValue(w);
            });
            $(document).on("change", "#heightinchesinput", function() {
                var w = 0;
                var inches = +$("#heightinchesinput").val();
                var feet = +$("#heightfeetinput").val();
                w = (feet * 12 + inches) * 2.54;
                $("#height").data("roundSlider").setValue(+w.toFixed(0) + 1);
            });
            $(document).on("change", "#heightfeetinput", function() {
                var w = 0;
                var inches = +$("#heightinchesinput").val();
                var feet = +$("#heightfeetinput").val();
                w = (feet * 12 + inches) * 2.54;
                $("#height").data("roundSlider").setValue(w);
            });
            b(a);
        });
        function populateTotalPercent(b, a) {
            if ("carb" == a)
                var c = b + parseInt($("#protein_slider").slider("value")) + parseInt($("#fat_slider").slider("value"));
            else
                "protein" == a ? c = b + parseInt($("#carb_slider").slider("value")) + parseInt($("#fat_slider").slider("value")) : "fat" == a && (c = b + parseInt($("#carb_slider").slider("value")) + parseInt($("#protein_slider").slider("value")));
            100 < c ? $("#total_percent").removeClass("label-success label-warning").addClass("label-danger") : 100 > c ? $("#total_percent").removeClass("label-success label-danger").addClass("label-warning") : $("#total_percent").removeClass("label-warning label-danger").addClass("label-success");
            $("#total_percent").text(c + "%")
        }
        function popupSliderCals(type) {
            var carb = 0;
            var fat = 0;
            var protein = 0;
            typeof $("#carbs").data("roundSlider") === "undefined" ? (carb = $("input[name='carbs']").val()) : (carb = $("#carbs").data("roundSlider").option("value"));
            typeof $("#fat").data("roundSlider") === "undefined" ? (fat = $("input[name='fat']").val()) : (fat = $("#fat").data("roundSlider").option("value"));
            typeof $("#protein").data("roundSlider") === "undefined" ? (protein = $("input[name='protein']").val()) : (protein = $("#protein").data("roundSlider").option("value"));
            if (type == "c")
                return fillInCalorieAmounts(carb, 4);
            else if (type == "p")
                return fillInCalorieAmounts(protein, 4);
            else if (type == "f")
                return fillInCalorieAmounts(fat, 9);
            return 0;
        }
        function calculateCPF() {
            $("#carbs").data("roundSlider").setValue(+$("#carbs").data("roundSlider").option("value") + 0.001);
            $("#fat").data("roundSlider").setValue(+$("#fat").data("roundSlider").option("value") + 0.001);
            $("#protein").data("roundSlider").setValue(+$("#protein").data("roundSlider").option("value") + 0.001);
        }
        ;function fillInCalorieAmounts(b, a) {
            var d = $("#calories").val();
            let ret: any = {};
            ret.s = 0;
            ret.m = 0;
            if ($.isNumeric(d)) {
                d = parseFloat(d);
                b = Math.round(0.01 * d * b / a);
                ret.s = b;
                a = +$("#meals").val();
                ret.m = Math.round(b / a);
            }
            return ret;
        }
        function  calcDailyCals() {
            let b: any = "standard" === $("input[name='units']:checked").val();
            let a: any = 0;
            a = parseFloat($("input[name='weight']").val());
            let c: any = parseFloat($("input[name='height']").val());
            let d: any = parseFloat($("input[name='age']").val());
            let e: any = $("input[name='sex']:checked").val();
            b = $("#activity_level").val();
            a = "male" == e ? 88.362 + 13.397 * a + 4.799 * c - 5.677 * d : 447.593 + 9.247 * a + 3.098 * c - 4.33 * d;
            "no" === b ? a *= 1.2 : "light" === b ? a *= 1.375 : "moderate" === b ? a *= 1.55 : "heavy" === b ? a *= 1.725 : "extreme" === b && (a *= 1.9);
            a = Math.round(a + parseInt($("#gain_loss_amount").val()));
            $("#calAmount").text(1200 < a ? a : 1200);
        }
        function ageYears(args) {
            return "Age<br/>" + "<input type='text' id='ageinput' style='width:2.7em;text-align: center;' value=" + (args.value).toFixed(0) + ">" + "<br/> Years";
        }
        function weightMeasure(args) {
            if ($('input[name="units"]:checked').val() === "standard") {
                return "Weight <br/>" + "<input type='text' id='weightinput' style='width:3em;text-align: center;' value=" + (args.value * 2).toFixed(0) + ">" + "<br/> LBS";
            } else {
                return "Weight <br/>" + "<input type='text' id='weightinput' style='width:3em;text-align: center;' value=" + (args.value).toFixed(0) + ">" + "<br/> KG";
            }
        }
        function heightMeasure(args) {
            if ($('input[name="units"]:checked').val() == "standard") {
                var h = 0.393700787399999 * args.value;
                var feet = (h / 12) - ((h / 12) % 1);
                console.log(feet);
                var inches = (((h / 12) % 1) * 12) - (((h / 12) % 1) * 12) % 1;
                return "Height<br/>" + "<input type='text' id='heightfeetinput' style='width:1.8em;text-align: center;' value=" + feet + ">" + "' " + "<input type='text' id='heightinchesinput' style='width:2.5em;text-align: center;' value=" + inches + ">" + "\"";
            } else {
                return "Height<br/>" + "<input type='text' id='heightmetricinput' style='width:3em;text-align: center;' value=" + (args.value).toFixed(0) + ">" + "<br/> CM";
            }
        }
        function proteinArg(args) {
            $("#proteininfo").text(popupSliderCals("p").s + "g");
            return "Protein <br/>" + args.value + "%<br/>" + "Grams/day <br/>" + popupSliderCals("p").s + "<br/>" + "Grams/meal <br/>" + popupSliderCals("p").m + "";
        }
        function carbsArg(args) {
            $("#carbinfo").text(popupSliderCals("c").s + "g");
            return "Carbs <br/>" + args.value + "%<br/>" + "Grams/day <br/>" + popupSliderCals("c").s + "<br/>" + "Grams/meal <br/>" + popupSliderCals("c").m + "";
        }
        function fatArg(args) {
            $("#fatinfo").text(popupSliderCals("f").s + "g");
            return "Fat <br/>" + args.value + "%<br/>" + "Grams/day <br/>" + popupSliderCals("f").s + "<br/>" + "Grams/meal <br/>" + popupSliderCals("f").m + "";
        }
        function openModal() {
            $("#calorie-form").modal();
        }
        function transferValue() {
            $("#calories").val($("#calAmount").text());
            $.modal.close();
        }
        function resizeIframe(obj) {
            obj.style.height = obj.contentWindow.document.body.scrollHeight + 'px';
        }
            
        
    }
}
