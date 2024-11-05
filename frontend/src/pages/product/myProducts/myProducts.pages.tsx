import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_OWN_PRODUCTS } from "../../../graphql/queries/product.queries";
import { CircularProgress, Typography, Button, Box } from "@mui/material";
import { ProductInfoInterface } from "../../../common/interface";
import ProductCard from "../../../components/productCard";
import { useProductContext } from "../../../context/product.context";
import { useNavigate } from "react-router-dom";

const MyProductsPage: React.FC = () => {
  const { refetchMyAllProduct, setRefetchMyAllProduct } = useProductContext();
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_ALL_OWN_PRODUCTS, {
    fetchPolicy: refetchMyAllProduct ? "network-only" : "cache-first",
    onCompleted: () => {
      setRefetchMyAllProduct(false);
    },
  });

  if (loading) return <CircularProgress />;
  if (error)
    return <Typography color="error">Error: {error.message}</Typography>;

  const products: ProductInfoInterface[] = data.getAllOwnProducts.list;

  return (
    <Box
      sx={{
        padding: 1.5,
        width: "100%",
        margin: "auto"
      }}
    >
      <Typography variant="h4" sx={{ textAlignLast: "center" }}>
        My Products
      </Typography>
      <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end",marginRight: {xs: "-13px", sm: "33px", md: "43px", lg: "63px"} }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/product/add")}
        >
          Add
        </Button>
      </Box>

      {products.length > 0 ? (
        <ProductCard data={products} canNavigate={true} canModify={true} />
      ) : (
        <Typography>No products available</Typography>
      )}
    </Box>
  );
};

export default MyProductsPage;
