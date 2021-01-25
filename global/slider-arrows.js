"use strict";
window.addEventListener('load', function () {
    var sliders = document.querySelectorAll('.w-slider');
    sliders.forEach(function (slider) {
        var sliderDots = slider.querySelectorAll('.w-slider-dot');
        if (sliderDots.length <= 1) {
            var arrows = slider.querySelectorAll('.w-slider-arrow-left, .w-slider-arrow-right');
            arrows.forEach(function (arrow) { return arrow.classList.add('disabled'); });
        }
    });
});
