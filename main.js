// ============================================
// FITZONE - UNIFIED JAVASCRIPT FOR ALL PAGES
// ============================================

// ============================================
// UTILITY FUNCTIONS
// ============================================

function getScrollbarWidth() {
    const outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll';
    document.body.appendChild(outer);
    const inner = document.createElement('div');
    outer.appendChild(inner);
    const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
    outer.parentNode.removeChild(outer);
    return scrollbarWidth;
}
document.documentElement.style.setProperty('--scrollbar-width', `${getScrollbarWidth()}px`);

// ============================================
// AUTO-DETECT ACTIVE PAGE & HIGHLIGHT NAV
// ============================================

function setActivePage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `./${currentPage}` || link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}
document.addEventListener('DOMContentLoaded', setActivePage);

// ============================================
// SHOPPING CART LOGIC (LOCAL STORAGE & NEW UI)
// ============================================

let cart = [];
try {
    const stored = localStorage.getItem("fitzone-cart");
    cart = stored ? JSON.parse(stored) : [];
} catch (e) {
    console.error("Error loading cart:", e);
    cart = [];
}

window.toggleCart = function() {
    const overlay = document.getElementById('cartOverlay');
    const drawer = document.getElementById('cartDrawer');
    if (overlay && drawer) {
        overlay.classList.toggle('open');
        drawer.classList.toggle('open');
        if (drawer.classList.contains('open')) {
            const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
            document.body.style.paddingRight = scrollBarWidth + 'px';
            document.body.classList.add('cart-open');
        } else {
            document.body.style.paddingRight = '';
            document.body.classList.remove('cart-open');
        }
    }
}

window.addToCart = function(id, name, price, img) {
    if(!id) id = name;
    if(!img) img = 'https://via.placeholder.com/70x70/e9ecef/555?text=P';
    
    // Normalize price if it comes as string
    if (typeof price === 'string') {
        price = parseFloat(price.replace(/[^0-9.]/g, ''));
    }

    const existingProduct = cart.find(item => item.id === id);
    if (existingProduct) {
        existingProduct.quantity += 1;
        showNotification(`Added another ${name} to cart!`);
    } else {
        cart.push({ id, name, price, img, quantity: 1 });
        showNotification(`${name} added to cart!`);
    }

    saveCart();
    renderCart();

    const overlay = document.getElementById('cartOverlay');
    if (overlay && !overlay.classList.contains('open')) {
        window.toggleCart();
    }
}

window.changeQty = function(id, amount) {
    const product = cart.find(item => item.id === id);
    if (!product) return;
    product.quantity += amount;
    if (product.quantity <= 0) {
        cart = cart.filter(item => item.id !== id);
    }
    saveCart();
    renderCart();
}

window.removeFromCart = function(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    renderCart();
}

function saveCart() {
    try {
        localStorage.setItem("fitzone-cart", JSON.stringify(cart));
    } catch (e) {
        console.error("Error saving cart:", e);
    }
}

window.renderCart = function() {
    const itemsContainer = document.getElementById('cartItems');
    const footer = document.getElementById('cartFooter');
    const badge = document.getElementById('cartBadge');
    const countDisplay = document.getElementById('cartCount');
    const totalDisplay = document.getElementById('cartTotal');
    const grandTotalDisplay = document.getElementById('cartGrandTotal');

    if (!itemsContainer) return;

    const count = cart.reduce((s, i) => s + i.quantity, 0);
    const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);

    if (badge) badge.textContent = count;
    if (countDisplay) countDisplay.textContent = count > 0 ? `(${count})` : '';

    if (cart.length === 0) {
        itemsContainer.innerHTML = `
            <div class="empty-cart" id="emptyCart">
                <i class="fas fa-shopping-bag"></i>
                <p>Your cart is empty</p>
                <a href="./shop.html" class="btn rounded-pill px-4 fw-600"
                style="background:var(--accent);color:#fff;border:none;" onclick="toggleCart()">Start Shopping</a>
            </div>
        `;
        if (footer) footer.style.display = 'none';
        return;
    }

    if (footer) footer.style.display = 'block';

    itemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.img}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/70x70/e9ecef/555?text=P'">
            <div class="cart-item-info">
                <strong>${item.name}</strong>
                <div class="d-flex align-items-center mt-1" style="gap:10px;">
                    <div style="background:#f1f1f1; border-radius:4px; display:inline-flex; align-items:center; overflow:hidden;">
                        <button onclick="changeQty('${item.id}', -1)" style="border:none;background:none;padding:2px 8px;cursor:pointer;">-</button>
                        <span style="font-size:0.8rem; font-weight:600; padding:0 4px;">${item.quantity}</span>
                        <button onclick="changeQty('${item.id}', 1)" style="border:none;background:none;padding:2px 8px;cursor:pointer;">+</button>
                    </div>
                    <span class="cart-item-price" style="margin:0;">$${(item.price * item.quantity).toFixed(2)}</span>
                </div>
            </div>
            <button class="cart-remove" onclick="removeFromCart('${item.id}')"><i class="fas fa-trash-alt"></i></button>
        </div>
    `).join('');

    if (totalDisplay) totalDisplay.textContent = '$' + total.toFixed(2);
    if (grandTotalDisplay) grandTotalDisplay.textContent = '$' + total.toFixed(2);
}

// ============================================
// NOTIFICATION SYSTEM
// ============================================

function showNotification(message) {
    const toast = document.getElementById('addToast') || document.getElementById('cartToast');
    if (toast) {
        toast.innerHTML = `<i class="fas fa-check-circle me-2"></i><span>${message}</span>`;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
    } else {
        // Fallback generic notification
        let notif = document.createElement('div');
        notif.style.position = 'fixed';
        notif.style.bottom = '20px';
        notif.style.left = '50%';
        notif.style.transform = 'translateX(-50%)';
        notif.style.background = 'var(--accent, #e94560)';
        notif.style.color = '#fff';
        notif.style.padding = '10px 20px';
        notif.style.borderRadius = '50px';
        notif.style.zIndex = '9999';
        notif.style.fontWeight = '600';
        notif.innerHTML = `<i class="fas fa-check-circle me-2"></i> ${message}`;
        document.body.appendChild(notif);
        setTimeout(() => notif.remove(), 3000);
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    renderCart();
});