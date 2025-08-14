import { createSlider } from '../../scripts/slides.js';

export default function decorate(block) {
  const [wrapper] = block.children;

  createSlider(wrapper, { timeout: 5000 });

  console.log(block);
  console.log(wrapper);
}
