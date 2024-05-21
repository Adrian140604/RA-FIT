document.addEventListener("DOMContentLoaded", () => {
    const incrementButton = document.getElementById("increment");
    const decrementButton = document.getElementById("decrement");
    const counterElement = document.getElementById("counter");
    const totalElement = document.getElementById("total");

    let count = 0;
    const pricePerItem = 35.55; // Precio del producto

    function updateTotal() {
        totalElement.textContent = (count * pricePerItem).toFixed(2);
    }

    incrementButton.addEventListener("click", () => {
        count++;
        counterElement.textContent = count;
        updateTotal();
    });

    decrementButton.addEventListener("click", () => {
        if (count > 0) {
            count--;
            counterElement.textContent = count;
            updateTotal();
        }
    });

    // Función para agregar al carrito
    function addToCart(id, name, price) {
        // Crear un objeto de producto
        const product = {
            id: id,
            name: name,
            price: price,
            quantity: count
        };

        // Obtener el carrito actual del almacenamiento local
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Agregar el producto al carrito
        cart.push(product);

        // Guardar el carrito actualizado en el almacenamiento local
        localStorage.setItem('cart', JSON.stringify(cart));

        // Redirigir a la página de confirmación de añadido al carrito
        window.location.href = '../HTML/añadido_correcto.html';
    }
});
