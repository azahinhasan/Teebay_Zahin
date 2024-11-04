import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { Box, Typography, Button, CircularProgress, Grid } from "@mui/material";
import { GET_PRODUCT_BY_ID } from "../../../graphql/queries/product.queries";
import { VIEW_PRODUCT } from "../../../graphql/mutations/product.mutations";
import {
  BUY_PRODUCT,
  RENT_PRODUCT,
} from "../../../graphql/mutations/transactions.mutations";
import { ProductInfoInterface } from "../../../common/interface";
import { useSnackbar } from "../../../context/snack-bar.context";
import { useNavigate } from "react-router-dom";
import YesNoDialog from "../../../components/YesNoDialog";
const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showAlert } = useSnackbar();
  const [dialogYesNoOpen, setDialogYesNoOpen] = useState(false);
  const { loading, error, data } = useQuery(GET_PRODUCT_BY_ID, {
    variables: { id: id ? parseInt(id) : 0 },
    fetchPolicy: "cache-first",
  });

  const [buyProduct] = useMutation(BUY_PRODUCT, {
    onCompleted: (data) => {
      showAlert(data.buyProduct.message, "success");
      setDialogYesNoOpen(false);
      navigate("/home");
    },
    onError: (error) => {
      showAlert(error.message, "error");
    },
  });

  useEffect(() => {
    if (!id) {
      navigate("/home");
    }
  }, [id]);

  const handleConfirmBuy = () => {
    if (data?.getProduct) {
      const input = {
        productId: data.getProduct.id,
      };

      buyProduct({ variables: { data: input } });
    }
  };

  if (loading) return <CircularProgress />;
  if (error) showAlert(error.message, "error");

  const product: ProductInfoInterface = data.getProduct;

  return (
    <Box
      sx={{
        padding: 3,
        maxWidth: 600,
        margin: "auto",
        border: "1px solid lightgray",
        textAlign: "left",
      }}
    >
      <YesNoDialog
        open={dialogYesNoOpen}
        title="Confirm Purchase"
        content={`Are you sure you want to buy this product?`}
        onClose={() => setDialogYesNoOpen(false)}
        onConfirm={handleConfirmBuy}
      />
      <Typography variant="h4" gutterBottom>
        {product.name}
      </Typography>
      <Typography variant="body2" color="textSecondary" gutterBottom>
        {product.categories.map((cat) => cat.name).join(", ")}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Price: ${product.price}
      </Typography>
      {product.rentPrice && (
        <Typography variant="body2" color="textSecondary">
          Rent Price: ${product.rentPrice} / {product.rentDuration}
        </Typography>
      )}
      <Typography variant="body1" paragraph>
        {product.description}
      </Typography>

      <br />
      <Box>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item sm={12} md={2}>
            <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-start" }}>
              <Typography
                variant="caption"
                display="block"
                color="textSecondary"
              >
                Views: {product.totalViews}
              </Typography>
            </Box>
          </Grid>

          <Grid item sm={12} md={10}>
            {product.status === "available" && (
              <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setDialogYesNoOpen(true)}
                >
                  Buy
                </Button>
                <Button variant="contained" color="secondary">
                  Rent
                </Button>
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ProductDetails;
