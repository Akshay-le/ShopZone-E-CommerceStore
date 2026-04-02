import React, { useState } from "react";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import Navbar from "./components/Navbar";
import CartDrawer from "./components/CartDrawer";
import ProductsPage from "./pages/ProductsPage";
import "./index.css";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <WishlistProvider>
      <CartProvider>
        <div style={{ fontFamily: "Inter, sans-serif", minHeight: "100vh" }}>
          <Navbar searchQuery={searchQuery} onSearch={setSearchQuery} />
          <CartDrawer />
          <ProductsPage searchQuery={searchQuery} />
          <footer style={styles.footer}>
            <p>© 2024 ShopZone</p>
          </footer>
        </div>
      </CartProvider>
    </WishlistProvider>
  );
}

const styles = {
  footer: {
    textAlign: "center",
    padding: "24px",
    color: "#9ca3af",
    fontSize: 13,
    borderTop: "1px solid #e5e7eb",
    marginTop: 40,
  },
};
