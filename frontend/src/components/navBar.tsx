import React, { useState } from "react";
import Cookies from 'js-cookie';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { Drawer, List, ListItem, ListItemText,Box } from "@mui/material";

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLogout = () => {
    Cookies.remove('token');
    console.log("Logout clicked");
    window.location.reload();
  };

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const navigateTo = (path: string) => {
    navigate(path);
    setDrawerOpen(false);
  };

  const style = {
    border: "2px solid white",
    marginRight: "10px"
  };

  const menuItems = [
    { text: 'Home', path: '/home' },
    { text: 'My Products', path: '/my-products' },
    { text: 'My Transactions', path: '/my-transactions' },
  ];

  return (
    <AppBar position="fixed" sx={{ top: 0 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1,textAlign: "left" }}>
          Teebay
        </Typography>
        <IconButton edge="start" color="inherit" onClick={toggleDrawer(true)} sx={{ display: { xs: 'block', md: 'none' } }}>
          <MenuIcon />
        </IconButton>
        <Box sx={{ display: { xs: 'none', md: 'block'}}}>
          {menuItems.map(item => (
            <Button key={item.text} color="inherit" style={style} onClick={() => navigateTo(item.path)}>
              {item.text}
            </Button>
          ))}
          <IconButton color="inherit" onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        </Box>
      </Toolbar>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <List>
          {menuItems.map(item => (
            <ListItem key={item.text} onClick={() => navigateTo(item.path)}>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
          <ListItem onClick={handleLogout}>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>
    </AppBar>
  );
};

export default NavBar;
