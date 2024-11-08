import { useMutation } from "@apollo/client";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CREATE_USER } from "../../graphql/mutations/user.mutations";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "../../context/snack-bar.context";
import CustomFields from "../../components/CustomFields";

const SignUp = () => {
  const navigate = useNavigate();
  const { showAlert } = useSnackbar();
  const [createUser, { loading, error }] = useMutation(CREATE_USER);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Please retype your password"),
    }),
    onSubmit: async (values) => {
      try {
        const { data } = await createUser({
          variables: {
            input: {
              name: values.name,
              email: values.email,
              password: values.password,
            },
          },
        });
        console.log(data);
        if (data.createUser.success) {
          showAlert("Successfully signed up", "success");
          navigate("/login");
        } else {
          showAlert("Failed to sign up. Try with another mail.", "error");
          console.log(data.createUser.message);
        }
      } catch (e) {
        console.error("Sign Up failed:", e);
      }
    },
  });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        margin: "-80px auto",
      }}
    >
      <Card sx={{ maxWidth: 400, padding: 2 }}>
        <CardContent>
          <Typography
            variant="h5"
            component="div"
            gutterBottom
            textAlign={"center"}
          >
            Sign Up
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <CustomFields
              fieldType="text"
              label="Name"
              fullWidth
              {...formik.getFieldProps("name")}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.errors.name}
              margin="normal"
            />
            <CustomFields
              fieldType="text"
              label="Email"
              fullWidth
              {...formik.getFieldProps("email")}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.errors.email}
              margin="normal"
            />
            <CustomFields
              fieldType="password"
              label="Password"
              fullWidth
              {...formik.getFieldProps("password")}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.errors.password}
              margin="normal"
            />
            <CustomFields
              fieldType="password"
              label="Retype Password"
              fullWidth
              {...formik.getFieldProps("confirmPassword")}
              error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
              helperText={formik.errors.confirmPassword}
              margin="normal"
            />

            {error && (
              <Typography color="error">
                Failed to sign up. Please try again.
              </Typography>
            )}

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Sign Up"}
            </Button>
            <br />
            <br />

            <Button
              variant="outlined"
              color="primary"
              fullWidth
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;
