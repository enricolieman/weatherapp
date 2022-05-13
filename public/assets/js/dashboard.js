"use strict";
jQuery(document).ready(function ($) {

//for Preloader

    $(window).load(function () {

        $("#loading").fadeOut(1000);
        
        var tokenss = localStorage.getItem('auth');
        if(tokenss !== null)
        {
        $.ajax({
            url: '/api/me',
            headers: { 'Authorization': tokenss }
        }).done((data) => {
            if(data.success == true)
            {
            }
            else
            {
                localStorage.removeItem("auth");
                window.location.href = "/";
            }
        });
        }
        else
        {
            window.location.href = "/";
        }


    });


    /*---------------------------------------------*
     * Mobile menu
     ---------------------------------------------*/
    $('#navbar-menu').find('a[href*=#]:not([href=#])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: (target.offset().top - 80)
                }, 1000);
                if ($('.navbar-toggle').css('display') != 'none') {
                    $(this).parents('.container').find(".navbar-toggle").trigger("click");
                }
                return false;
            }
        }
    });





// magnificPopup



//---------------------------------------------
// Scroll Up 
//---------------------------------------------

    $(window).scroll(function () {
        if ($(this).scrollTop() > 600) {
            $('.scrollup').fadeIn('slow');
        } else {
            $('.scrollup').fadeOut('slow');
        }
    });
    $('.scrollup').click(function () {
        $("html, body").animate({scrollTop: 0}, 1000);
        return false;
    });



    //End

});


// scrool Down

$('.scrooldown a').bind('click', function () {
    $('html , body').stop().animate({
        scrollTop: $($(this).attr('href')).offset().top - 160
    }, 1500, 'easeInOutExpo');
    event.preventDefault();
});












