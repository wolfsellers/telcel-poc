import createSlider from '../../scripts/slides.js';

export default function decorate(block) {
  const wrappBanner = block.querySelector('.banner_promociones');

  const slides = wrappBanner.querySelectorAll('div');
  slides.forEach((slide) => {
    slide.classList.add('slide');
  });

  createSlider(wrappBanner, { timeout: 5000 });
}
