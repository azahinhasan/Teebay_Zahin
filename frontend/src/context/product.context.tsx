import { createContext, useContext, useState, useMemo, ReactNode } from "react";
import { ProductInfoInterface } from "../common/interface";

interface ProductContextType {
  products?: ProductInfoInterface[];
  refetchAllProduct: boolean;
  setRefetchAllProduct: (value: boolean) => void;
  refetchMyAllProduct: boolean;
  setRefetchMyAllProduct: (value: boolean) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
};

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [refetchAllProduct, setRefetchAllProduct] = useState<boolean>(false);
  const [refetchMyAllProduct, setRefetchMyAllProduct] = useState<boolean>(false);
  const [product, setProduct] = useState<ProductInfoInterface>();


  const value = useMemo(() => ({
    refetchAllProduct,
    setRefetchAllProduct,
    refetchMyAllProduct,
    setRefetchMyAllProduct,
    product,
    setProduct,
  }), [refetchAllProduct, refetchMyAllProduct,product]); 

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};
