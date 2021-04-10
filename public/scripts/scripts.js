$(document).ready(() => {
    // Scroll on buttons
    $('.js--scroll-to-order').click(() => {
        $('html, body').animate({scrollTop: $('.js--section-order').offset().top}, 1500);
    })
})