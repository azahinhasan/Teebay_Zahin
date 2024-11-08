import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Grid,
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
import CustomFields from "../../../components/CustomFields";

const EditProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showAlert } = useSnackbar();
  const { setRefetchAllProduct,setRefetchMyAllProduct } = useProductContext();
  const [dialogYesNoOpen, setDialogYesNoOpen] = useState(false);
  const [categories, setCategories] = useState<CategoryInterface[]>([]);

  const {
    loading: productLoading,
    error: productError,
    data: productData,
  } = useQuery(GET_PRODUCT_BY_ID, {
    variables: { id: id ? parseInt(id) : 0, isOwnProductCheck: true },
    fetchPolicy: "cache-first",
    onCompleted: (data) => {
      if (!data.getProduct?.id) {
        navigate("/my-products");
        console.log("Product not found");
      } else {
        formik.setValues({
          name: data.getProduct.name || "",
          description: data.getProduct.description || "",
          price: data.getProduct.price || 0,
          rentPrice: data.getProduct.rentPrice || 0,
          rentDuration: data.getProduct.rentDuration || "perDay",
          categoryIds:
            data.getProduct.categories?.map(
              (cat: CategoryInterface) => cat.id
            ) || [],
        });
      }
    },
  });

  const { loading: categoriesLoading, error: categoriesError } = useQuery(
    GET_ALL_CATEGORIES,
    {
      fetchPolicy: "cache-first",
      onCompleted: (data) => {
        setCategories(data.getAllCategories.list || []);
      },
    }
  );

  const [updateProduct] = useMutation(UPDATE_PRODUCT, {
    onCompleted: (res) => {
      if (res.updateProduct.success) {
        showAlert(res.updateProduct.message, "success");
        navigate("/my-products");
        setRefetchAllProduct(true);
        setRefetchMyAllProduct(true);
      } else {
        showAlert(res.updateProduct.message, "error");
      }
    },
    onError: (error) => {
      showAlert(error.message, "error");
    },
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: 0,
      rentPrice: 0,
      rentDuration: "perDay",
      categoryIds: [] as number[],
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      description: Yup.string().required("Description is required"),
      price: Yup.number()
        .required("Price is required")
        .positive("Price must be positive"),
      rentPrice: Yup.number()
        .required("Rent price is required")
        .positive("Rent price must be positive"),
      rentDuration: Yup.string().required("Rent duration is required"),
      categoryIds: Yup.array().min(1, "At least one category is required"),
    }),
    onSubmit: () => {
      setDialogYesNoOpen(true);
    },
  });

  const handleConfirmUpdate = () => {
    updateProduct({
      variables: { id: productData?.getProduct?.id, input: formik.values },
    });
    setDialogYesNoOpen(false);
  };

  if (productLoading || categoriesLoading) return <CircularProgress />;

  if (productError || categoriesError) {
    return (
      <Typography color="error">
        {productError?.message || categoriesError?.message}
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        padding: 2,
        maxWidth: { xs: 1000, md: 600 },
        margin: "10px auto",
        border: { xs: "none", md: "1px solid lightgray" },
        textAlign: "left",
      }}
    >
      <YesNoDialog
        open={dialogYesNoOpen}
        title="Confirm Update"
        content="Are you sure you want to update this product?"
        onClose={() => setDialogYesNoOpen(false)}
        onConfirm={handleConfirmUpdate}
      />

      <Typography variant="h4" gutterBottom>
        Edit Product
      </Typography>
      <br />
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CustomFields
              fullWidth
              label="Title"
              name="name"
              required
              value={formik.values.name}
              onChange={formik.handleChange}
              error={Boolean(formik.errors.name)}
              helperText={formik.errors.name}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl margin="normal" fullWidth>
              <CustomFields
                fieldType="dropdown"
                label="Categories"
                name="categoryIds"
                required
                value={formik.values.categoryIds}
                onChange={formik.handleChange}
                error={Boolean(formik.errors.categoryIds)}
                helperText={
                  Array.isArray(formik.errors.categoryIds)
                    ? formik.errors.categoryIds.join(", ")
                    : formik.errors.categoryIds
                }
                options={categories.map((cat) => ({
                  value: cat.id,
                  label: cat.name,
                }))}
                SelectProps={{ multiple: true }}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <CustomFields
              fullWidth
              fieldType="textarea"
              label="Description"
              name="description"
              required
              value={formik.values.description}
              onChange={formik.handleChange}
              error={Boolean(formik.errors.description)}
              helperText={formik.errors.description}
            />
          </Grid>

          <Grid item xs={12}>
            <CustomFields
              fullWidth
              label="Price"
              name="price"
              fieldType="number"
              required
              value={formik.values.price}
              onChange={formik.handleChange}
              error={Boolean(formik.errors.price)}
              helperText={formik.errors.price}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CustomFields
              fullWidth
              label="Rent Price"
              name="rentPrice"
              required
              fieldType="number"
              value={formik.values.rentPrice}
              onChange={formik.handleChange}
              error={Boolean(formik.errors.rentPrice)}
              helperText={formik.errors.rentPrice}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth margin="normal" style={{ marginTop: "0px" }}>
              <CustomFields
                fullWidth
                fieldType="dropdown"
                label="Rent Duration"
                name="rentDuration"
                required
                value={formik.values.rentDuration}
                onChange={formik.handleChange}
                error={Boolean(formik.errors.rentDuration)}
                helperText={formik.errors.rentDuration}
                options={[
                  { value: "perHour", label: "per Hour" },
                  { value: "perDay", label: "per Day" },
                  { value: "perWeek", label: "per Week" },
                  { value: "perMonth", label: "per Month" },
                  { value: "perYear", label: "per Year" },
                ]}
              />
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
            Update Product
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default EditProduct;
