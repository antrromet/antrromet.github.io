var items = [],
    current = 0,
    jPer = 0,
    errors = [];
var getImages = function () {
    $('body').find('*:not(script)').each(function () {
        var url = "";

        if ($(this).css('background-image').indexOf('none') == -1 && $(this).css('background-image').indexOf('-gradient') == -1) {
            url = $(this).css('background-image');
            if (url.indexOf('url') != -1) {
                var temp = url.match(/url\((.*?)\)/);
                url = temp[1].replace(/\"/g, '');
            }
        } else if ($(this).get(0).nodeName.toLowerCase() == 'img' && typeof ($(this).attr('src')) != 'undefined') {
            url = $(this).attr('src');
        }

        if (url.length > 0) {
            items.push(url);
        }
    });
}
var preloading = function () {
    for (var i = 0; i < items.length; i++) {
        if (loadImg(items[i]));
    }
}
var loadImg = function (url) {
    var imgLoad = new Image();
    $(imgLoad)
        .load(function () {
            completeLoading();
        })
        .error(function () {
            errors.push($(this).attr('src'));
            completeLoading();
        })
        .attr('src', url);
}
var completeLoading = function () {
    current++;

    var per = Math.round((current / items.length) * 100);

    $(".status-loaded").css("height", per + "%");
}
getImages();
preloading();
$(window).load(function () { // makes sure the whole site is loaded
    $('#status').fadeOut(); // will first fade out the loading animation
    $('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
    $('body').delay(350).css({
        'overflow': 'visible'
    });
});


jQuery(function($) {
    $("#rss-feeds").rss("http://antrromet.blogspot.com/feeds/posts/default?alt=rss", {
          limit: 15,
          effect: 'slideFastSynced',
          entryTemplate: '<li><h1 class="blog-title">{title}</h1><div class="blog-content">{shortBody}</div><div><a class="custom-link link-full" href="{url}">Read More &nbsp;<span class="fa fa-angle-double-right"></span></a></div></li>'
        });
});

function loadImage(el,fn){var img=new Image(),src=el.getAttribute('data-src');img.onload=function(){if(!!el.parent)
el.parent.replaceChild(img,el)
else
el.src=src;fn?fn():null;}
img.src=src;}
    
$(document).ready(function(){
        $(".lazy-load-images").each(function(){
            loadImage(this);
        });
        $('a[href^="#"]').on('click',function (e) {
            e.preventDefault();

            var target = this.hash;
            $target = $(target);

            $('html, body').stop().animate({
                'scrollTop': $target.offset().top
            }, 900, 'swing', function () {
                window.location.hash = target;
            });
        });

});
