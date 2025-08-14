export default async function decorate(block) {
  // En EDS, las props del modelo se exponen en el DOM.
  // Aquí asumimos que EDS serializa un atributo data para cada campo.
  // Lee el array de imágenes (urls) y captions (si existen):
  const imgsAttr = block.getAttribute('data-images') || '[]';
  const capsAttr = block.getAttribute('data-captions') || '[]';
  const images = JSON.parse(imgsAttr);
  const captions = JSON.parse(capsAttr);

  // Estructura base del carrusel
  const wrapper = document.createElement('div');
  wrapper.className = 'banner-carousel';

  const track = document.createElement('div');
  track.className = 'banner-track';

  images.forEach((src, i) => {
    const slide = document.createElement('figure');
    slide.className = 'banner-slide';
    const img = document.createElement('img');
    img.loading = 'lazy';
    img.alt = captions[i] || '';
    img.src = src;
    slide.append(img);

    if (captions[i]) {
      const figcap = document.createElement('figcaption');
      figcap.textContent = captions[i];
      slide.append(figcap);
    }
    track.append(slide);
  });

  // Controles
  const prev = document.createElement('button');
  prev.className = 'banner-prev';
  prev.type = 'button';
  prev.ariaLabel = 'Anterior';
  prev.textContent = '‹';

  const next = document.createElement('button');
  next.className = 'banner-next';
  next.type = 'button';
  next.ariaLabel = 'Siguiente';
  next.textContent = '›';

  wrapper.append(track, prev, next);
  block.innerHTML = '';
  block.append(wrapper);

  // Lógica mínima de desplazamiento
  let index = 0;
  const go = (dir) => {
    index = (index + dir + images.length) % images.length;
    track.style.transform = `translateX(${-index * 100}%)`;
  };
  prev.addEventListener('click', () => go(-1));
  next.addEventListener('click', () => go(1));
}
