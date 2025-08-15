/**
 * Crea un slider reutilizable
 * @param {HTMLElement} container - Contenedor principal del slider
 * @param {Object} options - Opciones de configuracion
 * @param {number} options.timeout - Tiempo entre slides en ms
*/
export default function createSlider(container, { timeout = 4000 } = {}) {
  const slides = container.querySelectorAll('.slide');
  let current = -1;
  let slider;

  /**
   * Crea botones de next y prev
  */
  function createButtons() {
    const prevBtn = document.createElement('button');
    prevBtn.className = 'prev';
    prevBtn.type = 'button';
    prevBtn.innerHTML = '&lsaquo;';

    const nextBtn = document.createElement('button');
    nextBtn.className = 'next';
    nextBtn.type = 'button';
    nextBtn.innerHTML = '&rsaquo;';

    container.appendChild(prevBtn);
    container.appendChild(nextBtn);
  }

  /**
   * Crea dots
  */
  function createDots() {
    const ul = document.createElement('ul');
    ul.className = 'list-dots';

    let count = 1;
    slides.forEach((_, index) => {
      const li = document.createElement('li');
      li.className = 'slide-dot';
      li.dataset.numb = index;
      li.textContent = count;
      ul.appendChild(li);
      count++;
    });
    container.appendChild(ul);
  }

  /**
   * Realiza slide con fade al siguiente elemento
  */
  function fadeNextSlide() {
    current = (current + 1) % slides.length;

    handleActiveSlide();

    slides[current].classList.add('active');

    slider = setTimeout(fadeNextSlide, timeout);
  }

  /**
   * Realiza slide con fade al elemento anterior
  */
  function fadePrevSlide() {
    current = (current - 1 + slides.length) % slides.length;

    handleActiveSlide();

    slides[current].classList.add('active');

    slider = setTimeout(fadeNextSlide, timeout);
  }

  /**
   * Realiza slide en base a click en dot
  */
  function goToSlide(index) {
    current = index;

    handleActiveSlide();

    slides[current].classList.add('active');
    liItem[current].classList.add('active');

    slider = setTimeout(fadeNextSlide, timeout);
  }

  /**
   * Se maneja active de slides y dots de manera dinamica
  */
  function handleActiveSlide() {
    const liItem = container.querySelectorAll('.slide-dot');
    slides.forEach((slide, i) => {
      slide.classList.remove('active');
      liItem[i].classList.remove('active');
    });
    liItem[current].classList.add('active');
  }

  /**
   * Realiza accion de eventos en buttons
  */
  function eventsButtons() {
    const prev = container.querySelector('.prev');
    const next = container.querySelector('.next');

    next?.addEventListener('click', () => {
        clearTimeout(slider);
        fadeNextSlide();
    });

    prev?.addEventListener('click', () => {
        clearTimeout(slider);
        fadePrevSlide();
    });
  }

  /**
   * Realiza accion de evento en dots
  */
  function eventsDots() {
    const ul = container.querySelector('.list-dots');

    ul?.addEventListener('click', (event) => {
        if (event.target.dataset.numb) {
          clearTimeout(slider);
          goToSlide(parseInt(event.target.dataset.numb, 10));
        }
    });
  }

  // Se crean elementos html
  createButtons();
  createDots();

  // Se inicializan eventos
  eventsButtons();
  eventsDots();

  // Se inicializa funcionalidad de slider
  fadeNextSlide();
}
