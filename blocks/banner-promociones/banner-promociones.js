import createSlider from '../../scripts/slides.js';

export default function decorate(block) {
  const slides = block.querySelectorAll(':scope > div');

  slides.forEach((slide) => {
    slide.classList.add('slide');
  });

  createSlider(block, { timeout: 5000 });
}
