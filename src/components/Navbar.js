import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

export default function Navbar({ searchQuery, onSearch }) {
  const { totalItems, toggleCart } = useCart();
  const { wishlist } = useWishlist();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        {/* Logo */}
        <div style={styles.logo}>
          <span style={styles.logoIcon}>⚡</span>
          <span style={styles.logoText}>ShopZone</span>
        </div>

        {/* Search bar - hidden on mobile */}
        <div style={styles.searchWrap}>
          <span style={styles.searchIcon}>🔍</span>
          <input
            style={styles.searchInput}
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>

        {/* Actions */}
        <div style={styles.actions}>
          {/* Wishlist */}
          <button style={styles.iconBtn} title="Wishlist">
            <span style={{ fontSize: 20 }}>♥</span>
            {wishlist.length > 0 && (
              <span style={{ ...styles.badge, background: "#ef4444" }}>
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart */}
          <button style={styles.cartBtn} onClick={toggleCart}>
            <span style={{ fontSize: 20 }}>🛒</span>
            <span style={styles.cartLabel}>Cart</span>
            {totalItems > 0 && (
              <span style={styles.badge}>{totalItems}</span>
            )}
          </button>

          {/* Hamburger */}
          <button
            style={styles.hamburger}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>
      </div>

      {menuOpen && (
        <div style={styles.mobileSearch}>
          <span style={styles.searchIcon}>🔍</span>
          <input
            style={{ ...styles.searchInput, width: "100%" }}
            placeholder="Search for products"
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
      )}
    </nav>
  );
}

const styles = {
  nav: {
    position: "sticky",
    top: 0,
    zIndex: 100,
    background: "#fff",
    borderBottom: "1px solid #e5e7eb",
    boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
  },
  container: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 20px",
    height: 64,
    display: "flex",
    alignItems: "center",
    gap: 16,
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    textDecoration: "none",
    flexShrink: 0,
  },
  logoIcon: { fontSize: 24 },
  logoText: {
    fontSize: 20,
    fontWeight: 700,
    color: "#1d4ed8",
    letterSpacing: "-0.5px",
  },
  searchWrap: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    background: "#f3f4f6",
    borderRadius: 8,
    padding: "0 12px",
    gap: 8,
    maxWidth: 500,
  },
  searchIcon: { fontSize: 16, opacity: 0.5 },
  searchInput: {
    flex: 1,
    border: "none",
    background: "transparent",
    outline: "none",
    fontSize: 14,
    color: "#111827",
    padding: "10px 0",
    fontFamily: "Inter, sans-serif",
  },
  actions: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginLeft: "auto",
  },
  iconBtn: {
    position: "relative",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "8px",
    borderRadius: 8,
    color: "#374151",
    display: "flex",
    alignItems: "center",
  },
  cartBtn: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    gap: 6,
    background: "#1d4ed8",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    padding: "8px 16px",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: "Inter, sans-serif",
  },
  cartLabel: { fontSize: 14 },
  badge: {
    position: "absolute",
    top: -4,
    right: -4,
    background: "#f59e0b",
    color: "#fff",
    borderRadius: "50%",
    width: 18,
    height: 18,
    fontSize: 11,
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  hamburger: {
    display: "none",
    background: "none",
    border: "none",
    fontSize: 22,
    cursor: "pointer",
    padding: "4px 8px",
    "@media (max-width: 640px)": { display: "flex" },
  },
  mobileSearch: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "8px 20px 12px",
    background: "#f9fafb",
  },
};
