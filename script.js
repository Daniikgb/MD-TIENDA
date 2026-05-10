// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger);

// --- PRODUCT DATA ---
const products = [
    { id: 1, name: "Hoodie Beige Embroidered", price: 275000, category: "hoodie", image: "CATALOGO/hoodie-beige-embroidered.png" },
    { id: 2, name: "Hoodie Black Cream", price: 270000, category: "hoodie", image: "CATALOGO/hoodie-black-cream.png" },
    { id: 3, name: "Hoodie Camel Premium", price: 265000, category: "hoodie", image: "CATALOGO/hoodie-camel-premium.png" },
    { id: 4, name: "Hoodie Green Hearten", price: 265000, category: "hoodie", image: "CATALOGO/hoodie-green-hearten.png" },
    { id: 5, name: "Hoodie Grey Puma", price: 280000, category: "hoodie", image: "CATALOGO/hoodie-grey-puma.png" },
    { id: 6, name: "Hoodie Orange Urban", price: 250000, category: "hoodie", image: "CATALOGO/hoodie-orange-urban.png" },
    { id: 7, name: "Chaqueta Denim Blue", price: 350000, category: "jacket", image: "CATALOGO/jacket-denim-blue.png" },
    { id: 8, name: "Chaqueta Denim Grey", price: 360000, category: "jacket", image: "CATALOGO/jacket-denim-grey.png" },
    { id: 9, name: "Lentes Aviator Gold", price: 125000, category: "acc", image: "CATALOGO/lentes-aviator-gold.png" },
    { id: 10, name: "Lentes Retro Black", price: 125000, category: "acc", image: "CATALOGO/lentes-retro-black.png" },
    { id: 11, name: "Sneaker Jordan Red", price: 450000, category: "sneaker", image: "CATALOGO/sneaker-jordan-red.png" },
    { id: 12, name: "Sneaker Nike White", price: 420000, category: "sneaker", image: "CATALOGO/sneaker-nike-white.png" },
    { id: 13, name: "Sneaker Yeezy Cream", price: 480000, category: "sneaker", image: "CATALOGO/sneaker-yeezy-cream.png" },
    { id: 14, name: "Remera Charif Black", price: 160000, category: "tee", image: "CATALOGO/tee-charif-black.png" },
    { id: 15, name: "Hoodie Hearten Burgundy", price: 275000, category: "hoodie", image: "CATALOGO/ChatGPT Image 8 may 2026, 10_55_38 a.m..png" },
    { id: 16, name: "Sudadera Zip Brown", price: 245000, category: "hoodie", image: "CATALOGO/ChatGPT Image 8 may 2026, 10_55_39 a.m..png" },
    { id: 17, name: "Hoodie Street Green", price: 260000, category: "hoodie", image: "CATALOGO/ChatGPT Image 8 may 2026, 10_55_55 a.m..png" },
    { id: 18, name: "Hoodie Script White", price: 270000, category: "hoodie", image: "CATALOGO/ChatGPT Image 8 may 2026, 11_03_27.png" },
    { id: 19, name: "Pack King 66 Tees", price: 380000, category: "tee", image: "CATALOGO/Q3KC6.jpg" },
    { id: 20, name: "Pack Polos Premium", price: 320000, category: "tee", image: "CATALOGO/Screenshot 2026-05-08 110021.png" },
    { id: 21, name: "Hoodie Nike Classic", price: 310000, category: "hoodie", image: "CATALOGO/Screenshot 2026-05-08 110032.png" }
];

const bentoItems = [
    { id: 11, title: "RED DROP", tag: "SNEAKERS", image: "CATALOGO/sneaker-jordan-red.png" },
    { id: 5, title: "PUMA STYLE", tag: "STREETWEAR", image: "CATALOGO/hoodie-grey-puma.png" },
    { id: 7, title: "DENIM", tag: "VINTAGE", image: "CATALOGO/jacket-denim-blue.png" },
    { id: 14, title: "BASIC BLACK", tag: "URBAN STYLE", image: "CATALOGO/tee-charif-black.png" },
    { id: 3, title: "CAMEL", tag: "PREMIUM", image: "CATALOGO/hoodie-camel-premium.png" },
];

const showcaseImages = [
    "CATALOGO/sneaker-nike-white.png",
    "CATALOGO/hoodie-black-cream.png",
    "CATALOGO/lentes-aviator-gold.png",
    "CATALOGO/hoodie-beige-embroidered.png",
];

// --- CORE FUNCTIONS ---

function init() {
    renderBento();
    renderShowcase();
    renderProducts("all");
    setupAnimations();
    setupEventListeners();
    updateCartBadge();
}

function renderBento() {
    const container = document.getElementById('bentoContainer');
    if (!container) return;
    container.innerHTML = bentoItems.map(item => `
        <div class="bento-item reveal" onclick="openProductModal(${item.id})">
            <img src="${item.image}" alt="${item.title}" class="bento-img">
            <div class="bento-content">
                <span class="bento-tag">${item.tag}</span>
                <h3 class="bento-title">${item.title}</h3>
            </div>
        </div>
    `).join('');
}

function renderShowcase() {
    const container = document.getElementById('showcaseCarousel');
    if (!container) return;
    
    // Duplicate products for infinite scroll effect
    const allProducts = [...products, ...products];
    
    container.innerHTML = allProducts.map(p => `
        <img src="${p.image}" alt="${p.name}" class="showcase-img" onclick="openProductModal(${p.id})">
    `).join('');

    // Infinite Scroll Animation with GSAP
    const totalWidth = container.scrollWidth / 2;
    
    gsap.to(container, {
        x: -totalWidth,
        duration: 100, // Significantly slower for a more premium editorial feel
        ease: "none",
        repeat: -1
    });
}

function renderProducts(filter) {
    const grid = document.getElementById('productGrid');
    if (!grid) return;
    
    const filtered = filter === "all" ? products : products.filter(p => p.category === filter);
    
    grid.innerHTML = filtered.map(p => `
        <div class="product-card" onclick="openProductModal(${p.id})">
            <div class="product-image">
                <img src="${p.image}" alt="${p.name}">
            </div>
            <div class="product-info">
                <h3 class="product-name">${p.name}</h3>
                <p class="product-price">₲${p.price.toLocaleString()}</p>
                <button class="add-to-cart">VER DETALLES</button>
            </div>
        </div>
    `).join('');
    
    // Animate new items
    gsap.fromTo("#productGrid .product-card", 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }
    );

    ScrollTrigger.refresh();
}

// --- CART LOGIC ---
let cart = [];

function updateCartBadge() {
    const badge = document.getElementById('cartBadge');
    if (badge) badge.innerText = cart.length;
}

function addToCart(productId, size) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    cart.push({ ...product, selectedSize: size });
    updateCartBadge();
    renderCart();
    openCart();
    closeProductModal();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartBadge();
    renderCart();
}

function renderCart() {
    const body = document.getElementById('cartBody');
    const totalAmt = document.getElementById('cartTotalAmt');
    if (!body || !totalAmt) return;

    if (cart.length === 0) {
        body.innerHTML = '<div class="cart-empty-msg">Tu carrito está vacío.</div>';
        totalAmt.innerText = "₲0";
        return;
    }

    let total = 0;
    body.innerHTML = cart.map((item, index) => {
        total += item.price;
        return `
            <div class="cart-item">
                <img src="${item.image}" class="cart-item-img">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-details">Talle: ${item.selectedSize} — ₲${item.price.toLocaleString()}</div>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart(${index})">Eliminar</button>
            </div>
        `;
    }).join('');

    totalAmt.innerText = `₲${total.toLocaleString()}`;
}

function checkout() {
    if (cart.length === 0) return;
    
    let message = "Hola MG TIENDA, quiero realizar este pedido:\n\n";
    let total = 0;
    
    cart.forEach((item, index) => {
        message += `${index + 1}. *${item.name}* (Talle: ${item.selectedSize}) - ₲${item.price.toLocaleString()}\n`;
        total += item.price;
    });
    
    message += `\n*TOTAL:* ₲${total.toLocaleString()}\n\n¡Espero tu confirmación!`;
    
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/595975311783?text=${encoded}`, '_blank');
}

function openCart() {
    document.getElementById('cartDrawer').classList.add('active');
    document.getElementById('cartOverlay').classList.add('active');
}

function closeCart() {
    document.getElementById('cartDrawer').classList.remove('active');
    document.getElementById('cartOverlay').classList.remove('active');
}

// --- ANIMATIONS ---
function setupAnimations() {
    // Reveal animation for sections
    gsap.utils.toArray('.reveal').forEach(el => {
        gsap.fromTo(el, 
            { opacity: 0, y: 50 },
            { 
                opacity: 1, 
                y: 0, 
                duration: 1, 
                ease: "power2.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                    toggleActions: "play none none none"
                }
            }
        );
    });

    // Hero Scrub Animation
    const tlScrub = gsap.timeline({
        scrollTrigger: {
            trigger: "#heroScrub",
            start: "top top",
            end: "bottom bottom",
            scrub: 1
        }
    });

    tlScrub.to("#titleTop", { x: -200, opacity: 0, duration: 1 }, 0)
           .to("#titleBottom", { x: 200, opacity: 0, duration: 1 }, 0)
           .fromTo("#heroCard", { scale: 0.8, opacity: 0 }, { scale: 1.2, opacity: 1, duration: 1 }, 0);

}
let currentProduct = null;
let selectedSize = 'XL';

function openProductModal(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;
    
    currentProduct = product;
    selectedSize = 'XL'; // Default size
    
    document.getElementById('modalProductImg').src = product.image;
    document.getElementById('modalProductTitle').innerText = product.name;
    document.getElementById('modalProductPrice').innerText = `₲${product.price.toLocaleString()}`;
    document.getElementById('modalProductCategory').innerText = product.category;
    document.getElementById('modalProductDesc').innerText = `Nuestra prenda ${product.name} está confeccionada con los más altos estándares de calidad, ofreciendo un fit cómodo y un estilo urbano inigualable para tu día a día.`;
    
    // Reset size buttons
    document.querySelectorAll('.size-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.size === 'XL') btn.classList.add('active');
    });

    document.getElementById('productModal').classList.add('active');
    document.getElementById('productModalOverlay').classList.add('active');
}

function closeProductModal() {
    document.getElementById('productModal').classList.remove('active');
    document.getElementById('productModalOverlay').classList.remove('active');
}

function setupEventListeners() {
    // Modal Close
    document.getElementById('closeProductModal')?.addEventListener('click', closeProductModal);
    document.getElementById('productModalOverlay')?.addEventListener('click', closeProductModal);

    // Size Selection
    document.querySelectorAll('.size-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedSize = btn.dataset.size;
        });
    });

    // Order Button
    document.getElementById('modalOrderBtn')?.addEventListener('click', () => {
        if (!currentProduct) return;
        const message = encodeURIComponent(`Hola MG TIENDA, quiero pedir este producto:\n\n*Producto:* ${currentProduct.name}\n*Talle:* ${selectedSize}\n*Precio:* ₲${currentProduct.price.toLocaleString()}\n\n¡Espero tu confirmación!`);
        window.open(`https://wa.me/595975311783?text=${message}`, '_blank');
    });

    // Cart open/close
    document.getElementById('navCartBtn')?.addEventListener('click', openCart);
    document.getElementById('cartCloseBtn')?.addEventListener('click', closeCart);
    document.getElementById('cartOverlay')?.addEventListener('click', closeCart);

    // Add to cart button in modal
    document.getElementById('modalAddCartBtn')?.addEventListener('click', () => {
        if (currentProduct) {
            addToCart(currentProduct.id, selectedSize);
        }
    });

    // Checkout button in cart drawer
    document.getElementById('checkoutBtn')?.addEventListener('click', checkout);

    // Filters
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderProducts(btn.dataset.filter);
        });
    });
}

// Initialize
window.onload = init;
