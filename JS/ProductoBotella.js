document.addEventListener("DOMContentLoaded", function() {
    const botonCarrito = document.querySelector('.boton_carrito');
    const productTitle = document.querySelector('.product-title').textContent;

    botonCarrito.addEventListener('click', function() {
        // Guardar el título del producto en el almacenamiento local
        localStorage.setItem('productTitle', productTitle);
    });
});