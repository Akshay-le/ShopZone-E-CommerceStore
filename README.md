# ShopZone — E-Commerce Product Page Clone

A full-featured e-commerce frontend built with **React.js** and **Context API** for global state management.

## Features

- **Product Listing Page** with responsive grid layout
- **Mock REST API** (`src/api/mockApi.js`) simulating real fetch() calls with delay
- **Cart System** using Context API + useReducer (add, remove, update quantity, clear)
- **Wishlist** using Context API + useState
- **Product Detail Modal** with image gallery, color picker, quantity selector
- **Search** — real-time filtering across title, category, description
- **Filter by Category** — dynamic from API
- **Sort** — by price, rating, reviews, discount
- **Price Range** slider filter
- **Cart Drawer** — slide-in with quantity controls, savings display, free shipping indicator
- **Loading Skeleton** — shimmer animation while fetching
- **Responsive Design** — mobile-first layout

## Project Structure

```
src/
├── api/
│   └── mockApi.js          ← Mock REST API with simulated delay
├── context/
│   ├── CartContext.js       ← Cart state (useReducer + Context)
│   └── WishlistContext.js   ← Wishlist state (useState + Context)
├── components/
│   ├── Navbar.js            ← Sticky top nav with search & cart
│   ├── ProductCard.js       ← Product card with add to cart
│   ├── ProductModal.js      ← Full product detail modal
│   └── CartDrawer.js        ← Slide-in cart drawer
├── pages/
│   └── ProductsPage.js      ← Main page with filter/sort logic
├── App.js                   ← Root component, providers
├── index.js                 ← React entry point
└── index.css                ← Global styles
```

## How to Run

### Prerequisites
- Node.js v16+ installed
- npm or yarn

### Steps

```bash
# 1. Navigate to project folder
cd ecommerce-product-page

# 2. Install dependencies
npm install

# 3. Start development server
npm start

# 4. Open browser at http://localhost:3000
```

## Key Concepts Used

| Concept | Where Used |
|---|---|
| Context API | CartContext, WishlistContext |
| useReducer | Cart state management |
| useState | Local component state |
| useEffect | Fetching from mock API |
| useMemo | Filtered/sorted products (performance) |
| Custom Hooks | useCart(), useWishlist() |
| Mock REST API | fetchProducts(), fetchProductById() |
| Responsive CSS | CSS Grid with auto-fill |
| Event Handling | onClick, onChange, onMouseEnter |

## Resume-Worthy Points

- Built Context API from scratch (no Redux)
- Mock REST API with realistic async/delay simulation
- useReducer for complex cart state
- useMemo for performance optimization on filtering
- Mobile-first responsive design
- Custom hooks for clean code separation
