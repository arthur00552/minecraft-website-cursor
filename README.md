# 🎮 Minecraft Server Website

A fully responsive, Persian (Farsi) Minecraft-themed website for a multiplayer Minecraft server. Built with HTML, CSS, and JavaScript with a golden color scheme and blocky, pixelated design elements.

## 🌟 Features

### Design & Theme
- **Minecraft Aesthetic**: Golden color scheme with blocky, pixelated elements
- **Persian (Farsi) Content**: Complete RTL (Right-to-Left) layout support
- **Responsive Design**: Adapts smoothly to desktops, tablets, and mobile devices
- **Minecraft Icons**: Swords, pickaxes, creepers, chests, and portals throughout the UI

### Pages
1. **Homepage** (`index.html`)
   - Server IP display with copy functionality
   - Real-time player count simulation
   - Server features showcase
   - Recent events section
   - Minecraft-themed animations

2. **Login Page** (`login.html`)
   - Animated input borders with glowing effects
   - Password visibility toggle
   - Remember me functionality
   - Form validation with Persian error messages

3. **Register Page** (`register.html`)
   - Complete registration form
   - Password confirmation
   - Terms and conditions acceptance
   - Newsletter subscription option

4. **Shop Page** (`shop.html`)
   - Product filtering by category (Ranks, Kits, Coins, Items)
   - Search functionality
   - Price sorting (low to high, high to low)
   - Interactive shopping cart
   - Animated product cards

### Interactive Features
- **Sticky Navigation**: Fixed navigation bar with smooth scrolling
- **Scroll-to-Top Button**: Animated button that appears when scrolling
- **Page Transitions**: Minecraft-inspired animated page transitions
- **Hover Effects**: Glowing borders and particle effects on buttons
- **Form Animations**: Animated input borders and focus effects
- **Shopping Cart**: Modal-based cart with add/remove functionality
- **Notifications**: Toast-style notifications for user feedback

## 🎨 Color Scheme

### Primary Colors
- **Primary Gold**: `#FFD700`
- **Secondary Gold**: `#FFA500`
- **Dark Gold**: `#B8860B`
- **Light Gold**: `#FFF8DC`

### Minecraft Block Colors
- **Grass Green**: `#7CB342`
- **Stone Gray**: `#757575`
- **Wood Brown**: `#8D6E63`
- **Diamond Blue**: `#4FC3F7`
- **Emerald Green**: `#4CAF50`
- **Redstone Red**: `#F44336`

## 📱 Responsive Design

The website uses CSS Grid and Flexbox for responsive layouts:

- **Desktop**: Full-featured layout with side-by-side content
- **Tablet**: Adjusted spacing and font sizes
- **Mobile**: Single-column layout with hamburger menu

### Breakpoints
- Mobile: `< 768px`
- Tablet: `768px - 1024px`
- Desktop: `> 1024px`

## 🛠️ Technical Implementation

### HTML Structure
- Semantic HTML5 elements
- RTL (Right-to-Left) direction for Persian text
- Proper ARIA labels for accessibility
- SEO-friendly meta tags

### CSS Features
- CSS Custom Properties (variables) for consistent theming
- CSS Grid and Flexbox for layouts
- CSS Animations and Transitions
- Mobile-first responsive design
- CSS-only loading spinners and effects

### JavaScript Functionality
- **Modular Architecture**: Organized into logical functions
- **Event Handling**: Comprehensive event listeners
- **Form Validation**: Client-side validation with Persian messages
- **Shopping Cart**: Local storage-based cart system
- **Animations**: Intersection Observer for scroll-based animations
- **Performance**: Throttled scroll events and optimized animations

## 🎯 Key JavaScript Functions

### Core Functions
- `initializeApp()`: Main initialization function
- `setupNavigation()`: Mobile menu and navigation setup
- `setupAnimations()`: Scroll-based animations
- `filterProducts()`: Shop filtering and sorting
- `showNotification()`: Toast notification system

### Form Handling
- `handleLogin()`: Login form processing
- `handleRegister()`: Registration form processing
- `togglePassword()`: Password visibility toggle

### Shopping Cart
- `buyProduct()`: Add items to cart
- `removeFromCart()`: Remove items from cart
- `checkout()`: Simulate payment process

## 🚀 Getting Started

1. **Clone or Download** the project files
2. **Open `index.html`** in a web browser
3. **Navigate** through the different pages using the navigation menu

### File Structure
```
minecraft-website/
├── index.html          # Homepage
├── login.html          # Login page
├── register.html       # Registration page
├── shop.html           # Shop page
├── styles.css          # Main stylesheet
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## 🎮 Minecraft Theme Elements

### Visual Elements
- **Blocky Borders**: Pixelated border effects
- **Golden Glow**: Glowing effects on interactive elements
- **Minecraft Icons**: Emoji-based icons (swords, pickaxes, etc.)
- **Floating Blocks**: Animated background elements
- **Portal Effects**: Rotating portal animations

### Interactive Elements
- **Particle Effects**: Button click animations
- **Hover Animations**: Card lift and glow effects
- **Form Animations**: Input border animations
- **Page Transitions**: Minecraft-style page changes

## 📊 Browser Support

- **Chrome**: Full support
- **Firefox**: Full support
- **Safari**: Full support
- **Edge**: Full support
- **Mobile Browsers**: Full responsive support

## 🔧 Customization

### Adding New Products
To add new products to the shop, add a new product card in `shop.html`:

```html
<div class="product-card" data-category="ranks" data-price="75000">
    <div class="product-badge vip">VIP+</div>
    <div class="product-icon">👑</div>
    <h3 class="product-title">رنک VIP+</h3>
    <!-- ... rest of product content ... -->
</div>
```

### Changing Colors
Modify the CSS custom properties in `styles.css`:

```css
:root {
    --primary-gold: #FFD700;
    --secondary-gold: #FFA500;
    /* ... other colors ... */
}
```

### Adding New Pages
1. Create new HTML file
2. Include the navigation structure
3. Add page-specific JavaScript functions
4. Update navigation links

## 🎨 Design Principles

### Minecraft Aesthetic
- **Blocky Design**: Sharp edges and pixelated elements
- **Golden Theme**: Consistent gold color usage
- **Glowing Effects**: Subtle glow animations
- **Texture Patterns**: Minecraft block-inspired patterns

### Persian (Farsi) Support
- **RTL Layout**: Right-to-left text direction
- **Persian Font**: Vazirmatn font family
- **Persian Content**: All text in Persian language
- **Cultural Adaptation**: Persian date formats and number systems

## 🚀 Performance Features

- **Optimized Animations**: Hardware-accelerated CSS animations
- **Throttled Events**: Performance-optimized scroll handlers
- **Lazy Loading**: Intersection Observer for animations
- **Minimal Dependencies**: No external libraries required

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to contribute to this project by:
- Adding new features
- Improving animations
- Enhancing accessibility
- Adding more Minecraft-themed elements

## 🎮 Minecraft Server Integration

This website is designed to work with a Minecraft server. To integrate:

1. **Update Server IP**: Change the IP address in the homepage
2. **Connect to API**: Integrate with server API for real player counts
3. **Payment Gateway**: Connect shopping cart to payment processor
4. **Database**: Add backend for user accounts and purchases

---

**Built with ❤️ for the Minecraft community**

*Experience the magic of Minecraft in your browser!*