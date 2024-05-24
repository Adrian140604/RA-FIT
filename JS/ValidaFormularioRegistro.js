//Nueva validación usando un div oculto

function validaFormulario() {
    let valido = true;
    //Acceder a los datos a validar
    const nombre = document.getElementById("Nombre").value;
    const apellido = document.getElementById("Apellido").value;
    const dni = document.getElementById("DNI").value;
    const nacimiento = document.getElementById("Nacimiento").value;
    const mail = document.getElementById("Email").value;
    const direccion = document.getElementById("Direccion").value;
    const genero = document.getElementById("genero").value;

    /* Declaro constantes para cada valor del formulario que quiero extraer */

    let errores = []; //De principio está vacío porque no hay errores

    //Empezamos a validar

    if (nombre === "") {
        errores.push("Por favor, introduzca un nombre");
    }

    if (apellido === "") {
        errores.push("Por favor, introduzca un apellido");
    }

    let expresionDNI = /^[0-9]{8}[A-Z]$/

    if (!expresionDNI.test(dni)) {
        errores.push("Por favor, ingrese un DNI válido");
    }

    if (nacimiento === "") {
        errores.push("Por favor, seleccione una fecha de nacimiento");
    }
    

    if (mail === "" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) {

        errores.push("Por favor, introduzca un email válido")

    }

    if (direccion === "") {
        errores.push("Por favor, introduzca una dirección");
    }

    if (errores.length != 0) {
        valido = false;
    }

    mostrarErrores(errores)
    return valido;
}

function mostrarErrores(errores) {
    let divErrores = document.getElementById("errores");
    divErrores.innerHTML = ""; // Modifica el HTML de dentro
    divErrores.style.display = "block"; // Mostrar div de errores

    if (errores.length === 0) {
        divErrores.style.display = "none"; // Ocultar div de errores si no hay errores
    } else {
        let ul = document.createElement("ul");

        errores.forEach(function(error) {
            let li = document.createElement("li");
            li.textContent = error;
            ul.appendChild(li);
        });

        divErrores.appendChild(ul);
    }
}
