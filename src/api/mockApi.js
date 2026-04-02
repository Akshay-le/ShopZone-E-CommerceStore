// Mock REST API — simulates fetch() delay like a real backend

const products = [
  {
    id: 1,
    title: "Wireless Noise-Cancelling Headphones",
    category: "Electronics",
    price: 2999,
    originalPrice: 4999,
    rating: 4.5,
    reviews: 1284,
    stock: 15,
    badge: "Best Seller",
    description:
      "Experience crystal-clear audio with active noise cancellation. Up to 30 hours of battery life with fast charging. Premium comfort for long listening sessions.",
    features: [
      "Active Noise Cancellation",
      "30hr Battery Life",
      "Bluetooth 5.2",
      "Foldable Design",
      "Built-in Mic",
    ],
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&q=80",
    ],
    colors: ["#1a1a1a", "#f5f5f5", "#1d4ed8"],
  },
  {
    id: 2,
    title: "Smart Fitness Watch Pro",
    category: "Wearables",
    price: 4499,
    originalPrice: 6999,
    rating: 4.3,
    reviews: 876,
    stock: 8,
    badge: "New",
    description:
      "Track your health 24/7 with heart rate, SpO2, sleep monitoring, and 100+ workout modes. Water-resistant up to 50m.",
    features: [
      "Heart Rate Monitor",
      "SpO2 Sensor",
      "GPS Tracking",
      "100+ Sports Modes",
      "5 ATM Water Resistant",
    ],
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80",
      "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=400&q=80",
    ],
    colors: ["#1a1a1a", "#f59e0b", "#10b981"],
  },
  {
    id: 3,
    title: "Mechanical Gaming Keyboard",
    category: "Accessories",
    price: 3299,
    originalPrice: 4299,
    rating: 4.7,
    reviews: 2103,
    stock: 23,
    badge: "Top Rated",
    description:
      "RGB backlit mechanical keyboard with tactile switches. N-key rollover, anti-ghosting, and detachable USB-C cable for gamers.",
    features: [
      "Cherry MX Switches",
      "Per-key RGB",
      "N-Key Rollover",
      "USB-C Detachable",
      "Aluminum Frame",
    ],
    images: [
      "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&q=80",
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80",
    ],
    colors: ["#1a1a1a", "#7c3aed"],
  },
  {
    id: 4,
    title: "Portable Bluetooth Speaker",
    category: "Electronics",
    price: 1799,
    originalPrice: 2499,
    rating: 4.2,
    reviews: 543,
    stock: 31,
    badge: "Sale",
    description:
      "360° surround sound with deep bass in a compact design. IPX7 waterproof, 12-hour battery, and built-in microphone for calls.",
    features: [
      "360° Sound",
      "IPX7 Waterproof",
      "12hr Battery",
      "Bluetooth 5.0",
      "Built-in Mic",
    ],
    images: [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&q=80",
      "https://images.unsplash.com/photo-1589003077984-894e133dabab?w=400&q=80",
    ],
    colors: ["#1a1a1a", "#ef4444", "#3b82f6"],
  },
  {
    id: 5,
    title: "4K Webcam with Ring Light",
    category: "Accessories",
    price: 2199,
    originalPrice: 3199,
    rating: 4.4,
    reviews: 398,
    stock: 12,
    badge: null,
    description:
      "Professional 4K webcam with built-in ring light for perfect video calls. Autofocus, noise-cancelling mic, and plug-and-play USB setup.",
    features: [
      "4K Resolution",
      "Built-in Ring Light",
      "Autofocus",
      "Noise-Cancel Mic",
      "Plug & Play USB",
    ],
    images: [
      "https://images.unsplash.com/photo-1587826801093-6b56f2218ee4?w=400&q=80",
      "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&q=80",
    ],
    colors: ["#1a1a1a", "#f5f5f5"],
  },
  {
    id: 6,
    title: "Ergonomic Office Chair",
    category: "Furniture",
    price: 12999,
    originalPrice: 18999,
    rating: 4.6,
    reviews: 712,
    stock: 5,
    badge: "Limited",
    description:
      "Premium ergonomic chair with lumbar support, adjustable armrests, and breathable mesh back. Designed for all-day comfort.",
    features: [
      "Lumbar Support",
      "Adjustable Armrests",
      "Mesh Backrest",
      "360° Swivel",
      "Height Adjustable",
    ],
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80",
    ],
    colors: ["#1a1a1a", "#f5f5f5", "#1d4ed8"],
  },
];

// Simulated fetch with artificial delay
export const fetchProducts = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve([...products]), 700);
  });

export const fetchProductById = (id) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const product = products.find((p) => p.id === parseInt(id));
      product ? resolve({ ...product }) : reject(new Error("Product not found"));
    }, 400);
  });

export const fetchCategories = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      const cats = ["All", ...new Set(products.map((p) => p.category))];
      resolve(cats);
    }, 300);
  });
