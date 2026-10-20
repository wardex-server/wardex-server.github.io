(function () {
    'use strict';

    var PRODUCTS = {
        '1107365': { name: 'VIP', price: 9.99, image: 'https://cdn.easydonate.ru/images/products/26/80/26803048a182673d90c006febe8c89c6895ebc90b14b531caaa682959e5337f0.jpg', currency: false },
        '1117863': { name: 'premium', price: 59.99, image: 'https://cdn.easydonate.ru/images/products/ad/8d/ad8ded588d9b46a0547e1c17035c55ce781e757c0199c53c7d20c4133f305d92.jpg', currency: false },
        '1117899': { name: 'elite', price: 119.99, image: 'https://cdn.easydonate.ru/images/products/2e/a6/2ea61c5a9dd7ad3019628a0a80211ae162bc4a0fcc32041edd52d0a2d9f03308.jpg', currency: false },
        '1117989': { name: 'lord', price: 149.99, image: 'https://cdn.easydonate.ru/images/products/3d/9b/3d9b1d6cf437d542f7f3202907cd662ece7132799408ec6261663fe60017c9f3.jpg', currency: false },
        '1117990': { name: 'master', price: 199.99, image: 'https://cdn.easydonate.ru/images/products/f0/7f/f07f8da7792fa11eeb7bd532b5a7002e9f6c4cf993e6ae92cfedab37030d11e5.jpg', currency: false },
        '1117991': { name: 'overlord', price: 249.99, image: 'https://cdn.easydonate.ru/images/products/89/a5/89a527cfcce53ecac968fe8b69b1da0e2d1ce4b904a55e064023736071815f56.jpg', currency: false },
        '1117992': { name: 'legend', price: 299.99, image: 'https://cdn.easydonate.ru/images/products/9a/4f/9a4fee029fa3bc56265891aa1454b5a82c6dcdd15d24a00d148fe8ac86d41c63.jpg', currency: false },
        '1117993': { name: 'king', price: 389.99, image: 'https://cdn.easydonate.ru/images/products/5c/51/5c5198bef5ae949f67ec30e60c8b9ab1bad012d0716289117de75d574df90f7e.jpg', currency: false },
        '1117994': { name: 'imperator', price: 499.99, image: 'https://cdn.easydonate.ru/images/products/90/41/90415d7e7b9390ed01d2aacd52fa8e15602935ef1ff62f10a00b76c63bc774b0.jpg', currency: false },
        '1117995': { name: 'titan', price: 699.99, image: 'https://cdn.easydonate.ru/images/products/f1/93/f1935a8b1dd6a5b7ab3fd1be58808551c0375ee8a689c4c6152fdc97a032b511.jpg', currency: false },
        '1117997': { name: 'We-coin', price: 1.00, ratio: 50, image: 'https://cdn.easydonate.ru/images/products/d2/f7/d2f77d300aaa9c0af940d15d0c2baad1c61df0f08847bc8984f76a776628b5a4.jpg', currency: true }
    };
    var CURRENCY_MIN = 1;
    var CURRENCY_MAX = 1000000000;

    var cart = {};

    function fmt(n) {
        return Number(n).toFixed(2);
    }

    function priceOf(item) {
        var p = PRODUCTS[item.id];
        if (p.currency) {
            return CURRENCY_MIN; // cost comes from sum
        }
        return p.price;
    }

    function itemCost(item) {
        var p = PRODUCTS[item.id];
        if (!p) return 0;
        if (p.currency) return Number(item.sum) || 0;
        return p.price * (item.qty || 1);
    }

    function total() {
        var sum = 0;
        for (var k in cart) if (cart.hasOwnProperty(k)) sum += itemCost(cart[k]);
        return sum;
    }

    function count() {
        var n = 0;
        for (var k in cart) if (cart.hasOwnProperty(k)) n += (cart[k].qty || 1);
        return n;
    }

    function renderCounter() {
        var el = document.querySelector('.cart-counter');
        if (el) el.textContent = String(count());
    }

    function renderCost() {
        document.querySelectorAll('.cart-cost').forEach(function (el) {
            el.textContent = fmt(total());
        });
    }

    function emptyHtml() {
        return '<div class="col-md-12">' +
            '<div class="text-center text-uppercase">' +
            '<i class="fas fa-cogs text-light fa-3x"></i>' +
            '<p class="text-white text-small mb-0 mt-2">\u041a\u043e\u0440\u0437\u0438\u043d\u0430 \u043f\u0443\u0441\u0442\u0430</p>' +
            '</div></div>';
    }

    function currencyInputsHtml(id, item) {
        var p = PRODUCTS[id];
        return '' +
            '<div class="d-flex mb-4">' +
            '<div class="form-group my-auto">' +
            '<div class="input-group">' +
            '<input class="form-control border-0 bg-elegant js-cart-sum" data-ratio="' + p.ratio + '" value="' + (item.sum || 1) + '" placeholder="1" type="number" min="1" max="1000000000" name="sum" pattern="[0-9]*">' +
            '</div>' +
            '<small class="position-absolute">\u0421\u0443\u043c\u043c\u0430</small>' +
            '</div>' +
            '<div class="my-auto mx-2"><i class="fas fa-exchange-alt"></i></div>' +
            '<div class="form-group my-auto">' +
            '<div class="input-group">' +
            '<input class="form-control border-0 bg-elegant js-cart-amount" data-ratio="' + p.ratio + '" placeholder="50" value="' + (item.amount || 50) + '" type="number" min="1" max="1000000000" name="amount" pattern="[0-9]*">' +
            '</div>' +
            '<small class="position-absolute">\u041a\u043e\u043b\u0438\u0447\u0435\u0441\u0442\u0432\u043e</small>' +
            '</div>' +
            '</div>';
    }

    function itemHtml(id, item) {
        var p = PRODUCTS[id];
        var body;
        if (p.currency) {
            body = currencyInputsHtml(id, item);
        } else {
            body = '<div class="d-flex align-items-center mb-3">' +
                '<span class="badge badge-md bg-elegant font-weight-bolder">' + (item.qty || 1) + ' \u0448\u0442.</span>' +
                '</div>';
        }
        return '' +
            '<div class="col-md-12">' +
            '<div class="profile-card" id="cart-' + id + '">' +
            '<div class="card bg-elegant-dark border-0">' +
            '<div class="card-body">' +
            '<div class="row align-items-center">' +
            '<div class="col-3 px-0 my-auto">' +
            '<div class="card-image text-center">' +
            '<img class="img-fluid img-center shop-basket-image" src="' + p.image + '">' +
            '</div></div>' +
            '<div class="col-9 px-3 my-auto">' +
            '<div class="card-body p-2 text-white">' +
            '<h5 class="card-title mb-3 font-weight-bolder">' + p.name + '</h5>' +
            body +
            '<div class="mt-3">' +
            '<button class="btn mb-2 mr-2 btn-danger animate-up-2 js-cart-remove" type="button" data-product-id="' + id + '">' +
            '<i class="fas fa-trash fa-xs"></i>' +
            '</button>' +
            '</div>' +
            '</div></div></div></div></div></div></div>';
    }

    function render() {
        var box = document.querySelector('.cart-products');
        if (box) {
            var html = '';
            for (var k in cart) if (cart.hasOwnProperty(k)) html += itemHtml(k, cart[k]);
            box.innerHTML = html || emptyHtml();
            bindCartEvents(box);
        }
        renderCounter();
        renderCost();
    }

    function bindCartEvents(box) {
        box.querySelectorAll('.js-cart-remove').forEach(function (btn) {
            btn.addEventListener('click', function () {
                delete cart[btn.getAttribute('data-product-id')];
                render();
            });
        });
        box.querySelectorAll('#cart-1117997').forEach(function (card) {
            var p = PRODUCTS['1117997'];
            var sum = card.querySelector('.js-cart-sum');
            var amount = card.querySelector('.js-cart-amount');
            if (!sum || !amount) return;
            function clamp(v) {
                v = parseInt(v, 10);
                if (isNaN(v) || v < CURRENCY_MIN) v = CURRENCY_MIN;
                if (v > CURRENCY_MAX) v = CURRENCY_MAX;
                return v;
            }
            sum.addEventListener('input', function () {
                var v = clamp(sum.value);
                sum.value = v;
                amount.value = v * p.ratio;
                cart['1117997'].sum = v;
                cart['1117997'].amount = v * p.ratio;
                renderCost();
            });
            amount.addEventListener('input', function () {
                var v = clamp(amount.value);
                amount.value = v;
                var s = Math.max(CURRENCY_MIN, Math.round(v / p.ratio));
                sum.value = s;
                cart['1117997'].amount = v;
                cart['1117997'].sum = s;
                renderCost();
            });
        });
    }

    function addToCart(id) {
        var p = PRODUCTS[id];
        if (!p) return;
        if (!cart[id]) {
            cart[id] = { id: id, qty: 1 };
            if (p.currency) {
                cart[id].sum = 1;
                cart[id].amount = p.ratio;
            }
        } else if (!p.currency) {
            cart[id].qty += 1;
        }
        render();
        var modal = document.getElementById('cart');
        if (modal && window.jQuery) {
            window.jQuery('.modal.show').modal('hide');
            window.jQuery(modal).modal('show');
        }
    }

    document.addEventListener('click', function (e) {
        var addBtn = e.target.closest('[data-request="onAdd"]');
        if (addBtn) {
            e.preventDefault();
            var d = addBtn.getAttribute('data-request-data') || '';
            var m = d.match(/product_id:\s*(\d+)/);
            if (m && PRODUCTS[m[1]]) addToCart(m[1]);
            return;
        }
        var addBtn2 = e.target.closest('.product-modal button[data-request="onAdd"]');
        if (addBtn2) e.preventDefault();
        var flush = e.target.closest('[data-request="onFlush"]');
        if (flush) {
            e.preventDefault();
            cart = {};
            render();
            if (window.jQuery) window.jQuery('.modal').modal('hide');
        }
    }, true);

    document.addEventListener('DOMContentLoaded', function () {
        render();
    });

    window.__cart = { add: addToCart, render: render, data: function () { return cart; }, total: total };
})();
