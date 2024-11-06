import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "../components/navBar";
import Login from "./auth/login.page";
import SignUp from "./auth/signup.page";
import Cookies from "js-cookie";
import AllProductsPage from "./product/allProducts/allProducts.pages";
import MyTransactions from "./transaction/myTransactions";
import ProductDetails from "./product/productDetails/productDetails.pages";
import MyProductsPage from "./product/myProducts/myProducts.pages";
import EditProduct from "./product/editProduct/editProduct.page";
import AddNewProduct from "./product/addProduct/addNewProduct.page";

const RoutesHandler = () => {
  const isAuthenticated = !!Cookies.get("token");
  const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  };
  const NotProtectedRoute = ({ children }: { children: JSX.Element }) => {
    return !isAuthenticated ? children : <Navigate to="/home" />;
  };

  const routesConfig = [
    { path: "/login", element: <Login />, isProtected: false },
    { path: "/signup", element: <SignUp />, isProtected: false },
    { path: "/home", element: <AllProductsPage />, isProtected: true },
    {
      path: "/my-transactions",
      element: <MyTransactions />,
      isProtected: true,
    },
    { path: "/product/:id", element: <ProductDetails />, isProtected: true },
    { path: "/my-products", element: <MyProductsPage />, isProtected: true },
    { path: "/product/edit/:id", element: <EditProduct />, isProtected: true },
    { path: "/product/add", element: <AddNewProduct />, isProtected: true },
  ];

  return (
    <BrowserRouter>
      {isAuthenticated && <NavBar />}

      <Routes>
        {routesConfig.map(({ path, element, isProtected }) => (
          <Route
            key={path}
            path={path}
            element={
              isProtected ? (
                <ProtectedRoute>{element}</ProtectedRoute>
              ) : (
                <NotProtectedRoute>{element}</NotProtectedRoute>
              )
            }
          />
        ))}
        <Route
          path="*"
          element={
            Cookies.get("token") ? (
              <Navigate to="/home" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesHandler;
