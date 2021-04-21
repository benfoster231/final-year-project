import { ROUTS, CONSTANTS } from "./constants";
import { OnInit } from "@angular/core";
import { Router } from "@angular/router";

//To run jquery
declare var $:any;
declare var jQuery:any;
declare var smoothScroll:any;

export class muscleJs {

    CONSTANTS:any=CONSTANTS;
    ngOnInit(): void {}

    public static init() {

        setTimeout(() => {
            muscleJs.initializeAll();
        }, 1000);
    }

    private static initializeAll() {
        document.onclick = function(event) {
            let el: any = event.target;
            function getSelectedSection() {
                let element: any = localStorage.getItem(CONSTANTS.TYPE_URL);
                // let element: any = this.manageCookieService.getCookie(CONSTANTS.TYPE_URL);
                console.log("element");
                console.log(element);
                if (element) {
                //    return element.dataset.jsSection;
                   return element;
                } else {
                    return 'Exercises';
                }
                // return (document.querySelector('.section-selected') && document.querySelector('.section-selected').dataset.jsSection) || 'Exercises'
            }
            
            var type_url = getSelectedSection();
            var gender = localStorage.getItem("sex") || "m";
            var hase = "/#";
            switch (gender) {
            case "m":
                gender = "Male";
                break;
            case "f":
                gender = "Female";
                break;
            }
            if (el.nodeName == "IMG") {
                switch (el.id) {
                case "traps-a":
                case "female-traps-a":
                    window.location.href = hase + "/" + type_url + "/" + gender + "/Traps";
                    break;
                case "traps-b":
                case "female-traps-b":
                    window.location.href = hase + "/" + type_url + "/" + gender + "/Traps";
                    break;
                case "shoulders-a":
                case "female-shoulders-a":
                    window.location.href = hase + "/" + type_url + "/" + gender + "/Shoulders";
                    break;
                case "shoulders-b":
                case "female-shoulders-b":
                    window.location.href = hase + "/" + type_url + "/" + gender + "/Shoulders";
                    break;
                case "pecs":
                case "female-pecs":
                window.location.href = hase + "/" + type_url + "/" + gender + "/Chest";
                    break;
                case "biceps-a":
                case "female-biceps-a":
                    window.location.href = hase + "/" + type_url + "/" + gender + "/Biceps";
                    break;
                case "biceps-b":
                case "female-biceps-b":
                    window.location.href = hase + "/" + type_url + "/" + gender + "/Biceps";
                    break;
                case "forearm-a":
                case "female-forearm-a":
                    window.location.href = hase + "/" + type_url + "/" + gender + "/Forearms";
                    break;
                case "forearm-b":
                case "female-forearm-b":
                    window.location.href = hase + "/" + type_url + "/" + gender + "/Forearms";
                    break;
                case "obliques":
                case "female-abdominals":
                    window.location.href = hase + "/" + type_url + "/" + gender + "/Abdominals";
                    break;
                case "quads-a":
                case "female-quads-a":
                    window.location.href = hase + "/" + type_url + "/" + gender + "/Quads";
                    break;
                case "quads-b":
                case "female-quads-b":
                    window.location.href = hase + "/" + type_url + "/" + gender + "/Quads";
                    break;
                case "calves-a":
                case "female-calves-a":
                    window.location.href = hase + "/" + type_url + "/" + gender + "/Calves";
                    break;
                case "calves-b":
                case "female-calves-b":
                    window.location.href = hase + "/" + type_url + "/" + gender + "/Calves";
                    break;
                case "back-traps-a":
                case "female-back-traps-a":
                    window.location.href = hase + "/" + type_url + "/" + gender + "/Traps";
                    break;
                case "back-traps-b":
                case "female-back-traps-b":
                    window.location.href = hase + "/" + type_url + "/" + gender + "/Traps_middle";
                    break;
                case "back-shoulders-a":
                case "female-back-shoulders-a":
                    window.location.href = hase + "/" + type_url + "/" + gender + "/Shoulders";
                    break;
                case "back-shoulders-b":
                case "female-back-shoulders-b":
                    window.location.href = hase + "/" + type_url + "/" + gender + "/Shoulders";
                    break;
                case "triceps-a":
                case "female-triceps-a":
                    window.location.href = hase + "/" + type_url + "/" + gender + "/Triceps";
                    break;
                case "triceps-b":
                case "female-triceps-b":
                    window.location.href = hase + "/" + type_url + "/" + gender + "/Triceps";
                    break;
                case "back-upper-a":
                case "female-back-upper-a":
                    window.location.href = hase + "/" + type_url + "/" + gender + "/Lats";
                    break;
                case "back-upper-b":
                case "female-back-upper-b":
                    window.location.href = hase + "/" + type_url + "/" + gender + "/Lats";
                    break;
                case "back-lats-a":
                case "female-back-lats-a":
                    window.location.href = hase + "/" + type_url + "/" + gender + "/Lats";
                    break;
                case "back-lats-b":
                case "female-back-lats-b":
                    window.location.href = hase + "/" + type_url + "/" + gender + "/Lats";
                    break;
                case "back-lower":
                case "female-back-lower":
                    window.location.href = hase + "/" + type_url + "/" + gender + "/Lowerback";
                    break;
                case "back-forearms-a":
                case "female-back-forearms-a":
                    window.location.href = hase + "/" + type_url + "/" + gender + "/Forearms";
                    break;
                case "back-forearms-b":
                case "female-back-forearms-b":
                    window.location.href = hase + "/" + type_url + "/" + gender + "/Forearms";
                    break;
                case "back-glutes":
                case "female-back-glutes":
                    window.location.href = hase + "/" + type_url + "/" + gender + "/Glutes";
                    break;
                case "back-hamstrings-a":
                case "female-back-hamstrings-a":
                    window.location.href = hase + "/" + type_url + "/" + gender + "/Hamstrings";
                    break;
                case "back-hamstrings-b":
                case "female-back-hamstrings-b":
                    window.location.href = hase + "/" + type_url + "/" + gender + "/Hamstrings";
                    break;
                case "back-calves-a":
                case "female-back-calves-a":
                    window.location.href = hase + "/" + type_url + "/" + gender + "/Calves";
                    break;
                case "back-calves-b":
                case "female-back-calves-b":
                    window.location.href = hase + "/" + type_url + "/" + gender + "/Calves";
                    break;
                }
            }
        }
        ;
        function resizeIframe(obj) {
            obj.style.height = obj.contentWindow.document.body.scrollHeight + 'px';
        }
        function hasInParentsUntil(el, id, limit) {
            if (el.id === id)
                return true;
            if (el === limit)
                return false;
            if (el.parentNode)
                return hasInParentsUntil(el.parentNode, id, limit);
            return false;
        }
        function loadSelections(selecton) {
            if (!selecton)
                return;
            if (typeof selecton.onclick == "function") {
                selecton.onclick();
            } else if (typeof selecton.click == "function") {
                selecton.click();
            }
        }
        document.addEventListener("DOMContentLoaded", function() {
            console.log("DOMContentLoaded");
            let randGender: any = (Math.floor(Math.random() * 2) == 0) ? 'm' : 'f';
            var _sex = localStorage.getItem("sex") || randGender;
            var section = localStorage.getItem("section") || 'Exercise';
            var _sex_el = _sex == "m" ? document.getElementById("sexchoosermalelabel") : document.getElementById("sexchooserfemalelabel");
            loadSelections(_sex_el);
            var _section_el = document.querySelectorAll(`[data-js-section='${section}']`)[0];
            loadSelections(_section_el);
        });
           
        
    }
}
