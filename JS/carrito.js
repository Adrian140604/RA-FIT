document.addEventListener('DOMContentLoaded', function () {
    const cartItems = document.querySelectorAll('.cart-item');
    const totalAmountElement = document.getElementById('total-amount');
    const checkoutButton = document.getElementById('checkout');

    cartItems.forEach(item => {
        const decreaseButton = item.querySelector('.decrease');
        const increaseButton = item.querySelector('.increase');
        const quantityInput = item.querySelector('input[type="number"]');
        const priceElement = item.querySelector('.item-details p');
        const price = parseFloat(priceElement.textContent.replace('€', ''));

        decreaseButton.addEventListener('click', () => updateQuantity(quantityInput, price, -1));
        increaseButton.addEventListener('click', () => updateQuantity(quantityInput, price, 1));
        quantityInput.addEventListener('change', updateTotal);
    });

    checkoutButton.addEventListener('click', () => {
        const totalAmount = parseFloat(totalAmountElement.textContent);
        if (totalAmount > 0) {
            // Realizar alguna acción, como redirigir a otra página
            console.log('Pago realizado con éxito');
        } else {
            console.log('El carrito está vacío. No se puede realizar el pago.');
        }
    });

    function updateQuantity(input, price, change) {
        let currentValue = parseInt(input.value);
        if (isNaN(currentValue)) currentValue = 0;
        const newValue = currentValue + change;
        if (newValue >= 0) {
            input.value = newValue;
            updateTotal();
        }
    }

    function updateTotal() {
        let total = 0;
        cartItems.forEach(item => {
            const quantityInput = item.querySelector('input[type="number"]');
            const priceElement = item.querySelector('.item-details p');
            const price = parseFloat(priceElement.textContent.replace('€', ''));
            const quantity = parseInt(quantityInput.value);
            total += price * quantity;
        });
        totalAmountElement.textContent = total.toFixed(2) + ' €';
    }

    updateTotal(); // Initialize the total on page load
});
