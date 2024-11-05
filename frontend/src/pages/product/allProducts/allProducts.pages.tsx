import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_PRODUCTS } from "../../../graphql/queries/product.queries";
import { CircularProgress, Typography,Box } from "@mui/material";
import { ProductInfoInterface } from "../../../common/interface";
import ProductCard from "../../../components/productCard";
import { useProductContext } from "../../../context/product.context";

const AllProductsPage: React.FC = () => {
  const { refetchAllProduct, setRefetchAllProduct } = useProductContext();
  const { loading, error, data } = useQuery(GET_ALL_PRODUCTS, {
    fetchPolicy: refetchAllProduct ? "network-only" : "cache-first",
    onCompleted: () => {
      setRefetchAllProduct(false);
    },
  });

  if (loading) return <CircularProgress />;
  if (error)
    return <Typography color="error">Error: {error.message}</Typography>;

  const products: ProductInfoInterface[] = data.getAllProducts.list;

  return (
    <Box
      sx={{
        padding: 1.5,
        width: "100%",
        margin: "auto"
      }}
    >
      <Typography variant="h4">All Products</Typography>
      {products.length > 0 ? (
        <ProductCard data={products} canNavigate={true} />
      ) : (
        <Typography>No products available</Typography>
      )}
    </Box>
  );
};

export default AllProductsPage;
