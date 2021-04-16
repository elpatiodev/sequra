"use strict";
window.addEventListener('load', () => {
    const sliders = document.querySelectorAll('.w-slider');
    sliders.forEach((slider) => {
        const sliderDots = slider.querySelectorAll('.w-slider-dot');
        if (sliderDots.length <= 1) {
            const arrows = slider.querySelectorAll('.w-slider-arrow-left, .w-slider-arrow-right');
            arrows.forEach((arrow) => arrow.classList.add('disabled'));
        }
    });
});
