/*
-------------------------------------------------------------------------
* Template Name    : Busiapp - Multi Purpose Html5 Landing Page      *
* Author           : ParExcellence                                   *
* Version          : 1.0.0                                           *
* File Description : Main JS file of the template                    *
*------------------------------------------------------------------------
*/
$(document).ready(function () {
    /*----MAIN SLIDER-----*/
    $('.main-slider').owlCarousel({
        loop: true,
        items: 1,
        margin: 0,
        nav: true,
        dots: true,
        autoplay: true,
        autoplayTimeout: 5000,
        items: 1,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                nav: false,
                dots: true
            },
            600: {
                items: 1,
                nav: false,
                dots: true
            },
            1000: {
                items: 1,
                nav: false,
                dots: true
            }
        }
    });

    /*----CLIENTS SLIDER-----*/
    $('.clients-slider').owlCarousel({
        loop: true,
        items: 1,
        margin: 0,
        nav: true,
        dots: true,
        autoplay: true,
        autoplayTimeout: 5000,
        items: 2,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                nav: false,
                dots: true
            },
            600: {
                items: 1,
                nav: false,
                dots: true
            },
            991: {
                items: 2,
                nav: false,
                dots: true
            }
        }
    });
    /*----TEAM SLIDER-----*/
    $('.team-slider').owlCarousel({
        loop: true,
        items: 1,
        margin: 0,
        nav: true,
        dots: true,
        autoplay: true,
        autoplayTimeout: 5000,
        items: 2,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                nav: false,
                dots: true
            },
            480: {
                items: 2,
                nav: false,
                dots: true
            },
            767: {
                items: 3,
                nav: false,
                dots: true
            },
            992: {
                items: 2,
                nav: false,
                dots: true
            }
        }
    });

    /*----ONSCROLL JS-----*/
    $(window).on("scroll", function () {
        "use strict";
        var sections = $('section'),
            nav = $('.navbar-nav'),
            nav_height = nav.outerHeight() + 25;
        $(window).scrollTop() >= 20 ? $("nav").addClass("sticky-header") : $(".sticky").removeClass("sticky-header");
        /*----ON SCROLL CHANGE ACTIVE MENU-----*/
        var cur_pos = $(this).scrollTop();
        sections.each(function () {
            var top = $(this).offset().top - nav_height,
                bottom = top + $(this).outerHeight();
            if (cur_pos >= top && cur_pos <= bottom) {
                nav.find('li').removeClass('active');
                $(this).addClass('active');
                nav.find('a[href="\\#' + $(this).attr('id') + '"]').parent().addClass('active');
            }
        });
    }), $(".nav-item a").on("click", function (o) {
        var t = $(this);
        $('.nav-item').removeClass('active');
        $(t).parent().addClass('active');
        $("html, body").stop().animate({
            scrollTop: $(t.attr("href")).offset().top - 20
        }, 1500), o.preventDefault()
    }), $(document).on("click", ".navbar-collapse.show", function (o) {
        $(o.target).is("a") && $(this).collapse("hide")
    }), $(window).on("scroll", function () {
        $(this).scrollTop() > 100 ? $(".back_top").fadeIn() : $(".back_top").fadeOut()
    }), $(".back_top").on("click", function () {
        return $("html, body").animate({
            scrollTop: 0
        }, 1e3), !1
    });

    /*----ACCORDIAN JS-----*/
    (function ($) {
        $(".accordion-card").on("click", function () {
            if ($(this).hasClass('active')) {
                $('.accordion-card').removeClass('active');
                $(this).removeClass('active')
            } else {
                $('.accordion-card').removeClass('active');
                $(this).addClass('active')
            }
        });
    })(jQuery);
    /*----CONTACT CLICK JS-----*/
    // $(".contact_btn a").on("click", function (o) {
    //     var t = $(this);
    //     $("html, body").stop().animate({
    //         scrollTop: $(t.attr("href")).offset().top - 50
    //     }, 1500), o.preventDefault()
    // })

 });

/*----WOW ANIMATION-----*/
(function ($) {
    var length = $('.wow').length;
    if (length >= 1) {
        wow = new WOW({
            boxClass: 'wow',
            animateClass: 'animated',
            offset: 0,
        });
        wow.init();
    }
})(jQuery);
