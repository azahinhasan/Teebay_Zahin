import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
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
import { CREATE_PRODUCT } from "../../../graphql/mutations/product.mutations";
import { GET_ALL_CATEGORIES } from "../../../graphql/queries/categories.queries";
import { CategoryInterface } from "../../../common/interface";
import { useSnackbar } from "../../../context/snack-bar.context";
import { useProductContext } from "../../../context/product.context";
import { useFormik } from "formik";
import * as Yup from "yup";
import YesNoDialog from "../../../components/YesNoDialog";

const AddNewProduct: React.FC = () => {
  const navigate = useNavigate();
  const { showAlert } = useSnackbar();
  const { setRefetchMyAllProduct } = useProductContext();
  const [dialogYesNoOpen, setDialogYesNoOpen] = useState(false);
  const [categories, setCategories] = useState<CategoryInterface[]>([]);
  const [step, setStep] = useState(0);

  const {
    loading: categoriesLoading,
    error: categoriesError,
    data: categoriesData,
  } = useQuery(GET_ALL_CATEGORIES);

  const [createProduct] = useMutation(CREATE_PRODUCT, {
    onCompleted: (res) => {
      if (res.createProduct.success) {
        showAlert(res.createProduct.message, "success");
        navigate("/my-products");
        setRefetchMyAllProduct(true);
      } else {
        showAlert(res.createProduct.message, "error");
      }
    },
    onError: (error) => {
      showAlert(error.message, "error");
    },
  });

  useEffect(() => {
    if (categoriesData) {
      setCategories(categoriesData.getAllCategories.list);
    }
  }, [categoriesData]);

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
      name: Yup.string().required("Title is required"),
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

  const handleConfirmCreate = () => {
    createProduct({
      variables: { input: formik.values },
    });
    setDialogYesNoOpen(false);
  };

  const handleNext = async () => {
    const errors = await formik.validateForm();
    //formik.setTouched used to programmatically mark specific fields as touched, indicating user interaction for displaying validation errors.
    if (step === 0 && errors.name) {
      formik.setTouched({
        name: true,
      });
      return;
    } else if (step === 1 && errors.categoryIds) {
      formik.setTouched({
        categoryIds: true,
      })
      return;
    } else if (step === 2 && errors.description) {
      formik.setTouched({
        description: true,
      })
      return;
    } else if (
      step === 3 &&
      (errors.price || errors.rentPrice || errors.rentDuration)
    ) {
      formik.setTouched({
        price: true,
        rentPrice: true,
        rentDuration: true,
      })
      return;
    }
    setStep(step + 1);
  };

  const handleBack = () => setStep(step - 1);

  if (categoriesLoading) return <CircularProgress />;
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
        title="Confirm Create"
        content="Are you sure you want to create this product?"
        onClose={() => setDialogYesNoOpen(false)}
        onConfirm={handleConfirmCreate}
      />

      <Typography variant="h4" gutterBottom>
        Create Product
      </Typography>
      <form>
        <Grid container spacing={2}>
          {step === 0 && (
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                label="Title"
                name="name"
                required
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>
          )}
          {step === 1 && (
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Categories</InputLabel>
                <Select
                  multiple
                  label="Categories"
                  name="categoryIds"
                  required
                  value={formik.values.categoryIds}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.categoryIds &&
                    Boolean(formik.errors.categoryIds)
                  }
                >
                  {categories?.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
                {formik.touched.categoryIds && formik.errors.categoryIds && (
                  <Typography color="error" variant="body2">
                    {formik.errors.categoryIds}
                  </Typography>
                )}
              </FormControl>
            </Grid>
          )}
          {step === 2 && (
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                label="Description"
                name="description"
                multiline
                required
                rows={4}
                value={formik.values.description}
                onChange={formik.handleChange}
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
              />
            </Grid>
          )}
          {step === 3 && (
            <>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Price"
                  name="price"
                  type="number"
                  required
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  error={formik.touched.price && Boolean(formik.errors.price)}
                  helperText={formik.touched.price && formik.errors.price}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Rent Price"
                  name="rentPrice"
                  type="number"
                  required
                  value={formik.values.rentPrice}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.rentPrice && Boolean(formik.errors.rentPrice)
                  }
                  helperText={
                    formik.touched.rentPrice && formik.errors.rentPrice
                  }
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  sx={{ marginTop: "0px" }}
                >
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
                    {[
                      "perHour",
                      "perDay",
                      "perWeek",
                      "perMonth",
                      "perYear",
                    ].map((duration) => (
                      <MenuItem key={duration} value={duration}>
                        {duration}
                      </MenuItem>
                    ))}
                  </Select>
                  {formik.touched.rentDuration &&
                    formik.errors.rentDuration && (
                      <Typography color="error" variant="body2">
                        {formik.errors.rentDuration ?? ""}
                      </Typography>
                    )}
                </FormControl>
              </Grid>
            </>
          )}
          {step === 4 && (
            <>
              <Grid item xs={12}>
                Summary
              </Grid>
              <Grid item xs={12}></Grid>
            </>
          )}
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Button variant="outlined" onClick={handleBack} disabled={step === 0}>
            Back
          </Button>
          {step < 4 ? (
            <Button variant="contained" onClick={handleNext}>
              Next
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={() => formik.handleSubmit()}
            >
              Submit
            </Button>
          )}
        </Box>
      </form>
    </Box>
  );
};

export default AddNewProduct;
