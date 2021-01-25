document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.slide');

  // If only 1 image, abort slider init and hide navigation
  if (slides.length <= 1) {
    const sliderNav = document.getElementById('slider-nav');
    if (sliderNav) sliderNav.style.display = 'none';
    return;
  }

  const previousSlide = document.getElementById('previous-slide')!;
  const nextSlide = document.getElementById('next-slide')!;
  const dot = document.querySelector('.slider-dot')!;
  const dots = dot.parentElement!.children;
  let selectedDot = dots[0] as HTMLElement;

  // Create dots for each slide
  while (dots.length < slides.length) {
    const newDot = dots[0].cloneNode() as HTMLElement;
    newDot.classList.remove('active');
    dots[0].after(newDot);
  }

  // Init flickity
  const flickity = new Flickity('#team-slider', {
    wrapAround: true,
    prevNextButtons: false,
    pageDots: false,
  });

  // Add 'active' class to the selected dot
  flickity.on('select', () => {
    selectedDot.classList.remove('active');
    selectedDot = dots[flickity.selectedIndex] as HTMLElement;
    selectedDot.classList.add('active');
  });

  // Click events
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
