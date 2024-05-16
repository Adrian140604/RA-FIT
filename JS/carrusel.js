
document.addEventListener("DOMContentLoaded", function() {
    const carouselImages = document.querySelector('.carousel-images');
    let imageIndex = 0;

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
        if (imageIndex === carouselImages.children.length - 1) {
            imageIndex = 0;
            setTimeout(() => {
                carouselImages.style.transition = 'none';
                carouselImages.style.transform = `translateX(0)`;
                // Establece un pequeño retraso para reiniciar la transición
                setTimeout(() => {
                    carouselImages.style.transition = 'transform 0.8s ease';
                }, 10);
            }, 500);
        }
    }

    // Llama a la función nextImage cada 3 segundos
    setInterval(nextImage, 3000);
});