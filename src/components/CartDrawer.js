import React from "react";
import { useCart } from "../context/CartContext";

export default function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    subtotal,
    savings,
    clearCart,
  } = useCart();

  const shipping = subtotal > 5000 ? 0 : 199;
  const total = subtotal + shipping;

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          style={styles.overlay}
          onClick={closeCart}
        />
      )}

      {/* Drawer */}
      <div
        style={{
          ...styles.drawer,
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
        }}
      >
        {/* Header */}
        <div style={styles.header}>
          <h2 style={styles.heading}>
            🛒 Your Cart
            {items.length > 0 && (
              <span style={styles.countBadge}>{items.reduce((s, i) => s + i.quantity, 0)}</span>
            )}
          </h2>
          <button style={styles.closeBtn} onClick={closeCart}>✕</button>
        </div>

        {/* Empty state */}
        {items.length === 0 ? (
          <div style={styles.empty}>
            <div style={{ fontSize: 56 }}>🛒</div>
            <p style={{ color: "#6b7280", fontSize: 16, marginTop: 12 }}>Your cart is empty</p>
            <p style={{ color: "#9ca3af", fontSize: 14 }}>Add some products to get started!</p>
            <button style={styles.continueBtn} onClick={closeCart}>Continue Shopping</button>
          </div>
        ) : (
          <>
            {/* Items list */}
            <div style={styles.itemsList}>
              {items.map((item) => (
                <div key={`${item.product.id}-${item.selectedColor}`} style={styles.cartItem}>
                  <img
                    src={item.product.images[0]}
                    alt={item.product.title}
                    style={styles.itemImg}
                    onError={(e) => (e.target.src = "https://via.placeholder.com/64?text=P")}
                  />
                  <div style={styles.itemInfo}>
                    <p style={styles.itemTitle}>{item.product.title}</p>
                    <div style={styles.colorRow}>
                      <span style={{ ...styles.colorDot, background: item.selectedColor }} />
                      <span style={{ fontSize: 12, color: "#6b7280" }}>
                        {item.product.category}
                      </span>
                    </div>
                    <p style={styles.itemPrice}>
                      ₹{(item.product.price * item.quantity).toLocaleString()}
                    </p>
                    <div style={styles.qtyRow}>
                      <button
                        style={styles.qtyBtn}
                        onClick={() =>
                          updateQuantity(item.product.id, item.selectedColor, item.quantity - 1)
                        }
                      >−</button>
                      <span style={styles.qtyNum}>{item.quantity}</span>
                      <button
                        style={styles.qtyBtn}
                        onClick={() =>
                          updateQuantity(item.product.id, item.selectedColor, item.quantity + 1)
                        }
                      >+</button>
                      <button
                        style={styles.removeBtn}
                        onClick={() => removeFromCart(item.product.id, item.selectedColor)}
                      >🗑</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div style={styles.summary}>
              {savings > 0 && (
                <div style={styles.savingsBar}>
                  🎉 You save ₹{savings.toLocaleString()} on this order!
                </div>
              )}
              <div style={styles.summaryRow}>
                <span style={{ color: "#6b7280" }}>Subtotal</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              <div style={styles.summaryRow}>
                <span style={{ color: "#6b7280" }}>Shipping</span>
                <span style={{ color: shipping === 0 ? "#059669" : "#111827" }}>
                  {shipping === 0 ? "FREE" : `₹${shipping}`}
                </span>
              </div>
              {shipping > 0 && (
                <p style={styles.freeShippingHint}>
                  Add ₹{(5000 - subtotal).toLocaleString()} more for FREE shipping
                </p>
              )}
              <div style={{ ...styles.summaryRow, borderTop: "1px solid #e5e7eb", paddingTop: 10, marginTop: 4 }}>
                <span style={{ fontWeight: 700, fontSize: 16 }}>Total</span>
                <span style={{ fontWeight: 700, fontSize: 18, color: "#1d4ed8" }}>
                  ₹{total.toLocaleString()}
                </span>
              </div>

              <button style={styles.checkoutBtn}>
                Proceed to Checkout →
              </button>
              <button style={styles.clearBtn} onClick={clearCart}>
                Clear Cart
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.4)",
    zIndex: 200,
    backdropFilter: "blur(2px)",
  },
  drawer: {
    position: "fixed",
    top: 0,
    right: 0,
    width: 400,
    maxWidth: "95vw",
    height: "100vh",
    background: "#fff",
    zIndex: 201,
    display: "flex",
    flexDirection: "column",
    transition: "transform 0.3s ease",
    boxShadow: "-4px 0 24px rgba(0,0,0,0.15)",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 20px",
    borderBottom: "1px solid #e5e7eb",
    background: "#f9fafb",
  },
  heading: {
    margin: 0,
    fontSize: 18,
    fontWeight: 700,
    color: "#111827",
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  countBadge: {
    background: "#1d4ed8",
    color: "#fff",
    borderRadius: 12,
    padding: "1px 8px",
    fontSize: 13,
    fontWeight: 700,
  },
  closeBtn: {
    background: "none",
    border: "none",
    fontSize: 18,
    cursor: "pointer",
    color: "#6b7280",
    padding: "4px 8px",
    borderRadius: 6,
    fontFamily: "Inter, sans-serif",
  },
  empty: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
    textAlign: "center",
  },
  continueBtn: {
    marginTop: 20,
    padding: "10px 24px",
    background: "#1d4ed8",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: "Inter, sans-serif",
  },
  itemsList: {
    flex: 1,
    overflowY: "auto",
    padding: "12px 16px",
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  cartItem: {
    display: "flex",
    gap: 12,
    padding: 12,
    background: "#f9fafb",
    borderRadius: 10,
    border: "1px solid #e5e7eb",
  },
  itemImg: {
    width: 72,
    height: 72,
    objectFit: "cover",
    borderRadius: 8,
    flexShrink: 0,
  },
  itemInfo: { flex: 1, display: "flex", flexDirection: "column", gap: 4 },
  itemTitle: { margin: 0, fontSize: 13, fontWeight: 600, color: "#111827", lineHeight: 1.4 },
  colorRow: { display: "flex", alignItems: "center", gap: 6 },
  colorDot: { width: 12, height: 12, borderRadius: "50%", border: "1px solid #d1d5db" },
  itemPrice: { margin: 0, fontSize: 15, fontWeight: 700, color: "#1d4ed8" },
  qtyRow: { display: "flex", alignItems: "center", gap: 6 },
  qtyBtn: {
    width: 26,
    height: 26,
    border: "1px solid #d1d5db",
    borderRadius: 6,
    background: "#fff",
    cursor: "pointer",
    fontSize: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Inter, sans-serif",
  },
  qtyNum: { fontSize: 14, fontWeight: 600, minWidth: 20, textAlign: "center" },
  removeBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: 16,
    marginLeft: 4,
    padding: "2px 4px",
    fontFamily: "Inter, sans-serif",
  },
  summary: {
    padding: "16px 20px",
    borderTop: "1px solid #e5e7eb",
    background: "#f9fafb",
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  savingsBar: {
    background: "#ecfdf5",
    color: "#065f46",
    padding: "8px 12px",
    borderRadius: 8,
    fontSize: 13,
    fontWeight: 600,
    textAlign: "center",
  },
  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 14,
    color: "#111827",
  },
  freeShippingHint: {
    margin: 0,
    fontSize: 12,
    color: "#f59e0b",
    fontWeight: 500,
    textAlign: "center",
  },
  checkoutBtn: {
    width: "100%",
    padding: "13px",
    background: "#1d4ed8",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
    marginTop: 8,
    fontFamily: "Inter, sans-serif",
  },
  clearBtn: {
    width: "100%",
    padding: "9px",
    background: "none",
    color: "#6b7280",
    border: "1px solid #e5e7eb",
    borderRadius: 8,
    fontSize: 13,
    cursor: "pointer",
    fontFamily: "Inter, sans-serif",
  },
};
