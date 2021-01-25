"use strict";
document.addEventListener('DOMContentLoaded', function () {
    var slides = document.querySelectorAll('.slide');
    if (slides.length <= 1) {
        var sliderNav = document.getElementById('slider-nav');
        if (sliderNav)
            sliderNav.style.display = 'none';
        return;
    }
    var previousSlide = document.getElementById('previous-slide');
    var nextSlide = document.getElementById('next-slide');
    var dot = document.querySelector('.slider-dot');
    var dots = dot.parentElement.children;
    var selectedDot = dots[0];
    while (dots.length < slides.length) {
        var newDot = dots[0].cloneNode();
        newDot.classList.remove('active');
        dots[0].after(newDot);
    }
    var flickity = new Flickity('#team-slider', {
        wrapAround: true,
        prevNextButtons: false,
        pageDots: false,
    });
    flickity.on('select', function () {
        selectedDot.classList.remove('active');
        selectedDot = dots[flickity.selectedIndex];
        selectedDot.classList.add('active');
    });
    var _loop_1 = function (i) {
        dots[i].addEventListener('click', function () {
            flickity.select(i);
        });
    };
    for (var i = 0; i < dots.length; i++) {
        _loop_1(i);
    }
    previousSlide.addEventListener('click', function () {
        flickity.previous();
    });
    nextSlide.addEventListener('click', function () {
        flickity.next();
    });
});
