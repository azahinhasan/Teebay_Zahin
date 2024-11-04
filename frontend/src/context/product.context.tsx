import React, { createContext, useContext, useState, ReactNode } from "react";
import { ProductInfoInterface } from "../common/interface";

interface ProductContextType {
  products?: ProductInfoInterface[];
  refetchAllProduct: boolean;
  setRefetchAllProduct: (value: boolean) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);
export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
};
export const ProductProvider = ({ children }) => {
  const [refetchAllProduct, setRefetchAllProduct] = useState<boolean>(false);
  return (
    <ProductContext.Provider
      value={{ refetchAllProduct, setRefetchAllProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
};
