let currentProduct = {};

async function openDetails(id) {
    const res = await fetch(`/Products/Details/${id}`);
    currentProduct = await res.json();
    $('.modal-title').text(currentProduct.title);
    $('#detailImg').attr('src', currentProduct.image);
    $('#detailDesc').text(currentProduct.description);
    $('#detailPrice').text(currentProduct.price);
    $('#detailsModal').modal('show');
}

async function addToCart() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push(currentProduct);
    localStorage.setItem('cart', JSON.stringify(cart));
    $('#cartCount').text(cart.length);
    $('#detailsModal').modal('hide');
}
$('#cartBtn').on('click', () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    $('#cartBody').empty();
    let total = 0;
    cart.forEach(p => {
        $('#cartBody').append(`
          <div class="d-flex mb-2">
            <img src="${p.image}" width="50" height="50" class="me-2">
            <div>
              ${p.title}<br>
              <small>$${p.price}</small>
            </div>
          </div>`);
        total += p.price;
    });
    $('#cartTotal').text(total.toFixed(2));
    new bootstrap.Offcanvas('#cartCanvas').show();
});