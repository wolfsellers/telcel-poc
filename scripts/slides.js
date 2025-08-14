/**
 * Crea un slider reutilizable
 * @param {HTMLElement} container - Contenedor principal del slider
 * @param {Object} options - Opciones de configuracion
 * @param {number} options.timeout - Tiempo entre slides en ms
 */
function createSlider(container, { timeout = 4000 } = {}) {
   const imgslides = container.querySelectorAll(".slide");

    let current = -1;

    function fadeNextSlide() {
        imgslides.forEach((img, i) => {
            img.style.opacity = 0;
        });

        current = (current + 1) % imgslides.length;

        imgslides[current].style.opacity = 1;

        slider = setTimeout(fadeNextSlide, timeout);
    }

    // Inicia el slider
    fadeNextSlide();
}
