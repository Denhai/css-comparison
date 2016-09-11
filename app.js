
function resizeIframe(obj) {
    obj.style.height = obj.contentWindow.document.body.scrollHeight + 'px';
}
$('#navigation').load('navigation.html')

var tabs = $('.tabs')
var lastOpacity = 1;

$(window).scroll(function () {
    var opacity = 1 - $(this).scrollTop() / 50
    opacity = Math.round(opacity)
    if (lastOpacity > 0 || opacity > 0)
        tabs.css({ 'opacity': opacity });
    lastOpacity = opacity
});