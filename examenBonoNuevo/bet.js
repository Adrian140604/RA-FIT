document.getElementById('betForm').addEventListener('submit', function(e) {
    let numeros = document.querySelectorAll('input[name="numeros[]"]');
    let estrellas = document.querySelectorAll('input[name="estrellas[]"]');

    let numerosArray = [];
    let estrellasArray = [];

    // Comprobar si los números son válidos y duplicados
    for (let i = 0; i < numeros.length; i++) {
        let numero = parseInt(numeros[i].value);
        if (isNaN(numero) || numero < 1 || numero > 50) {
            alert("Los números deben estar entre 1 y 50.");
            e.preventDefault(); // Prevenir el envío del formulario
            return;
        }
        if (numerosArray.includes(numero)) {
            alert("No puedes seleccionar números duplicados.");
            e.preventDefault(); // Prevenir el envío del formulario
            return;
        }
        numerosArray.push(numero);
    }

    // Comprobar si las estrellas son válidas y duplicadas
    for (let i = 0; i < estrellas.length; i++) {
        let estrella = parseInt(estrellas[i].value);
        if (isNaN(estrella) || estrella < 1 || estrella > 10) {
            alert("Las estrellas deben estar entre 1 y 10.");
            e.preventDefault(); // Prevenir el envío del formulario
            return;
        }
        if (estrellasArray.includes(estrella)) {
            alert("No puedes seleccionar estrellas duplicadas.");
            e.preventDefault(); // Prevenir el envío del formulario
            return;
        }
        estrellasArray.push(estrella);
    }
});
