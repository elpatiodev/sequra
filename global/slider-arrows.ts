window.addEventListener('load', () => {
  const sliders = document.querySelectorAll<HTMLDivElement>('.w-slider');

  sliders.forEach((slider) => {
    const sliderDots = slider.querySelectorAll<HTMLDivElement>('.w-slider-dot');
    if (sliderDots.length <= 1) {
      const arrows = slider.querySelectorAll<HTMLDivElement>(
        '.w-slider-arrow-left, .w-slider-arrow-right'
      );
      arrows.forEach((arrow) => arrow.classList.add('disabled'));
    }
  });
});
