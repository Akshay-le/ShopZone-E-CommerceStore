import React, { useState, useEffect, useMemo } from "react";
import { fetchProducts, fetchCategories } from "../api/mockApi";
import ProductCard from "../components/ProductCard";
import ProductModal from "../components/ProductModal";

const SORT_OPTIONS = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Top Rated", value: "rating" },
  { label: "Most Reviews", value: "reviews" },
  { label: "Discount", value: "discount" },
];

export default function ProductsPage({ searchQuery }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 20000]);

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchProducts(), fetchCategories()]).then(([prods, cats]) => {
      setProducts(prods);
      setCategories(cats);
      setLoading(false);
    });
  }, []);

  const filtered = useMemo(() => {
    let result = [...products];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    if (selectedCategory !== "All") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );


    switch (sortBy) {
      case "price_asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "reviews":
        result.sort((a, b) => b.reviews - a.reviews);
        break;
      case "discount":
        result.sort(
          (a, b) =>
            (b.originalPrice - b.price) / b.originalPrice -
            (a.originalPrice - a.price) / a.originalPrice
        );
        break;
      default:
        break;
    }

    return result;
  }, [products, searchQuery, selectedCategory, sortBy, priceRange]);

  return (
    <div style={styles.page}>
      {/* Hero Banner */}
      <div style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Premium Tech at Best Prices</h1>
          <p style={styles.heroSub}>Free delivery on orders above ₹5,000 · 30-day returns</p>
          <div style={styles.heroBadges}>
            <span style={styles.heroBadge}>⚡ Flash Deals</span>
            <span style={styles.heroBadge}>🚚 Free Shipping</span>
            <span style={styles.heroBadge}>✓ Genuine Products</span>
          </div>
        </div>
      </div>

      <div style={styles.container}>
        {/* Filters row */}
        <div style={styles.filtersBar}>
          <div style={styles.categoryWrap}>
            {categories.map((cat) => (
              <button
                key={cat}
                style={{
                  ...styles.catBtn,
                  background: selectedCategory === cat ? "#1d4ed8" : "#f3f4f6",
                  color: selectedCategory === cat ? "#fff" : "#374151",
                }}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div style={styles.rightFilters}>
            <div style={styles.priceFilter}>
              <span style={{ fontSize: 13, color: "#6b7280", whiteSpace: "nowrap" }}>
                Up to ₹{priceRange[1].toLocaleString()}
              </span>
              <input
                type="range"
                min={0}
                max={20000}
                step={500}
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                style={{ width: 100 }}
              />
            </div>

            <select
              style={styles.sortSelect}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div style={styles.resultInfo}>
          {loading ? (
            <span style={{ color: "#9ca3af" }}>Loading products...</span>
          ) : (
            <span style={{ color: "#6b7280", fontSize: 14 }}>
              Showing <strong>{filtered.length}</strong> product{filtered.length !== 1 ? "s" : ""}
              {searchQuery && ` for "${searchQuery}"`}
              {selectedCategory !== "All" && ` in ${selectedCategory}`}
            </span>
          )}
        </div>

        
        {loading ? (
          <div style={styles.grid}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} style={styles.skeleton}>
                <div style={styles.skeletonImg} />
                <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
                  <div style={{ ...styles.skeletonLine, width: "60%" }} />
                  <div style={styles.skeletonLine} />
                  <div style={{ ...styles.skeletonLine, width: "80%" }} />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div style={styles.noResults}>
            <div style={{ fontSize: 48 }}>🔍</div>
            <h3 style={{ color: "#374151", marginTop: 12 }}>No products found</h3>
            <p style={{ color: "#9ca3af" }}>Try adjusting your search or filters</p>
          </div>
        ) : (
          <div style={styles.grid}>
            {filtered.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={setSelectedProduct}
              />
            ))}
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}

const skeletonAnim = `
  @keyframes shimmer {
    0% { background-position: -400px 0; }
    100% { background-position: 400px 0; }
  }
`;

const styles = {
  page: { minHeight: "100vh", background: "#f9fafb" },
  hero: {
    background: "linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 60%, #3b82f6 100%)",
    padding: "48px 20px",
    textAlign: "center",
  },
  heroContent: { maxWidth: 600, margin: "0 auto" },
  heroTitle: { margin: 0, fontSize: 36, fontWeight: 800, color: "#fff" },
  heroSub: { margin: "10px 0 20px", color: "#bfdbfe", fontSize: 16 },
  heroBadges: { display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" },
  heroBadge: {
    background: "rgba(255,255,255,0.15)",
    color: "#fff",
    padding: "6px 16px",
    borderRadius: 20,
    fontSize: 13,
    fontWeight: 600,
    backdropFilter: "blur(4px)",
  },
  container: { maxWidth: 1200, margin: "0 auto", padding: "24px 20px" },
  filtersBar: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
    background: "#fff",
    padding: "14px 16px",
    borderRadius: 10,
    border: "1px solid #e5e7eb",
  },
  categoryWrap: { display: "flex", gap: 8, flexWrap: "wrap", flex: 1 },
  catBtn: {
    padding: "6px 14px",
    borderRadius: 20,
    border: "none",
    fontSize: 13,
    fontWeight: 500,
    cursor: "pointer",
    transition: "all 0.15s",
    fontFamily: "Inter, sans-serif",
  },
  rightFilters: { display: "flex", alignItems: "center", gap: 12, marginLeft: "auto" },
  priceFilter: { display: "flex", alignItems: "center", gap: 8 },
  sortSelect: {
    padding: "7px 12px",
    border: "1px solid #d1d5db",
    borderRadius: 8,
    fontSize: 13,
    color: "#374151",
    background: "#fff",
    cursor: "pointer",
    fontFamily: "Inter, sans-serif",
  },
  resultInfo: { marginBottom: 20 },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: 20,
  },
  skeleton: {
    background: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    border: "1px solid #e5e7eb",
  },
  skeletonImg: {
    height: 220,
    background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
    backgroundSize: "400px 100%",
    animation: "shimmer 1.5s infinite",
  },
  skeletonLine: {
    height: 14,
    borderRadius: 4,
    background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
    backgroundSize: "400px 100%",
    animation: "shimmer 1.5s infinite",
  },
  noResults: {
    textAlign: "center",
    padding: "80px 20px",
  },
};
