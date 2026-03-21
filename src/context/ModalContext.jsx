import React, { useState, useContext, createContext } from "react";

const ModalContext = createContext(null);

export const ModalProvider = ({ children }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const openProduct = (product) => setSelectedProduct(product);
  const closeProduct = () => setSelectedProduct(null);

  return (
    <ModalContext.Provider
      value={{ selectedProduct, openProduct, closeProduct }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
