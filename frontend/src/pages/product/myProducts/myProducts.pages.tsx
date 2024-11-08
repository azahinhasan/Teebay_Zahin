import React, { useState } from "react";
import { useQuery, useMutation, useApolloClient } from "@apollo/client";
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
import ProductCard from "../../../components/Product-Card";
import { useProductContext } from "../../../context/product.context";
import { useNavigate } from "react-router-dom";
import YesNoDialog from "../../../components/YesNoDialog";
import { useSnackbar } from "../../../context/snack-bar.context";

const MyProductsPage: React.FC = () => {
  const { showAlert } = useSnackbar();
  const [selectedProductId, setSelectedProductId] = useState<number>(0);
  const { refetchMyAllProduct, setRefetchMyAllProduct } = useProductContext();
  const navigate = useNavigate();
  const client = useApolloClient();

  const { loading, error, data } = useQuery(GET_ALL_OWN_PRODUCTS, {
    fetchPolicy: refetchMyAllProduct ? "network-only" : "cache-first",
    onCompleted: () => {
      setRefetchMyAllProduct(false);
    },
  });

  const [deleteProduct] = useMutation(DELETE_PRODUCT, {
    onCompleted: (res) => {
      if (res.deleteProduct.success) {
        const existingOwnProducts: any = client.readQuery({
          query: GET_ALL_OWN_PRODUCTS,
        });
        if (existingOwnProducts) {
          const updatedOwnProducts =
            existingOwnProducts.getAllOwnProducts.list.filter(
              (product: ProductInfoInterface) =>
                product.id !== selectedProductId
            );
          client.writeQuery({
            query: GET_ALL_OWN_PRODUCTS,
            data: {
              getAllOwnProducts: {
                ...existingOwnProducts.getAllOwnProducts,
                list: updatedOwnProducts,
              },
            },
          });
        }
        showAlert(res.deleteProduct.message, "success");
        setSelectedProductId(0);
      } else {
        showAlert(res.deleteProduct.message, "error");
      }
    },
    onError: (error) => {
      showAlert(error.message, "error");
    },
  });

  if (loading) return <CircularProgress />;
  if (error)
    return <Typography color="error">Error: {error.message}</Typography>;

  const products: ProductInfoInterface[] = data.getAllOwnProducts.list;

  const deleteHandler = (id: number) => {
    deleteProduct({
      variables: { id },
    });
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
      <br/>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          justifyContent: "flex-end",
          marginRight: { xs: "0px", sm: "75px", md: "95px", lg: "105px" },
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
      {products.length > 0 ? (
        <>
          <ProductCard
            data={products}
            canModify={true}
            onDelete={(id) => setSelectedProductId(id)}
          />
          <br/>
          <Box
            sx={{
              margin: "auto",
              width: { xs: "100%", sm: "83%", md: "83%", lg: "83%" },
            }}
          >
            <Alert variant="outlined" severity="warning">
              The product will only be displayed if it has no transaction
              history.But can be found under my transaction.
            </Alert>
          </Box>
        </>
      ) : (
        <Typography>No products available</Typography>
      )}
    </Box>
  );
};

export default MyProductsPage;
