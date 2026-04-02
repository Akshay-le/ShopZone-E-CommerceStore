import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

const badgeColors = {
  "Best Seller": { bg: "#fef3c7", color: "#92400e" },
  New: { bg: "#d1fae5", color: "#065f46" },
  "Top Rated": { bg: "#ede9fe", color: "#4c1d95" },
  Sale: { bg: "#fee2e2", color: "#991b1b" },
  Limited: { bg: "#fff1f2", color: "#be123c" },
};

function StarRating({ rating }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          style={{
            color: star <= Math.round(rating) ? "#f59e0b" : "#d1d5db",
            fontSize: 14,
          }}
        >
          ★
        </span>
      ))}
      <span style={{ fontSize: 13, color: "#6b7280", marginLeft: 2 }}>
        {rating} ({(rating * 100 + 100).toLocaleString()})
      </span>
    </div>
  );
}

export default function ProductCard({ product, onClick }) {
  const { addToCart, openCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [added, setAdded] = useState(false);
  const [imgIdx, setImgIdx] = useState(0);

  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, selectedColor);
    openCart();
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const wishlisted = isWishlisted(product.id);

  return (
    <div
      style={styles.card}
      onClick={() => onClick(product)}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.12)";
        setImgIdx(1);
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)";
        setImgIdx(0);
      }}
    >
      {/* Image */}
      <div style={styles.imgWrap}>
        <img
          src={product.images[imgIdx]}
          alt={product.title}
          style={styles.img}
          onError={(e) => (e.target.src = "https://via.placeholder.com/300x220?text=Product")}
        />
        {product.badge && (
          <span style={{ ...styles.badge, ...badgeColors[product.badge] }}>
            {product.badge}
          </span>
        )}
        {discount > 0 && (
          <span style={styles.discountBadge}>{discount}% OFF</span>
        )}
        <button
          style={{ ...styles.wishBtn, color: wishlisted ? "#ef4444" : "#9ca3af" }}
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          title={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          {wishlisted ? "♥" : "♡"}
        </button>
        {product.stock <= 10 && (
          <span style={styles.stockWarning}>Only {product.stock} left!</span>
        )}
      </div>

      {/* Info */}
      <div style={styles.info}>
        <p style={styles.category}>{product.category}</p>
        <h3 style={styles.title}>{product.title}</h3>
        <StarRating rating={product.rating} />

        {/* Colors */}
        <div style={styles.colorRow}>
          {product.colors.map((c) => (
            <button
              key={c}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedColor(c);
              }}
              style={{
                ...styles.colorDot,
                background: c,
                border: selectedColor === c ? "2px solid #1d4ed8" : "2px solid #e5e7eb",
                transform: selectedColor === c ? "scale(1.2)" : "scale(1)",
              }}
              title={c}
            />
          ))}
        </div>

        {/* Price */}
        <div style={styles.priceRow}>
          <span style={styles.price}>₹{product.price.toLocaleString()}</span>
          <span style={styles.originalPrice}>
            ₹{product.originalPrice.toLocaleString()}
          </span>
          <span style={styles.savingsTag}>
            Save ₹{(product.originalPrice - product.price).toLocaleString()}
          </span>
        </div>

        {/* Add to Cart */}
        <button
          style={{
            ...styles.cartBtn,
            background: added ? "#10b981" : "#1d4ed8",
          }}
          onClick={handleAddToCart}
        >
          {added ? "✓ Added to Cart!" : "🛒 Add to Cart"}
        </button>
      </div>
    </div>
  );
}

const styles = {
  card: {
    background: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    border: "1px solid #e5e7eb",
    cursor: "pointer",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    display: "flex",
    flexDirection: "column",
  },
  imgWrap: {
    position: "relative",
    height: 220,
    overflow: "hidden",
    background: "#f9fafb",
  },
  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.3s ease",
  },
  badge: {
    position: "absolute",
    top: 10,
    left: 10,
    padding: "3px 10px",
    borderRadius: 20,
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: 0.3,
  },
  discountBadge: {
    position: "absolute",
    top: 10,
    right: 40,
    background: "#1d4ed8",
    color: "#fff",
    padding: "3px 8px",
    borderRadius: 6,
    fontSize: 11,
    fontWeight: 700,
  },
  wishBtn: {
    position: "absolute",
    top: 8,
    right: 8,
    background: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: "50%",
    width: 32,
    height: 32,
    fontSize: 18,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
  },
  stockWarning: {
    position: "absolute",
    bottom: 8,
    left: 8,
    background: "#fef2f2",
    color: "#991b1b",
    padding: "2px 8px",
    borderRadius: 4,
    fontSize: 11,
    fontWeight: 600,
  },
  info: { padding: "16px", flex: 1, display: "flex", flexDirection: "column", gap: 8 },
  category: { fontSize: 11, fontWeight: 600, color: "#1d4ed8", textTransform: "uppercase", letterSpacing: 0.5, margin: 0 },
  title: { fontSize: 15, fontWeight: 600, color: "#111827", margin: 0, lineHeight: 1.4 },
  colorRow: { display: "flex", gap: 6, alignItems: "center" },
  colorDot: {
    width: 18,
    height: 18,
    borderRadius: "50%",
    cursor: "pointer",
    transition: "transform 0.15s ease, border 0.15s ease",
    flexShrink: 0,
  },
  priceRow: { display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" },
  price: { fontSize: 20, fontWeight: 700, color: "#111827" },
  originalPrice: { fontSize: 14, color: "#9ca3af", textDecoration: "line-through" },
  savingsTag: { fontSize: 12, color: "#059669", fontWeight: 600 },
  cartBtn: {
    width: "100%",
    padding: "10px",
    border: "none",
    borderRadius: 8,
    color: "#fff",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    transition: "background 0.2s ease",
    fontFamily: "Inter, sans-serif",
    marginTop: "auto",
  },
};
