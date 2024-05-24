document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('#registro-form');
    
    form.addEventListener('submit', function (event) {
        if (!validateForm()) {
            event.preventDefault(); // Evita que el formulario se envíe si hay errores
        }
    });
});

function validateForm() {
    // Clear previous error messages
    document.querySelectorAll('.error-message').forEach(function(el) {
        el.textContent = '';
    });

    const nombre = document.querySelector('#Nombre').value.trim();
    const apellido = document.querySelector('#Apellido').value.trim();
    const dni = document.querySelector('#DNI').value.trim();
    const nacimiento = document.querySelector('#Nacimiento').value;
    const email = document.querySelector('#Email').value.trim();
    const direccion = document.querySelector('#Direccion').value.trim();
    const genero = document.querySelector('#genero').value;

    let valid = true;

    if (nombre === "") {
        document.querySelector('#error-nombre').textContent = "El nombre es obligatorio.";
        valid = false;
    }

    if (apellido === "") {
        document.querySelector('#error-apellido').textContent = "El apellido es obligatorio.";
        valid = false;
    }

    if (dni === "" || !/^\d{8}[A-Za-z]$/.test(dni)) {
        document.querySelector('#error-dni').textContent = "El DNI debe tener 8 dígitos seguidos de una letra.";
        valid = false;
    }

    if (nacimiento === "") {
        document.querySelector('#error-nacimiento').textContent = "La fecha de nacimiento es obligatoria.";
        valid = false;
    }

    if (email === "" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        document.querySelector('#error-email').textContent = "Por favor, introduce un email válido.";
        valid = false;
    }

    if (direccion === "") {
        document.querySelector('#error-direccion').textContent = "La dirección es obligatoria.";
        valid = false;
    }

    if (genero === "") {
        document.querySelector('#error-genero').textContent = "Por favor, selecciona un género.";
        valid = false;
    }

    return valid;
}
