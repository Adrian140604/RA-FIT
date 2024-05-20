// script.js
document.getElementById('addToCartButton').addEventListener('click', function() {
    document.getElementById('popup').classList.remove('hidden');
});

document.getElementById('closePopup').addEventListener('click', function() {
    document.getElementById('popup').classList.add('hidden');
});

// Opcional: Cerrar el pop-up al hacer clic fuera del contenido del pop-up
window.addEventListener('click', function(event) {
    if (event.target === document.getElementById('popup')) {
        document.getElementById('popup').classList.add('hidden');
    }
});
