document.addEventListener("DOMContentLoaded", () => {
    const incrementButton = document.getElementById("increment");
    const decrementButton = document.getElementById("decrement");
    const counterElement = document.getElementById("counter");
    const totalElement = document.getElementById("total");

    let count = 0;
    const pricePerItem = 30.00; // Precio del producto

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
});