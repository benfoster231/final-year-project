//To run jquery
declare var $:any;
declare var jQuery:any;
declare var smoothScroll:any;

export class CustomJs {

    public static init() {

        setTimeout(() => {
            CustomJs.initializeAll();
        }, 1000);
    }

    private static initializeAll() {

        /*---------------------------------
        //------ PRELOADER ------//
        ----------------------------------*/
        $('#status').fadeOut();
        $('#preloader').delay(200).fadeOut('slow');

        /*---------------------------------
        //------ ANIMATE HEADER ------//
        ----------------------------------*/
        $(window).on('scroll', function () {
            var sticky = $(".sticky-header");
            var scroll = $(window).scrollTop();
            if (scroll < 265) {
                sticky.removeClass("sticky");
            } else {
                sticky.addClass("sticky");
            }
        });

        /*----------------------------------
        //------ SMOOTHSCROLL ------//
        -----------------------------------*/
        smoothScroll.init({
            speed: 1000, // Integer. How fast to complete the scroll in milliseconds
            offset: 200, // Integer. How far to offset the scrolling anchor location in pixels

        });

        /*----------------------------------
        //------ LIGHTCASE ------//
        -----------------------------------*/
        $('a[data-rel^=lightcase]').lightcase();


        /*----------------------------------
        //------ ISOTOPE GALLERY ------//
        -----------------------------------*/
        /* activate jquery isotope */
        $(window).on('load', function () {
            var $container = $('.portfolio-items').isotope({
                itemSelector: '.item',
                masonry: {
                    columnWidth: '.col-xs-12'
                }
            });
        });
        // init Isotope
        var $grid = $('.portfolio-items').isotope({
            // options...
        });
        // layout Isotope after each image loads
        $grid.imagesLoaded().progress(function () {
            $grid.isotope('layout');
        });
        // bind filter button click
        var filters = $('.filters-group ul li');
        filters.on('click', function () {
            filters.removeClass('active');
            $(this).addClass('active');
            var filterValue = $(this).attr('data-filter');
            // use filterFn if matches value
            $('.portfolio-items').isotope({
                filter: filterValue
            });
        });

        /*----------------------------------
        //------ OWL CAROUSEL ------//
        -----------------------------------*/
        $('.style1').owlCarousel({
            loop: true,
            margin: 10,
            autoplay: true,
            autoplayTimeout: 5000,
            responsive: {
                0: {
                    items: 1
                },
                400: {
                    items: 1,
                    margin: 20
                },
                500: {
                    items: 1,
                    margin: 20
                },
                768: {
                    items: 2,
                    margin: 20
                },
                991: {
                    items: 2,
                    margin: 20
                },
                1025: {
                    items: 3,
                    margin: 20
                }
            }
        });

        $('.style2').owlCarousel({
            loop: true,
            margin: 0,
            dots: false,
            autoWidth: false,
            autoplay: true,
            autoplayTimeout: 5000,
            responsive: {
                0: {
                    items: 2,
                    margin: 20
                },
                400: {
                    items: 2,
                    margin: 20
                },
                500: {
                    items: 3,
                    margin: 20
                },
                768: {
                    items: 4,
                    margin: 20
                },
                992: {
                    items: 5,
                    margin: 20
                },
                1000: {
                    items: 6,
                    margin: 20
                }
            }
        });

        $('.style3').owlCarousel({
            loop: true,
            margin: 10,
            autoplay: true,
            autoplayTimeout: 5000,
            responsive: {
                0: {
                    items: 1
                },
                400: {
                    items: 1,
                    margin: 20
                },
                500: {
                    items: 1,
                    margin: 20
                },
                768: {
                    items: 2,
                    margin: 20
                },
                991: {
                    items: 2,
                    margin: 20
                },
                1000: {
                    items: 5,
                    margin: 20
                }
            }
        });

        $('.carousel4').owlCarousel({
            autoPlay: false,
            navigation: true,
            slideSpeed: 600,
            items: 3,
            itemsDesktop: [1239, 3],
            itemsTablet: [991, 2],
            itemsMobile: [767, 1]
        });

        /*----------------------------------
        //------ TOP LOCATION ------//
        -----------------------------------*/
        if ($('#tp-carousel').length) {
            $('#tp-carousel').owlCarousel({
                loop: true,
                margin: 2,
                dots: false,
                responsiveClass: true,
                responsive: {
                    0: {
                        items: 1,
                        nav: true
                    },
                    600: {
                        items: 2,
                        nav: true
                    },
                    1024: {
                        items: 3,
                        nav: true
                    },
                    1025: {
                        items: 5,
                        nav: true,
                        loop: false
                    }
                }
            })
        }

        var go = $(".go-up");
        $(window).on('scroll', function () {
            var scrolltop = $(this).scrollTop();
            if (scrolltop >= 50) {
                go.fadeIn();
            } else {
                go.fadeOut();
            }
        });


        $(document).ready(function () {
        });
    }
}
