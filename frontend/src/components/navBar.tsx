import React from "react";
import Cookies from 'js-cookie'
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

const NavBar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove('token')
    console.log("Logout clicked");
    window.location.reload();
  };

   const style = {
    border:"2px solid white",
    marginRight: "10px"
   }

  return (
    <AppBar position="fixed" sx={{ top: 0 }}>
      <Toolbar style={{ backgroundColor: "" }}>
        <Typography variant="h6" component="div" sx={{ mr: 2 }}>
          Teebay
        </Typography>
        <Button color="inherit" style={style} onClick={()=>navigate("/home")}>
          Home
        </Button>
        <Button color="inherit" style={style} onClick={()=>navigate("/my-products")}>
          My Products
        </Button>
        <Button color="inherit" style={style} onClick={()=>navigate("/my-transactions")}>
          My Transactions
        </Button>
        <IconButton color="inherit" sx={{ marginLeft: 'auto' }} onClick={handleLogout}>
          <LogoutIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
