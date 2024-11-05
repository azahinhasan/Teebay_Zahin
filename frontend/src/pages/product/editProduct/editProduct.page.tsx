import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Grid,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { GET_PRODUCT_BY_ID } from "../../../graphql/queries/product.queries";
import { UPDATE_PRODUCT } from "../../../graphql/mutations/product.mutations";
import { GET_ALL_CATEGORIES } from "../../../graphql/queries/categories.queries";
import { CategoryInterface } from "../../../common/interface";
import { useSnackbar } from "../../../context/snack-bar.context";
import { useProductContext } from "../../../context/product.context";
import { useFormik } from "formik";
import * as Yup from "yup";
import YesNoDialog from "../../../components/YesNoDialog";

const EditProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showAlert } = useSnackbar();
  const { setRefetchAllProduct } = useProductContext();
  const [dialogYesNoOpen, setDialogYesNoOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  const {
    loading: productLoading,
    error: productError,
    data: productData,
  } = useQuery(GET_PRODUCT_BY_ID, {
    variables: { id: id ? parseInt(id) : 0, isOwnProductCheck: true },
    fetchPolicy: "cache-first",
    onCompleted: (data) => {
      console.log(data);
      if (!data.getProduct.id) {
        navigate("/my-products");
        console.log("Product not found");
      }
    },
  });

  const {
    loading: categoriesLoading,
    error: categoriesError,
    data: categoriesData,
  } = useQuery(GET_ALL_CATEGORIES, { fetchPolicy: "cache-first" });

  const [updateProduct] = useMutation(UPDATE_PRODUCT, {
    onCompleted: (res) => {
      if (res.updateProduct.success) {
        showAlert(res.updateProduct.message, "success");
        navigate("/my-products");
        setRefetchAllProduct(true);
      } else {
        showAlert(res.updateProduct.message, "error");
      }
    },
    onError: (error) => {
      showAlert(error.message, "error");
    },
  });

  useEffect(() => {
    console.log(productData);
    if (!id) {
      navigate("/my-products");
    }
    if (categoriesData) {
      setCategories(categoriesData.getAllCategories.list);
    }
    if (productData?.getProduct?.id) {
      formik.setValues({
        name: productData?.getProduct.name || "",
        description: productData?.getProduct.description || "",
        price: productData?.getProduct.price || 0,
        rentPrice: productData?.getProduct.rentPrice || 0,
        rentDuration: productData?.getProduct.rentDuration || "perDay",
        categoryIds:
          productData?.getProduct?.categories?.map((cat) => cat.id) || [],
      });
    }
  }, [id, categoriesData, productData]);

  const handleConfirmUpdate = (values) => {
    updateProduct({
      variables: { id: productData.getProduct.id, input: values },
    });
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: 0,
      rentPrice: 0,
      rentDuration: "perDay",
      categoryIds: [],
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      description: Yup.string().required("Description is required"),
      price: Yup.number()
        .required("Price is required")
        .positive("Price must be a positive number"),
      rentPrice: Yup.number()
        .required("Rent price is required")
        .positive("Rent price must be a positive number"),
      rentDuration: Yup.string().required("Rent duration is required"),
      categoryIds: Yup.array().min(1, "At least one category is required"),
    }),
    onSubmit: () => {
      setDialogYesNoOpen(true);
    },
  });

  if (productLoading || categoriesLoading || !productData)
    return <CircularProgress />;
  if (productError) showAlert(productError.message, "error");
  if (categoriesError) showAlert(categoriesError.message, "error");

  return (
    <Box
      sx={{
        padding: 1.5,
        maxWidth: { xs: 1000, md: 600 },
        margin: "auto",
        border: { xs: "none", md: "1px solid lightgray" },
        textAlign: "left",
      }}
    >
      <YesNoDialog
        open={dialogYesNoOpen}
        title="Confirm Update"
        content={`Are you sure you want to update this product?`}
        onClose={() => setDialogYesNoOpen(false)}
        onConfirm={() => {
          handleConfirmUpdate(formik.values);
          setDialogYesNoOpen(false);
        }}
      />

      <Typography variant="h4" gutterBottom>
        Edit Product
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="Title"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={
                formik.touched.name && typeof formik.errors.name === "string"
                  ? formik.errors.name
                  : ""
              }
              margin="normal"
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel>Categories</InputLabel>
              <Select
                multiple
                label="Categories"
                name="categoryIds"
                value={formik.values.categoryIds}
                onChange={formik.handleChange}
                error={
                  formik.touched.categoryIds &&
                  Boolean(formik.errors.categoryIds)
                }
              >
                {categories?.map((category: CategoryInterface) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
              {formik.touched.categoryIds && formik.errors.categoryIds && (
                <Typography color="error" variant="body2">
                  {formik.errors.categoryIds ?? ""}
                </Typography>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="Description"
              name="description"
              multiline
              rows={4}
              value={formik.values.description}
              onChange={formik.handleChange}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description &&
                typeof formik.errors.description === "string"
                  ? formik.errors.description
                  : ""
              }
              margin="normal"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="Price"
              name="price"
              type="number"
              value={formik.values.price}
              onChange={formik.handleChange}
              error={formik.touched.price && Boolean(formik.errors.price)}
              helperText={
                formik.touched.price && typeof formik.errors.price === "string"
                  ? formik.errors.price
                  : ""
              }
              margin="normal"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              variant="outlined"
              label="Rent Price"
              name="rentPrice"
              type="number"
              value={formik.values.rentPrice}
              onChange={formik.handleChange}
              error={
                formik.touched.rentPrice && Boolean(formik.errors.rentPrice)
              }
              helperText={
                formik.touched.rentPrice &&
                typeof formik.errors.rentPrice === "string"
                  ? formik.errors.rentPrice
                  : ""
              }
              margin="normal"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel>Rent Duration</InputLabel>
              <Select
                label="Rent Duration"
                name="rentDuration"
                value={formik.values.rentDuration}
                onChange={formik.handleChange}
                error={
                  formik.touched.rentDuration &&
                  Boolean(formik.errors.rentDuration)
                }
              >
                {["perHour", "perDay", "perWeek", "perMonth", "perYear"].map(
                  (duration) => (
                    <MenuItem key={duration} value={duration}>
                      {duration}
                    </MenuItem>
                  )
                )}
              </Select>
              {formik.touched.rentDuration && formik.errors.rentDuration && (
                <Typography color="error" variant="body2">
                  {formik.errors.rentDuration ?? ""}
                </Typography>
              )}
            </FormControl>
          </Grid>
        </Grid>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "flex-end",
            marginTop: 2,
          }}
        >
          <Button variant="contained" color="primary" type="submit">
            Update
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default EditProduct;
