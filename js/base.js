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
    console.log(items);
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
    console.log(per);
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