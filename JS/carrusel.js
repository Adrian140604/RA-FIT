let slideIndex = 0;

function showSlide(index) {
    const slides = document.querySelectorAll('.carousel-images img');
    if (index < 0) {
        slideIndex = slides.length - 1;
    } else if (index >= slides.length) {
        slideIndex = 0;
    }
    slides.forEach((slide, i) => {
        slide.style.transform = `translateX(${100 * (i - slideIndex)}%)`;
    });
}

function nextSlide() {
    showSlide(++slideIndex);
}

// Función para avanzar automáticamente
function autoSlide() {
    nextSlide();
}

// Intervalo de tiempo para cambiar automáticamente las imágenes (cada 3 segundos en este ejemplo)
setInterval(autoSlide, 3000);

// Iniciar carrusel
showSlide(slideIndex);