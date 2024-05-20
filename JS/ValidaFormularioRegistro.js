// Registro.js

document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    
    form.addEventListener('submit', function (event) {
        if (!validateForm()) {
            event.preventDefault(); // Evita que el formulario se envíe si hay errores
        }
    });
});

function validateForm() {
    const nombre = document.querySelector('input[name="Nombre"]').value.trim();
    const apellido = document.querySelector('input[name="Apellido"]').value.trim();
    const dni = document.querySelector('input[name="DNI"]').value.trim();
    const nacimiento = document.querySelector('input[name="Nacimiento"]').value;
    const email = document.querySelector('input[name="Email"]').value.trim();
    const direccion = document.querySelector('input[name="Direccion"]').value.trim();
    const genero = document.querySelector('select[name="genero"]').value;

    let valid = true;

    if (nombre === "") {
        alert("El nombre es obligatorio.");
        valid = false;
    }

    if (apellido === "") {
        alert("El apellido es obligatorio.");
        valid = false;
    }

    if (dni === "" || !/^\d{8}[A-Za-z]$/.test(dni)) {
        alert("El DNI debe tener 8 dígitos seguidos de una letra.");
        valid = false;
    }

    if (nacimiento === "") {
        alert("La fecha de nacimiento es obligatoria.");
        valid = false;
    }

    if (email === "" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert("Por favor, introduce un email válido.");
        valid = false;
    }

    if (direccion === "") {
        alert("La dirección es obligatoria.");
        valid = false;
    }

    if (genero === "") {
        alert("Por favor, selecciona un género.");
        valid = false;
    }

    return valid;
}
