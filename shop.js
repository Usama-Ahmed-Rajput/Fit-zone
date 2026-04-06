const products = [
    { id: 1, name: 'Esprit Ruffle Shirt', cat: 'women', price: 16.64, oldPrice: null, img: './images/shop-pg-imgs/shop-card-1.webp', badge: 'sale', stars: 4, reviews: 21 },
    { id: 2, name: 'Herschel Supply Bag', cat: 'bags', price: 35.31, oldPrice: 49.99, img: './images/shop-pg-imgs/shop-card-2.webp', badge: 'new', stars: 5, reviews: 34 },
    { id: 3, name: 'Only Check Trouser', cat: 'women', price: 25.50, oldPrice: null, img: './images/shop-pg-imgs/shop-card-3.webp', badge: null, stars: 4, reviews: 18 },
    { id: 4, name: 'Classic Trench Coat', cat: 'women', price: 75.00, oldPrice: 99.00, img: './images/shop-pg-imgs/shop-card-4.webp', badge: 'hot', stars: 5, reviews: 52 },
    { id: 5, name: 'Front Pocket Jumper', cat: 'men', price: 34.75, oldPrice: null, img: './images/shop-pg-imgs/shop-card-5.webp', badge: null, stars: 4, reviews: 14 },
    { id: 6, name: 'Vintage Inspired Classic', cat: 'men', price: 98.34, oldPrice: null, img: './images/shop-pg-imgs/shop-card-6.webp', badge: 'hot', stars: 5, reviews: 63 },
    { id: 7, name: 'Shirt in Stretch Cotton', cat: 'men', price: 43.16, oldPrice: 55.00, img: './images/shop-pg-imgs/shop-card-7.webp', badge: 'sale', stars: 4, reviews: 29 },
    { id: 8, name: 'Pieces Metallic Printed Top', cat: 'women', price: 56.35, oldPrice: null, img: './images/shop-pg-imgs/shop-card-8.webp', badge: 'new', stars: 4, reviews: 11 },
    { id: 9, name: 'Converse All Star Plimsolls', cat: 'shoes', price: 76.44, oldPrice: 89.99, img: './images/shop-pg-imgs/shop-card-9.webp', badge: 'hot', stars: 5, reviews: 87 },
    { id: 10, name: 'Femme T-Shirt In Stripe', cat: 'women', price: 26.54, oldPrice: null, img: './images/shop-pg-imgs/shop-card-10.webp', badge: null, stars: 4, reviews: 22 },
    { id: 11, name: 'Herschel Supply Backpack', cat: 'bags', price: 36.47, oldPrice: 49.00, img: './images/shop-pg-imgs/shop-card-11.webp', badge: 'sale', stars: 4, reviews: 17 },
    { id: 12, name: 'Herschel Crossbody Bag', cat: 'bags', price: 66.70, oldPrice: null, img: './images/shop-pg-imgs/shop-card-12.webp', badge: 'new', stars: 5, reviews: 39 },
    { id: 13, name: 'T-Shirt with Sleeve Detail', cat: 'men', price: 86.34, oldPrice: null, img: './images/shop-pg-imgs/shop-card-13.webp', badge: 'hot', stars: 4, reviews: 45 },
    { id: 14, name: 'Pretty Little Thing Dress', cat: 'women', price: 56.45, oldPrice: 70.00, img: './images/shop-pg-imgs/shop-card-14.webp', badge: 'sale', stars: 5, reviews: 68 },
    { id: 15, name: 'Mini Silver Mesh Watch', cat: 'watches', price: 86.84, oldPrice: null, img: './images/shop-pg-imgs/shop-card-15.webp', badge: 'new', stars: 5, reviews: 44 },
    { id: 16, name: 'Square Neck Back Dress', cat: 'women', price: 27.34, oldPrice: 39.99, img: './images/shop-pg-imgs/shop-card-16.webp', badge: 'sale', stars: 4, reviews: 33 },
];

let currentCat = 'all';

function stars(n) {
    let s = '';
    for (let i = 1; i <= 5; i++) s += `<i class="fas fa-star${i <= n ? '' : '-half-alt'}" style="${i <= n ? '' : 'color:#ccc'}"></i>`;
    return s;
}

function badgeHTML(b) {
    if (!b) return '';
    const map = { new: 'badge-new', sale: 'badge-sale', hot: 'badge-hot' };
    return `<span class="product-badge ${map[b]}">${b.toUpperCase()}</span>`;
}

function renderProducts(list) {
    const grid = document.getElementById('productGrid');
    const noRes = document.getElementById('noResults');
    if(!grid) return;
    
    grid.innerHTML = '';
    if (!list.length) { 
        noRes.style.display = 'block'; 
        document.getElementById('resultCount').textContent = '0 products'; 
        return; 
    }
    noRes.style.display = 'none';
    document.getElementById('resultCount').textContent = list.length + ' product' + (list.length !== 1 ? 's' : '');
    
    list.forEach((p, i) => {
        const oldPriceHTML = p.oldPrice ? `<span class="price-old">$${p.oldPrice.toFixed(2)}</span>` : '';
        grid.innerHTML += `
<div class="col-sm-6 col-xl-4 product-col" data-aos="fade-up" data-aos-delay="${(i % 3) * 60}">
    <div class="product-card">
        <div class="product-img-wrap">
            <img src="${p.img}" alt="${p.name}" loading="lazy" onerror="this.src='https://via.placeholder.com/300x400/e9ecef/555?text=Product'">
            ${badgeHTML(p.badge)}
            <div class="product-actions" style="position: absolute; right: 10px; top: 10px; display: flex; flex-direction: column; gap: 8px;">
                <button class="action-btn p-wishlist" title="Wishlist"><i class="fas fa-heart"></i></button>
            </div>
            <button class="p-add" onclick="window.addToCart('${p.id}', '${p.name.replace(/'/g, "\\'")}', ${p.price}, '${p.img}')">
                <i class="fas fa-shopping-bag me-2"></i>Add to Cart
            </button>
        </div>
        <div class="p-info">
            <div class="product-cat" style="font-size: 0.75rem; color: #888; text-transform: uppercase;">${p.cat}</div>
            <div class="p-name">${p.name}</div>
            <div class="p-price">
                <span class="price-current">$${p.price.toFixed(2)}</span>
                ${oldPriceHTML}
            </div>
            <div class="p-stars">
                ${[...Array(5)].map((_, j) => `<i class="fas fa-star${j < p.stars ? '' : ''}" style="${j >= p.stars ? 'color:#ddd' : ''}"></i>`).join('')}
                <span style="color:#666; font-size:0.8em">(${p.reviews})</span>
            </div>
        </div>
    </div>
</div>`;
    });
    // Safely refresh AOS if it exists
    if(typeof AOS !== 'undefined') {
        AOS.refreshHard();
    }
}

function applyFilters() {
    let list = [...products];
    if (currentCat !== 'all') list = list.filter(p => p.cat === currentCat);
    const q = document.getElementById('searchInput')?.value.toLowerCase() || '';
    if (q) list = list.filter(p => p.name.toLowerCase().includes(q));
    const min = parseFloat(document.getElementById('priceMin')?.value || 0);
    const max = parseFloat(document.getElementById('priceMax')?.value || 999);
    list = list.filter(p => p.price >= min && p.price <= max);
    sortList(list);
}

window.sortList = function(list) {
    const v = document.getElementById('sortSelect').value;
    if (v === 'price-low') list.sort((a, b) => a.price - b.price);
    if (v === 'price-high') list.sort((a, b) => b.price - a.price);
    if (v === 'name') list.sort((a, b) => a.name.localeCompare(b.name));
    renderProducts(list);
}

window.sortProducts = function() { applyFilters(); }

// Category filter buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        currentCat = this.dataset.cat;
        applyFilters();
    });
});

window.toggleSwatch = function(el) { el.classList.toggle('active'); }
window.toggleSize = function(el) { el.classList.toggle('active'); }

window.resetFilters = function() {
    currentCat = 'all';
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    document.querySelector('[data-cat="all"]').classList.add('active');
    if (document.getElementById('searchInput')) document.getElementById('searchInput').value = '';
    if (document.getElementById('priceMin')) document.getElementById('priceMin').value = 0;
    if (document.getElementById('priceMax')) document.getElementById('priceMax').value = 999;
    document.getElementById('sortSelect').value = 'default';
    renderProducts(products);
}

// Init
document.addEventListener('DOMContentLoaded', () => {
    if(document.getElementById('productGrid')) {
        renderProducts(products);
    }
});
