import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_OWN_PRODUCTS } from "../../../graphql/queries/product.queries";
import { DELETE_PRODUCT } from "../../../graphql/mutations/product.mutations";
import {
  CircularProgress,
  Typography,
  Button,
  Box,
  Alert,
} from "@mui/material";
import { ProductInfoInterface } from "../../../common/interface";
import ProductCard from "../../../components/productCard";
import { useProductContext } from "../../../context/product.context";
import { useNavigate } from "react-router-dom";
import YesNoDialog from "../../../components/YesNoDialog";

const MyProductsPage: React.FC = () => {
  const [selectedProductId, setSelectedProductId] = useState<number>(0);
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

  const deleteHandler = (id: number) => {
    console.log(id);
    setSelectedProductId(0);
  };

  return (
    <Box
      sx={{
        padding: 1.5,
        width: "100%",
        margin: "auto",
      }}
    >
      <Typography variant="h4" sx={{ textAlignLast: "center" }}>
        My Products
      </Typography>

      <YesNoDialog
        open={Boolean(selectedProductId)}
        title="Confirm Action"
        content={`Are you sure you want to delete this product?`}
        onClose={() => setSelectedProductId(0)}
        onConfirm={() => deleteHandler(selectedProductId)}
      />

      <Box
        sx={{
          display: "flex",
          gap: 2,
          justifyContent: "flex-end",
          marginRight: { xs: "-13px", sm: "33px", md: "43px", lg: "63px" },
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/product/add")}
        >
          Add
        </Button>
      </Box>
      <br />

      {products.length > 0 ? (
        <>
          <Box
            sx={{
              margin: "auto",
              width: { xs: "90%", sm: "70%", md: "50%", lg: "50%" },
            }}
          >
            <Alert variant="outlined" severity="warning">
              The product will only be displayed if it has no transaction
              history.
            </Alert>
          </Box>

          <ProductCard
            data={products}
            canNavigate={true}
            canModify={true}
            onDelete={(id) => setSelectedProductId(id)}
          />
        </>
      ) : (
        <Typography>No products available</Typography>
      )}
    </Box>
  );
};

export default MyProductsPage;
