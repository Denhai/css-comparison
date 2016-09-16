
$(function () {
    var tabs = $('.tabs')
    var lastOpacity = 1;

    $(window).scroll(function () {
        var opacity = 1 - $(this).scrollTop() / 50
        opacity = Math.round(opacity)
        if (lastOpacity > 0 || opacity > 0)
            tabs.css({ 'opacity': opacity });
        lastOpacity = opacity
    });

    $("iframe").on('load', function () {
        this.style.height = this.contentWindow.document.body.scrollHeight + 'px';
    })
})

