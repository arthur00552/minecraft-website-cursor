// Global Variables
let cart = [];
let currentPlayerCount = 127;

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize Application
function initializeApp() {
    setupNavigation();
    setupScrollToTop();
    setupAnimations();
    setupFormHandlers();
    setupShopFilters();
    setupPageTransitions();
    updatePlayerCount();
    
    // Add page-specific functionality
    const currentPage = getCurrentPage();
    switch(currentPage) {
        case 'shop':
            setupShopPage();
            break;
        case 'login':
        case 'register':
            setupAuthPage();
            break;
        case 'index':
            setupHomePage();
            break;
    }
}

// Navigation Setup
function setupNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Scroll to Top Button
function setupScrollToTop() {
    const scrollTopBtn = document.getElementById('scrollTop');
    
    if (scrollTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });
        
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Animations Setup
function setupAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.feature-card, .event-card, .product-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Form Handlers
function setupFormHandlers() {
    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Register form
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
    
    // Input focus effects
    const inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="password"]');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });
}

// Shop Filters Setup
function setupShopFilters() {
    const categoryFilter = document.getElementById('categoryFilter');
    const sortFilter = document.getElementById('sortFilter');
    const searchInput = document.getElementById('searchInput');
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterProducts);
    }
    
    if (sortFilter) {
        sortFilter.addEventListener('change', filterProducts);
    }
    
    if (searchInput) {
        searchInput.addEventListener('input', filterProducts);
    }
}

// Page Transitions
function setupPageTransitions() {
    const links = document.querySelectorAll('a[href]');
    links.forEach(link => {
        if (link.hostname === window.location.hostname) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const href = this.getAttribute('href');
                navigateToPage(href);
            });
        }
    });
}

// Navigation function
function navigateToPage(url) {
    const transition = document.createElement('div');
    transition.className = 'page-transition';
    document.body.appendChild(transition);
    
    setTimeout(() => {
        window.location.href = url;
    }, 300);
}

// Get Current Page
function getCurrentPage() {
    const path = window.location.pathname;
    if (path.includes('shop')) return 'shop';
    if (path.includes('login')) return 'login';
    if (path.includes('register')) return 'register';
    return 'index';
}

// Home Page Setup
function setupHomePage() {
    // Copy IP functionality
    window.copyIP = function() {
        const ipAddress = 'play.myserver.com';
        navigator.clipboard.writeText(ipAddress).then(() => {
            showNotification('آدرس سرور کپی شد!', 'success');
        }).catch(() => {
            showNotification('خطا در کپی کردن آدرس', 'error');
        });
    };
    
    // Animate player count
    setInterval(updatePlayerCount, 5000);
}

// Shop Page Setup
function setupShopPage() {
    // Initialize product filtering
    filterProducts();
    
    // Add hover effects to product cards
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Auth Page Setup
function setupAuthPage() {
    // Password toggle functionality
    window.togglePassword = function() {
        const passwordInput = document.getElementById('password');
        const toggleBtn = document.querySelector('.toggle-password');
        
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            toggleBtn.textContent = '🙈';
        } else {
            passwordInput.type = 'password';
            toggleBtn.textContent = '👁️';
        }
    };
    
    window.toggleConfirmPassword = function() {
        const passwordInput = document.getElementById('confirmPassword');
        const toggleBtn = document.querySelector('.toggle-password');
        
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            toggleBtn.textContent = '🙈';
        } else {
            passwordInput.type = 'password';
            toggleBtn.textContent = '👁️';
        }
    };
}

// Product Filtering
function filterProducts() {
    const categoryFilter = document.getElementById('categoryFilter');
    const sortFilter = document.getElementById('sortFilter');
    const searchInput = document.getElementById('searchInput');
    const productsGrid = document.getElementById('productsGrid');
    
    if (!productsGrid) return;
    
    const products = Array.from(productsGrid.children);
    let filteredProducts = [...products];
    
    // Category filter
    if (categoryFilter && categoryFilter.value !== 'all') {
        filteredProducts = filteredProducts.filter(product => 
            product.dataset.category === categoryFilter.value
        );
    }
    
    // Search filter
    if (searchInput && searchInput.value.trim()) {
        const searchTerm = searchInput.value.toLowerCase();
        filteredProducts = filteredProducts.filter(product => {
            const title = product.querySelector('.product-title').textContent.toLowerCase();
            const description = product.querySelector('.product-description').textContent.toLowerCase();
            return title.includes(searchTerm) || description.includes(searchTerm);
        });
    }
    
    // Sort products
    if (sortFilter) {
        filteredProducts.sort((a, b) => {
            const priceA = parseInt(a.dataset.price);
            const priceB = parseInt(b.dataset.price);
            
            switch (sortFilter.value) {
                case 'price-low':
                    return priceA - priceB;
                case 'price-high':
                    return priceB - priceA;
                case 'popular':
                    return Math.random() - 0.5; // Simulate popularity
                case 'newest':
                    return Math.random() - 0.5; // Simulate newest
                default:
                    return 0;
            }
        });
    }
    
    // Update display
    products.forEach(product => {
        product.style.display = 'none';
    });
    
    filteredProducts.forEach(product => {
        product.style.display = 'block';
    });
    
    // Add animation to visible products
    setTimeout(() => {
        filteredProducts.forEach((product, index) => {
            product.style.animationDelay = `${index * 0.1}s`;
            product.classList.add('animate-in');
        });
    }, 100);
}

// Shopping Cart Functions
window.buyProduct = function(productName, price) {
    const existingItem = cart.find(item => item.name === productName);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: productName,
            price: price,
            quantity: 1
        });
    }
    
    showNotification(`${productName} به سبد خرید اضافه شد!`, 'success');
    updateCartDisplay();
};

function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (cartItems) {
        cartItems.innerHTML = '';
        
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <div class="cart-item-info">
                    <span class="cart-item-name">${item.name}</span>
                    <span class="cart-item-quantity">تعداد: ${item.quantity}</span>
                </div>
                <div class="cart-item-price">${formatPrice(item.price * item.quantity)}</div>
                <button class="remove-item" onclick="removeFromCart('${item.name}')">حذف</button>
            `;
            cartItems.appendChild(itemElement);
        });
    }
    
    if (cartTotal) {
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = formatPrice(total);
    }
}

window.removeFromCart = function(productName) {
    cart = cart.filter(item => item.name !== productName);
    updateCartDisplay();
    showNotification('آیتم از سبد خرید حذف شد!', 'info');
};

window.closeModal = function() {
    const modal = document.getElementById('cartModal');
    if (modal) {
        modal.style.display = 'none';
    }
};

window.checkout = function() {
    if (cart.length === 0) {
        showNotification('سبد خرید خالی است!', 'error');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    showNotification(`پرداخت ${formatPrice(total)} با موفقیت انجام شد!`, 'success');
    
    // Simulate payment processing
    const btn = document.querySelector('.modal-footer .btn-primary');
    const originalText = btn.textContent;
    btn.textContent = 'در حال پردازش...';
    btn.disabled = true;
    
    setTimeout(() => {
        cart = [];
        updateCartDisplay();
        closeModal();
        btn.textContent = originalText;
        btn.disabled = false;
    }, 2000);
};

// Form Handlers
function handleLogin(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const username = formData.get('username');
    const password = formData.get('password');
    
    // Simulate login process
    const submitBtn = e.target.querySelector('.btn-primary');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    
    btnText.style.display = 'none';
    btnLoading.style.display = 'block';
    
    setTimeout(() => {
        if (username && password) {
            showNotification('ورود با موفقیت انجام شد!', 'success');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        } else {
            showNotification('لطفاً تمام فیلدها را پر کنید!', 'error');
            btnText.style.display = 'block';
            btnLoading.style.display = 'none';
        }
    }, 1500);
}

function handleRegister(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const username = formData.get('username');
    const email = formData.get('email');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    const terms = formData.get('terms');
    
    // Validation
    if (!username || !email || !password || !confirmPassword) {
        showNotification('لطفاً تمام فیلدها را پر کنید!', 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showNotification('رمز عبور و تکرار آن مطابقت ندارند!', 'error');
        return;
    }
    
    if (!terms) {
        showNotification('لطفاً قوانین و شرایط را بپذیرید!', 'error');
        return;
    }
    
    // Simulate registration process
    const submitBtn = e.target.querySelector('.btn-primary');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    
    btnText.style.display = 'none';
    btnLoading.style.display = 'block';
    
    setTimeout(() => {
        showNotification('ثبت نام با موفقیت انجام شد!', 'success');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1000);
    }, 1500);
}

// Utility Functions
function formatPrice(price) {
    return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
}

function updatePlayerCount() {
    const playerCountElement = document.getElementById('playerCount');
    if (playerCountElement) {
        // Simulate player count changes
        const change = Math.floor(Math.random() * 10) - 5;
        currentPlayerCount = Math.max(100, Math.min(150, currentPlayerCount + change));
        playerCountElement.textContent = currentPlayerCount;
        
        // Add animation
        playerCountElement.style.transform = 'scale(1.2)';
        setTimeout(() => {
            playerCountElement.style.transform = 'scale(1)';
        }, 200);
    }
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">×</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--bg-card);
        border: 2px solid var(--border-color);
        border-radius: 10px;
        padding: 15px 20px;
        color: var(--text-light);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        box-shadow: 0 8px 25px var(--shadow-color);
    `;
    
    // Add type-specific colors
    switch (type) {
        case 'success':
            notification.style.borderColor = '#4CAF50';
            break;
        case 'error':
            notification.style.borderColor = '#F44336';
            break;
        case 'warning':
            notification.style.borderColor = '#FF9800';
            break;
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }
    }, 5000);
}

// Minecraft-themed sound effects (placeholder)
function playMinecraftSound(soundType) {
    // In a real implementation, you would play actual sound files
    console.log(`Playing Minecraft ${soundType} sound`);
}

// Add some Minecraft-themed easter eggs
document.addEventListener('keydown', function(e) {
    // Konami code for a surprise
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        playMinecraftSound('block_break');
    }
});

// Add particle effects to buttons
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn') || e.target.classList.contains('buy-btn')) {
        createParticles(e.target);
    }
});

function createParticles(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            left: ${centerX}px;
            top: ${centerY}px;
            width: 4px;
            height: 4px;
            background: var(--primary-gold);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
        `;
        
        document.body.appendChild(particle);
        
        const angle = (i / 8) * Math.PI * 2;
        const velocity = 50;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        let opacity = 1;
        const animate = () => {
            const currentX = parseFloat(particle.style.left);
            const currentY = parseFloat(particle.style.top);
            
            particle.style.left = (currentX + vx * 0.1) + 'px';
            particle.style.top = (currentY + vy * 0.1) + 'px';
            particle.style.opacity = opacity;
            
            opacity -= 0.02;
            
            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                document.body.removeChild(particle);
            }
        };
        
        requestAnimationFrame(animate);
    }
}

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(function() {
    // Scroll-based animations can go here
}, 16)); // ~60fps

console.log('🎮 Minecraft Server Website Loaded Successfully!');