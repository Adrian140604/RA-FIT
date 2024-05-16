// Función para incrementar la cantidad
function incrementarCantidad(boton) {
    var cantidadSpan = boton.parentElement.querySelector('.cantidad');
    var cantidad = parseInt(cantidadSpan.textContent);
    cantidadSpan.textContent = cantidad + 1;
}

// Función para decrementar la cantidad (sin bajar de 0)
function decrementarCantidad(boton) {
    var cantidadSpan = boton.parentElement.querySelector('.cantidad');
    var cantidad = parseInt(cantidadSpan.textContent);
    if (cantidad > 0) {
        cantidadSpan.textContent = cantidad - 1;
    }
}
