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
import Cookies from "js-cookie";
import { LOGIN_MUTATION } from "../../graphql/mutations/auth.mutations";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "../../context/snack-bar.context";
import CustomFields from "../../components/CustomFields";

const Login = () => {
  const navigate = useNavigate();
  const { showAlert } = useSnackbar();
  const [login, { loading }] = useMutation(LOGIN_MUTATION);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const { data } = await login({
          variables: { email: values.email, password: values.password },
        });

        if (data.login.success) {
          Cookies.set("token", data.login.token);
          window.location.reload();
        } else {
          showAlert(data.login.message, "error");
          console.log(data.login.message);
        }
      } catch (e) {
        console.error("Login failed:", e);
        showAlert("Failed to login", "error");
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
            Login
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <CustomFields
              label="Email"
              fullWidth
              {...formik.getFieldProps("email")}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.errors.email}
            />
            <CustomFields
              fullWidth
              label="Password"
              fieldType="password"
              {...formik.getFieldProps("password")}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={ formik.errors.password}
              margin="normal"
            />
            <br />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Login"}
            </Button>
            <br />
            <br />
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
