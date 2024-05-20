// Recuperar el título del producto del almacenamiento local
const productTitle = localStorage.getItem('productTitle');
if (productTitle) {
    document.getElementById('product-title').textContent = productTitle;
}
