"use strict";
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    if (slides.length <= 1) {
        const sliderNav = document.getElementById('slider-nav');
        if (sliderNav)
            sliderNav.style.display = 'none';
        return;
    }
    const previousSlide = document.getElementById('previous-slide');
    const nextSlide = document.getElementById('next-slide');
    const dot = document.querySelector('.slider-dot');
    const dots = dot.parentElement.children;
    let selectedDot = dots[0];
    while (dots.length < slides.length) {
        const newDot = dots[0].cloneNode();
        newDot.classList.remove('active');
        dots[0].after(newDot);
    }
    const flickity = new Flickity('#team-slider', {
        wrapAround: true,
        prevNextButtons: false,
        pageDots: false,
    });
    flickity.on('select', () => {
        selectedDot.classList.remove('active');
        selectedDot = dots[flickity.selectedIndex];
        selectedDot.classList.add('active');
    });
    for (let i = 0; i < dots.length; i++) {
        dots[i].addEventListener('click', () => {
            flickity.select(i);
        });
    }
    previousSlide.addEventListener('click', () => {
        flickity.previous();
    });
    nextSlide.addEventListener('click', () => {
        flickity.next();
    });
});
