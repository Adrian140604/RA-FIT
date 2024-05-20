document.addEventListener("DOMContentLoaded", function() {
    const carouselImages = document.querySelector('.carousel-images');
    let imageIndex = 0;
    const totalImages = carouselImages.children.length;

    function nextImage() {
        // Calcula el ancho de una imagen
        const imageWidth = carouselImages.firstElementChild.clientWidth;
        // Incrementa el índice de la imagen
        imageIndex++;
        // Calcula el desplazamiento horizontal
        const translateX = -imageWidth * imageIndex;
        // Aplica el desplazamiento a las imágenes
        carouselImages.style.transform = `translateX(${translateX}px)`;

        // Si llegamos al final, vuelve al principio
        if (imageIndex === totalImages) {
            setTimeout(() => {
                carouselImages.style.transition = 'none';
                carouselImages.style.transform = `translateX(0)`;
                imageIndex = 0;
                // Establece un pequeño retraso para reiniciar la transición
                setTimeout(() => {
                    carouselImages.style.transition = 'transform 0.8s ease';
                }, 10);
            }, 800);
        }
    }

    // Llama a la función nextImage cada 3 segundos
    setInterval(nextImage, 3000);
});
