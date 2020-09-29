window.addEventListener('DOMContentLoaded', () => {
  const previousSlide = document.getElementById('previous-slide')!;
  const nextSlide = document.getElementById('next-slide')!;

  // Init flickity
  const flickity = new Flickity('#team-slider', {
    wrapAround: true,
    prevNextButtons: false,
    pageDots: false,
  });

  previousSlide.addEventListener('click', () => {
    flickity.previous();
  });

  nextSlide.addEventListener('click', () => {
    flickity.next();
  });
});
