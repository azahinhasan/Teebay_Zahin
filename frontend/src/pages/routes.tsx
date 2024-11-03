import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
 import NavBar from "../components/navBar";
import Login from "./auth/login.page";
import SignUp from "./auth/signup.page";
import Cookies from "js-cookie";
import AllProductsPage from "./product/allProducts.pages";
import MyTransactions from "./transaction/myTransactions"

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  return Cookies.get("token") ? children : <Navigate to="/login" />;
};

const NotProtectedRoute = ({ children }: { children: JSX.Element }) => {
  return !Cookies.get("token") ? children : <Navigate to="/home" />;
};

const routesConfig = [
  { path: "/login", element: <Login />, isProtected: false },
  { path: "/signup", element: <SignUp />, isProtected: false },
  { path: "/home", element: <AllProductsPage />, isProtected: true },
  { path: "/my-transactions", element: <MyTransactions />, isProtected: true },
];

const RoutesHandler = () => {
  return (
    <BrowserRouter>
      <ProtectedRoute>
        <NavBar />
      </ProtectedRoute>

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
