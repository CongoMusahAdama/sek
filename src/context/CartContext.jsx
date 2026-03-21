import React, { useState, useContext, createContext } from "react";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [shouldBump, setShouldBump] = useState(false);

  const triggerBump = () => {
    setShouldBump(true);
    setTimeout(() => setShouldBump(false), 300);
  };

  const addToast = (name) => {
    setToast(name);
    setTimeout(() => setToast(null), 3000);
  };

  const addToCart = (product, selectedSize, selectedExtras = [], qty = 1) => {
    setCartItems((prev) => {
      // Unique key for same product with different sizes or extras
      const extrasId = selectedExtras.map(e => e.name).sort().join(',');
      const cartId = `${product._id || product.id}-${selectedSize || 'Standard'}-${extrasId}`;
      
      const existing = prev.find((i) => i.cartId === cartId);
      if (existing)
        return prev.map((i) =>
          i.cartId === cartId ? { ...i, qty: i.qty + qty } : i,
        );
      return [...prev, { ...product, cartId, selectedSize, selectedExtras, qty }];
    });
    addToast(product.name);
    triggerBump();
  };

  const removeFromCart = (cartId) =>
    setCartItems((prev) => prev.filter((i) => i.cartId !== cartId));

  const updateQty = (cartId, delta) => {
    setCartItems((prev) =>
      prev.map((i) =>
        i.cartId === cartId ? { ...i, qty: Math.max(1, i.qty + delta) } : i,
      ),
    );
  };

  const clearCart = () => setCartItems([]);

  const cartCount = cartItems.reduce((sum, i) => sum + i.qty, 0);
  const cartTotal = cartItems.reduce((sum, i) => {
    const itemBasePrice = parseFloat(i.discountPrice || i.price);
    const extrasTotal = (i.selectedExtras || []).reduce((s, e) => s + parseFloat(e.price), 0);
    return sum + (itemBasePrice + extrasTotal) * i.qty;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        cartTotal,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        toast,
        setToast,
        shouldBump
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
