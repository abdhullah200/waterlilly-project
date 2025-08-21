$(function () {
    const $cards = $('.product-card');

    // Populate category dropdown
    const cats = [...new Set($cards.map((_, el) => $(el).data('category')).get())];
    cats.forEach(c => $('#categoryFilter').append(`<option value="${c}">${c}</option>`));

    function filter() {
        const q = $('#searchBox').val().toLowerCase();
        const cat = $('#categoryFilter').val();
        $cards.hide().filter(function () {
            const title = $(this).data('title').includes(q);
            const category = cat ? $(this).data('category') === cat : true;
            return title && category;
        }).slice(0, 10).show(); // simple pagination
    }

    $('#searchBox, #categoryFilter').on('input change', filter);
});