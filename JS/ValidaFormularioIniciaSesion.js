// IniciaSesion.js

document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    
    form.addEventListener('submit', function (event) {
        if (!validateForm()) {
            event.preventDefault(); // Evita que el formulario se envíe si hay errores
        }
    });
});

function validateForm() {
    const email = document.querySelector('input[name="Email"]').value.trim();
    const dni = document.querySelector('input[name="DNI"]').value.trim();

    let valid = true;

    if (email === "" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert("Por favor, introduce un email válido.");
        valid = false;
    }

    if (dni === "" || !/^\d{8}[A-Za-z]$/.test(dni)) {
        alert("El DNI debe tener 8 dígitos seguidos de una letra.");
        valid = false;
    }

    return valid;
}
