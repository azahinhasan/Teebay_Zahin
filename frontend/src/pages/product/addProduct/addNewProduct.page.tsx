import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useApolloClient } from "@apollo/client";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Grid,
  FormControl,
} from "@mui/material";
import { CREATE_PRODUCT } from "../../../graphql/mutations/product.mutations";
import { GET_ALL_CATEGORIES } from "../../../graphql/queries/categories.queries";
import { CategoryInterface } from "../../../common/interface";
import { useSnackbar } from "../../../context/snack-bar.context";
import { useFormik } from "formik";
import * as Yup from "yup";
import YesNoDialog from "../../../components/YesNoDialog";
import { GET_ALL_OWN_PRODUCTS } from "../../../graphql/queries/product.queries";
import CustomFields from "../../../components/CustomFields";

const AddNewProduct: React.FC = () => {
  const navigate = useNavigate();
  const { showAlert } = useSnackbar();
  const [dialogYesNoOpen, setDialogYesNoOpen] = useState(false);
  const [categories, setCategories] = useState<CategoryInterface[]>([]);
  const [step, setStep] = useState(0);
  const client = useApolloClient();

  const { loading: categoriesLoading, error: categoriesError } = useQuery(
    GET_ALL_CATEGORIES,
    {
      fetchPolicy: "cache-first",
      onCompleted: (res) => {
        setCategories(res.getAllCategories.list);
      },
    }
  );

  const [createProduct] = useMutation(CREATE_PRODUCT, {
    onCompleted: (res) => {
      if (res.createProduct.success) {
        showAlert(res.createProduct.message, "success");

        const existingOwnProducts: any = client.readQuery({
          query: GET_ALL_OWN_PRODUCTS,
        });
        if (existingOwnProducts) {
          const updatedOwnProducts = [
            res.createProduct,
            ...existingOwnProducts.getAllOwnProducts.list,
          ];
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

        navigate("/my-products");
      } else {
        showAlert(res.createProduct.message, "error");
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
    //formik.setTouched used to programmatically mark specific fields as touched, indicating user interaction for displaying validation errors.
    const errors = await formik.validateForm();
    if (step === 0 && errors.name) {
      formik.setTouched({ name: true });
      return;
    } else if (step === 1 && errors.categoryIds) {
      formik.setTouched({ categoryIds: true });
      return;
    } else if (step === 2 && errors.description) {
      formik.setTouched({ description: true });
      return;
    } else if (
      step === 3 &&
      (errors.price || errors.rentPrice || errors.rentDuration)
    ) {
      formik.setTouched({
        price: true,
        rentPrice: true,
        rentDuration: true,
      });
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
        content="Are you sure you want to add this product?"
        onClose={() => setDialogYesNoOpen(false)}
        onConfirm={handleConfirmCreate}
      />

      <Typography variant="h5" gutterBottom>
        Create Product
      </Typography>
      <hr />
      <br />
      <form>
        <Grid container spacing={2}>
          {step === 0 && (
            <Grid item xs={12}>
              <CustomFields
                fullWidth
                fieldType="text"
                label="Title"
                name="name"
                required
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.errors.name}
              />
            </Grid>
          )}
          {step === 1 && (
            <Grid item xs={12}>
              <FormControl margin="normal" fullWidth>
                <CustomFields
                  fieldType="dropdown"
                  label="Categories"
                  name="categoryIds"
                  value={formik.values.categoryIds}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.categoryIds &&
                    Boolean(formik.errors.categoryIds)
                  }
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
          )}
          {step === 2 && (
            <Grid item xs={12}>
              <CustomFields
                fieldType="textarea"
                label="Description"
                name="description"
                required
                fullWidth
                value={formik.values.description}
                onChange={formik.handleChange}
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
                helperText={formik.errors.description}
              />
            </Grid>
          )}
          {step === 3 && (
            <>
              <Grid item xs={12}>
                <CustomFields
                  fullWidth
                  label="Price"
                  name="price"
                  fieldType="number"
                  required
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  error={formik.touched.price && Boolean(formik.errors.price)}
                  helperText={formik.errors.price}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomFields
                  fullWidth
                  label="Rent Price"
                  name="rentPrice"
                  fieldType="number"
                  value={formik.values.rentPrice}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.rentPrice && Boolean(formik.errors.rentPrice)
                  }
                  helperText={formik.errors.rentPrice}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomFields
                  fieldType="dropdown"
                  label="Rent Duration"
                  name="rentDuration"
                  required
                  fullWidth
                  value={formik.values.rentDuration}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.rentDuration &&
                    Boolean(formik.errors.rentDuration)
                  }
                  helperText={formik.errors.rentDuration}
                  options={[
                    { value: "perHour", label: "perHour" },
                    { value: "perDay", label: "perDay" },
                    { value: "perWeek", label: "perWeek" },
                    { value: "perMonth", label: "perMonth" },
                    { value: "perYear", label: "perYear" },
                  ]}
                />
              </Grid>
            </>
          )}
          {step === 4 && (
            <Grid item xs={12}>
              <Typography variant="h5" gutterBottom>
                Summary
              </Typography>
              <div>Title : {formik.values.name}</div>
              <div>Description : {formik.values.description}</div>
              <div>Price : {formik.values.price}</div>
              <div>
                Rent Price : {formik.values.rentPrice}{" "}
                {formik.values.rentDuration}
              </div>
            </Grid>
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
              color="success"
              onClick={formik.handleSubmit as any}
            >
              Create
            </Button>
          )}
        </Box>
      </form>
    </Box>
  );
};

export default AddNewProduct;
