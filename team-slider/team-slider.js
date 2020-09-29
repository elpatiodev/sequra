window.addEventListener('DOMContentLoaded', function () {
    var previousSlide = document.getElementById('previous-slide');
    var nextSlide = document.getElementById('next-slide');
    var flickity = new Flickity('#team-slider', {
        wrapAround: true,
        prevNextButtons: false,
        pageDots: false,
        percentPosition: true
    });
    previousSlide.addEventListener('click', function () {
        flickity.previous();
    });
    nextSlide.addEventListener('click', function () {
        flickity.next();
    });
});
