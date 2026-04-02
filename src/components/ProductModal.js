import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

function StarRating({ rating, size = 16 }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} style={{ color: s <= Math.round(rating) ? "#f59e0b" : "#d1d5db", fontSize: size }}>★</span>
      ))}
    </div>
  );
}

export default function ProductModal({ product, onClose }) {
  const { addToCart, openCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );
  const wishlisted = isWishlisted(product.id);

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) addToCart(product, selectedColor);
    openCart();
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Close */}
        <button style={styles.closeBtn} onClick={onClose}>✕</button>

        <div style={styles.content}>
          {/* Left — Images */}
          <div style={styles.imgSection}>
            <img
              src={product.images[activeImg]}
              alt={product.title}
              style={styles.mainImg}
              onError={(e) => (e.target.src = "https://via.placeholder.com/400x320?text=Product")}
            />
            <div style={styles.thumbRow}>
              {product.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt=""
                  style={{
                    ...styles.thumb,
                    border: activeImg === i ? "2px solid #1d4ed8" : "2px solid #e5e7eb",
                  }}
                  onClick={() => setActiveImg(i)}
                  onError={(e) => (e.target.src = "https://via.placeholder.com/64?text=P")}
                />
              ))}
            </div>
          </div>

          {/* Right — Details */}
          <div style={styles.details}>
            <span style={styles.category}>{product.category}</span>
            <h2 style={styles.title}>{product.title}</h2>

            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <StarRating rating={product.rating} />
              <span style={{ fontSize: 14, color: "#6b7280" }}>
                {product.rating} · {product.reviews.toLocaleString()} reviews
              </span>
            </div>

            {/* Price */}
            <div style={styles.priceBlock}>
              <span style={styles.price}>₹{product.price.toLocaleString()}</span>
              <span style={styles.originalPrice}>₹{product.originalPrice.toLocaleString()}</span>
              <span style={styles.discountTag}>{discount}% OFF</span>
            </div>
            <p style={styles.savings}>
              You save ₹{(product.originalPrice - product.price).toLocaleString()}
            </p>

            {/* Description */}
            <p style={styles.description}>{product.description}</p>

            {/* Features */}
            <div style={styles.featuresBlock}>
              <p style={styles.label}>Key Features</p>
              <div style={styles.featureGrid}>
                {product.features.map((f, i) => (
                  <span key={i} style={styles.featureTag}>✓ {f}</span>
                ))}
              </div>
            </div>

            {/* Color */}
            <div>
              <p style={styles.label}>Color</p>
              <div style={{ display: "flex", gap: 10 }}>
                {product.colors.map((c) => (
                  <button
                    key={c}
                    style={{
                      ...styles.colorDot,
                      background: c,
                      border: selectedColor === c ? "3px solid #1d4ed8" : "3px solid transparent",
                      outline: "1px solid #e5e7eb",
                    }}
                    onClick={() => setSelectedColor(c)}
                  />
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <p style={styles.label}>Quantity</p>
              <div style={styles.qtyRow}>
                <button style={styles.qtyBtn} onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
                <span style={styles.qtyNum}>{quantity}</span>
                <button style={styles.qtyBtn} onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}>+</button>
                <span style={{ fontSize: 13, color: "#6b7280", marginLeft: 8 }}>
                  {product.stock} in stock
                </span>
              </div>
            </div>

            <div style={styles.actionRow}>
              <button
                style={{ ...styles.addBtn, background: added ? "#10b981" : "#1d4ed8" }}
                onClick={handleAdd}
              >
                {added ? "✓ Added!" : "🛒 Add to Cart"}
              </button>
              <button
                style={{
                  ...styles.wishBtn,
                  color: wishlisted ? "#ef4444" : "#6b7280",
                  borderColor: wishlisted ? "#fca5a5" : "#e5e7eb",
                }}
                onClick={() => toggleWishlist(product.id)}
              >
                {wishlisted ? "♥" : "♡"}
              </button>
            </div>

            {/* Delivery info */}
            <div style={styles.deliveryInfo}>
              <span>Free delivery on orders above ₹5,000</span>
              <span>↩ 30-day easy returns</span>
              <span>✓ 1 Year Warranty</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.5)",
    zIndex: 300,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backdropFilter: "blur(3px)",
  },
  modal: {
    background: "#fff",
    borderRadius: 16,
    width: "100%",
    maxWidth: 860,
    maxHeight: "90vh",
    overflowY: "auto",
    position: "relative",
  },
  closeBtn: {
    position: "absolute",
    top: 16,
    right: 16,
    background: "#f3f4f6",
    border: "none",
    borderRadius: "50%",
    width: 36,
    height: 36,
    fontSize: 16,
    cursor: "pointer",
    zIndex: 1,
    fontFamily: "Inter, sans-serif",
  },
  content: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 0,
  },
  imgSection: {
    padding: 24,
    background: "#f9fafb",
    borderRadius: "16px 0 0 16px",
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  mainImg: {
    width: "100%",
    height: 280,
    objectFit: "cover",
    borderRadius: 10,
  },
  thumbRow: { display: "flex", gap: 8 },
  thumb: {
    width: 60,
    height: 60,
    objectFit: "cover",
    borderRadius: 6,
    cursor: "pointer",
  },
  details: {
    padding: 24,
    display: "flex",
    flexDirection: "column",
    gap: 14,
  },
  category: {
    fontSize: 12,
    fontWeight: 600,
    color: "#1d4ed8",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  title: { margin: 0, fontSize: 22, fontWeight: 700, color: "#111827", lineHeight: 1.3 },
  priceBlock: { display: "flex", alignItems: "baseline", gap: 10 },
  price: { fontSize: 28, fontWeight: 800, color: "#111827" },
  originalPrice: { fontSize: 16, color: "#9ca3af", textDecoration: "line-through" },
  discountTag: {
    background: "#1d4ed8",
    color: "#fff",
    padding: "2px 8px",
    borderRadius: 4,
    fontSize: 12,
    fontWeight: 700,
  },
  savings: { margin: 0, fontSize: 13, color: "#059669", fontWeight: 600 },
  description: { margin: 0, fontSize: 14, color: "#374151", lineHeight: 1.6 },
  featuresBlock: {},
  label: { margin: "0 0 6px", fontSize: 13, fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: 0.5 },
  featureGrid: { display: "flex", flexWrap: "wrap", gap: 6 },
  featureTag: {
    background: "#eff6ff",
    color: "#1e40af",
    padding: "3px 10px",
    borderRadius: 20,
    fontSize: 12,
    fontWeight: 500,
  },
  colorDot: {
    width: 28,
    height: 28,
    borderRadius: "50%",
    cursor: "pointer",
    transition: "border 0.15s",
  },
  qtyRow: { display: "flex", alignItems: "center", gap: 10 },
  qtyBtn: {
    width: 32,
    height: 32,
    border: "1px solid #d1d5db",
    borderRadius: 8,
    background: "#f9fafb",
    cursor: "pointer",
    fontSize: 18,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Inter, sans-serif",
  },
  qtyNum: { fontSize: 16, fontWeight: 700, minWidth: 24, textAlign: "center" },
  actionRow: { display: "flex", gap: 10 },
  addBtn: {
    flex: 1,
    padding: "13px",
    border: "none",
    borderRadius: 10,
    color: "#fff",
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
    transition: "background 0.2s",
    fontFamily: "Inter, sans-serif",
  },
  wishBtn: {
    width: 48,
    height: 48,
    border: "1px solid",
    borderRadius: 10,
    background: "#fff",
    fontSize: 22,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Inter, sans-serif",
  },
  deliveryInfo: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    padding: "12px",
    background: "#f0fdf4",
    borderRadius: 8,
    fontSize: 13,
    color: "#065f46",
  },
};
