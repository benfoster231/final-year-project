//To run jquery
declare var $:any;
declare var LoadMap_main:any;
declare var LoadMap_main_default:any;
declare var LoadMap_main_mini:any;
declare var map_property:any;
declare var map_e:any;
declare var codemirror_init:any;
declare var custom_template_style:any;
declare var footable_init:any;
declare var mapEdit:any;

export class LocalScript {

    public static init() {

        setTimeout(() => {
            LocalScript.initializeAll();
        }, 1000);
    }

    private static initializeAll() {
        
        //click on button, that scrolls page
        $('.scroll-button').on('click', function(){
            $('body, html').animate({'scrollTop':$('.scroll-box').outerHeight(true)});
            return false;
        });
        
        /* load extern scripts */
        if($('#main-map').length && typeof LoadMap_main === 'function'){
            LoadMap_main();
        }    
            
        /* load extern scripts */
        if($('#main-map-template').length && typeof LoadMap_main_default === 'function'){
            LoadMap_main_default();
        }    
        /* load extern scripts */
        if($('#main-map-mini').length && typeof LoadMap_main_mini === 'function'){
            LoadMap_main_mini();
        }    
        
        if($('#property-map').length && typeof map_property === 'function'){
            map_property();
        }
        
        if($('#map').length && typeof map_e === 'function'){
            map_e();
        }
        
        if(typeof codemirror_init === 'function'){
            codemirror_init();
        }
        
        if(typeof custom_template_style === 'function'){
            custom_template_style();
        }
        
        if(typeof footable_init === 'function'){
            footable_init();
        }
        
        if($('#mapsAddress').length && typeof mapEdit === 'function'){
            mapEdit();
        }
        
        /* rtl version */
        
        /* end rtl version */
        
        var geomap = $('#geo-map');
        if (geomap && geomap.length) {
            geomap.geo_map();
            
            /*
            geomap.geo_map('set_config',{
                'color_hover': '#000',
                'color_active': '#000',
                'color_default': '#000',
                'color_border': '#000',
            })*/
            
            geomap.geo_map('generate_map','usa')
            geomap.on('clickArea.geo_map', function (event) {
                $('#location_geo').val(event.location);
            })

            if($('#location-select').length) {
            $('#location-select').on('change',function(){
                geomap.geo_map('generate_map',$(this).val())
            }) 
            }
        }
        
        var search_types_tags = $('#search_types');
        var search_types_input = $('#search_types_option');
        
        if(search_types_input && search_types_tags && search_types_tags.length && search_types_input.length) {
            
            search_types_tags.find('a').on('click', function(e){
                e.preventDefault();
                
                var type = $(this).attr('data-type');
                if(type){
                    search_types_input.val(type);
                    search_types_input.selectpicker('refresh')
                }
            })
        }
        
        var fullscreen_md = $('.fullscreen-top-md');    
        if(fullscreen_md && fullscreen_md.length) {
            var fullscreen_map_md= $('.fullscreen-map-md');
            var map= fullscreen_map_md.find('.map');
            var fullscreen_inner_md= $('.fullscreen-inner-md');
        
                var h = fullscreen_md.outerHeight();
                fullscreen_md.removeClass("affix-menu")
                $(window).off('.affix');
                fullscreen_md
                    .removeClass("affix affix-top affix-bottom")
                    .removeData("bs.affix");
            
                                map.css("height", 'calc(100vh - '+ h +'px')
                                    .css("left", fullscreen_map_md.offset().left+'px')
                                    .css("width", fullscreen_map_md.outerWidth() +'px')
                                    .css("top", h +'px');
                        
                fullscreen_inner_md.css("padding-top", h +'px');
                $(window).on('resize', function(){
                    var h = fullscreen_md.outerHeight();
                    map.css("height", 'calc(100vh - '+ h +'px')
                                    .css("left", fullscreen_map_md.offset().left+'px')
                                    .css("width", fullscreen_map_md.outerWidth() +'px')
                                    .css("top", h +'px');
                            
                    fullscreen_inner_md.css("padding-top", h +'px');
                })
        }
        
    }

    private static getParameterByName(name, url) {
        if (typeof url === 'undefined')
            url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                results = regex.exec(url);
        if (!results)
            return null;
        if (!results[2])
            return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
}