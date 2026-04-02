import React, { createContext, useContext, useReducer } from "react";

const initialState = {
  items: [],         
  isOpen: false,    
};

function cartReducer(state, action) {
  switch (action.type) {

    case "ADD_TO_CART": {
      const { product, selectedColor } = action.payload;
      const existing = state.items.find(
        (i) => i.product.id === product.id && i.selectedColor === selectedColor
      );
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.product.id === product.id && i.selectedColor === selectedColor
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { product, quantity: 1, selectedColor }],
      };
    }

    case "REMOVE_FROM_CART":
      return {
        ...state,
        items: state.items.filter(
          (i) => !(i.product.id === action.payload.id && i.selectedColor === action.payload.color)
        ),
      };

    case "UPDATE_QUANTITY": {
      const { id, color, quantity } = action.payload;
      if (quantity < 1) {
        return {
          ...state,
          items: state.items.filter(
            (i) => !(i.product.id === id && i.selectedColor === color)
          ),
        };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.product.id === id && i.selectedColor === color
            ? { ...i, quantity }
            : i
        ),
      };
    }

    case "CLEAR_CART":
      return { ...state, items: [] };

    case "TOGGLE_CART":
      return { ...state, isOpen: !state.isOpen };

    case "OPEN_CART":
      return { ...state, isOpen: true };

    case "CLOSE_CART":
      return { ...state, isOpen: false };

    default:
      return state;
  }
}

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = state.items.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0
  );
  const savings = state.items.reduce(
    (sum, i) => sum + (i.product.originalPrice - i.product.price) * i.quantity,
    0
  );

  const addToCart = (product, selectedColor) =>
    dispatch({ type: "ADD_TO_CART", payload: { product, selectedColor } });

  const removeFromCart = (id, color) =>
    dispatch({ type: "REMOVE_FROM_CART", payload: { id, color } });

  const updateQuantity = (id, color, quantity) =>
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, color, quantity } });

  const clearCart = () => dispatch({ type: "CLEAR_CART" });
  const toggleCart = () => dispatch({ type: "TOGGLE_CART" });
  const openCart = () => dispatch({ type: "OPEN_CART" });
  const closeCart = () => dispatch({ type: "CLOSE_CART" });

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        isOpen: state.isOpen,
        totalItems,
        subtotal,
        savings,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleCart,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
