
$(function () {
    var tabs = $('.tabs')
    var lastOpacity = 1
    $(window).scroll(function () {
        var opacity = 1 - $(this).scrollTop() / 50
        opacity = Math.round(opacity)
        if (lastOpacity > 0 || opacity > 0)
            tabs.css({ 'opacity': opacity })
        lastOpacity = opacity
    });
    $('a:not(.github)', tabs).click(function() {
        $('a', tabs).removeClass('active')
        $(this).addClass('active')
    })

    function resize() {
        this.style.height = this.contentWindow.document.body.scrollHeight + 5 + 'px'
    }
    // increase the size of the iframe so that there are no scrollbars
    $("iframe").load(function() {
        resize.apply(this)
        setTimeout(resize.bind(this), 1000)
    })
})

