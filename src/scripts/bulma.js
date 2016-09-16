$('.nav-toggle').click(function () {
    $('.nav-menu.nav-right').toggleClass('is-active')
    $(this).toggleClass('is-active')
})
$('.nav-item').click(function () {
    $('.nav-item').removeClass('is-active')
    $(this).toggleClass('is-active')
})