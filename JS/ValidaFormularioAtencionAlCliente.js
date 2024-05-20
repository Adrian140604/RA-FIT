// acliente.js

document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.querySelector('form[action="../HTML/registro_correcto.html"]');
    
    contactForm.addEventListener('submit', function (event) {
        if (!validateContactForm()) {
            event.preventDefault(); // Evita que el formulario se envíe si hay errores
        }
    });
});

function validateContactForm() {
    const nombre = document.querySelector('input[name="nombre"]').value.trim();
    const correo = document.querySelector('input[name="correo"]').value.trim();
    const mensaje = document.querySelector('textarea[name="mensaje"]').value.trim();

    let valid = true;

    if (nombre === "") {
        alert("El nombre es obligatorio.");
        valid = false;
    }

    if (correo === "" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
        alert("Por favor, introduce un correo electrónico válido.");
        valid = false;
    }

    if (mensaje === "") {
        alert("El mensaje es obligatorio.");
        valid = false;
    }

    return valid;
}
