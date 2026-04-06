
    /* ── SLIDER ── */
    const slides = document.querySelectorAll('.slide');
    if (slides.length > 0) {
      let currentSlide = 0;
      const dots = document.querySelectorAll('.slider-dot');
      let autoTimer;

      // Ensure `goSlide` and `changeSlide` are in global scope so inline onclick works
      window.goSlide = function(n) {
        slides[currentSlide].classList.remove('active');
        if(dots[currentSlide]) dots[currentSlide].classList.remove('active');
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        if(dots[currentSlide]) dots[currentSlide].classList.add('active');
      }
      
      window.changeSlide = function(d) {
        clearInterval(autoTimer); 
        window.goSlide(currentSlide + d); 
        startAuto(); 
      }
      
      function startAuto() { 
        autoTimer = setInterval(() => window.goSlide(currentSlide + 1), 5000); 
      }
      
      startAuto();
    }

    /* ── HOME PRODUCTS ── */
    const homeProductGrid = document.getElementById('homeProductGrid');
    if (homeProductGrid) {
      const homeProducts = [
        { name: 'Classic Men\'s Shirt', cat: 'men', price: 35, img: './images/shirts-img.webp' },
        { name: 'Elegant Women\'s Dress', cat: 'women', price: 49, img: './images/women-shirt.webp' },
        { name: 'Comfort Sneakers', cat: 'shoes', price: 59, img: './images/comfort-sneakers.webp' },
        { name: 'High Waist Jeans', cat: 'women', price: 42, img: './images/jeans.webp' },
        { name: 'Leather Jacket', cat: 'men', price: 99, img: './images/men-jacket.webp' },
        { name: 'Stylish Heels', cat: 'shoes', price: 55, img: './images/women-heels.webp' },
        { name: 'Royal Watches', cat: 'watches', price: 190, img: './images/Watches-img.webp' },
        { name: 'Classic Men\'s T-shirt', cat: 'men', price: 65, img: './images/white-tshirt2.webp' },
      ];

      let hpCat = 'all';
      function renderHomeProducts() {
        const list = hpCat === 'all' ? homeProducts : homeProducts.filter(p => p.cat === hpCat);
        homeProductGrid.innerHTML = list.map((p, i) => `
      <div class="col-6 col-md-4 col-lg-3" data-aos="fade-up" data-aos-delay="${(i % 4) * 60}">
          <div class="product-card">
              <div class="product-img-wrap">
                  <img src="${p.img}" alt="${p.name}" loading="lazy" onerror="this.src='https://via.placeholder.com/300x400/e9ecef/555?text=Product'">
                  <span class="product-badge badge-new">NEW</span>
                  <button class="p-wishlist"><i class="fas fa-heart"></i></button>
                  <button class="p-add btn-cart" onclick="addToCart('${p.id || p.name}', '${p.name}', ${p.price}, '${p.img}')">
                      <i class="fas fa-shopping-bag me-2"></i>Add to Cart
                  </button>
              </div>
              <div class="p-info">
                  <div class="p-name">${p.name}</div>
                  <div class="p-price">$${p.price.toFixed(2)}</div>
                  <div class="p-stars">
                      ${[...Array(5)].map((_, j) => `<i class="fas fa-star${j < 4 ? '' : ''}" ${j >= 4 ? 'style="color:#ddd"' : ''}></i>`).join('')}
                  </div>
              </div>
          </div>
      </div>`).join('');
        if (typeof AOS !== 'undefined') AOS.refreshHard();
      }

      document.querySelectorAll('.hp-filter').forEach(btn => {
        btn.addEventListener('click', function () {
          document.querySelectorAll('.hp-filter').forEach(b => {
            b.style.background = '#fff'; b.style.color = '#555'; b.style.borderColor = '#e9ecef';
          });
          this.style.background = 'var(--accent)'; this.style.color = '#fff'; this.style.borderColor = 'var(--accent)';
          hpCat = this.dataset.cat; 
          renderHomeProducts();
        });
      });

      renderHomeProducts();
    }

    /* ── COUNTDOWN ── */
    if (document.getElementById('cd1h')) {
      let endTime = Date.now() + 12 * 3600 * 1000 + 34 * 60 * 1000;
      function updateCountdown() {
        const diff = Math.max(0, endTime - Date.now());
        const h = Math.floor(diff / 3600000);
        const m = Math.floor((diff % 3600000) / 60000);
        const s = Math.floor((diff % 60000) / 1000);
        
        const hEl = document.getElementById('cd1h');
        const mEl = document.getElementById('cd1m');
        const sEl = document.getElementById('cd1s');

        if (hEl) hEl.textContent = String(h).padStart(2, '0');
        if (mEl) mEl.textContent = String(m).padStart(2, '0');
        if (sEl) sEl.textContent = String(s).padStart(2, '0');
      }
      setInterval(updateCountdown, 1000); 
      updateCountdown();
    }

    /* ── NEWSLETTER ── */
    window.subscribeEmail = function() {
      const emailInput = document.getElementById('emailInput');
      if (!emailInput) return;
      const email = emailInput.value.trim();
      if (!email.includes('@')) { alert('Please enter a valid email.'); return; }
      emailInput.value = '';
      alert('🎉 Thank you! You\'re subscribed to FitZone updates.');
    }