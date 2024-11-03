import { useMutation } from "@apollo/client";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  CardActions,
  CircularProgress,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CREATE_USER } from "../../graphql/mutations/userMutations";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "../../context/snack-bar.context";

const SignUp = () => {
  const navigate = useNavigate();
  const { showAlert } = useSnackbar();
  const [createUser, { loading, error }] = useMutation(CREATE_USER);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const { data } = await createUser({
          variables: { input: { ...values } },
        });
        console.log(data)
        if (data.createUser.success) {
          showAlert("Successfully signed up", "success");
          navigate("/login");
        } else {
          showAlert("Failed to signed up", "error");
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
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              {...formik.getFieldProps("name")}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              {...formik.getFieldProps("email")}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              type="password"
              {...formik.getFieldProps("password")}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              margin="normal"
            />

            {error && (
              <Typography color="error">
                Failed to sign up. Please try again.
              </Typography>
            )}

            <CardActions>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : "Sign Up"}
              </Button>
            </CardActions>
            <CardActions>
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            </CardActions>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;