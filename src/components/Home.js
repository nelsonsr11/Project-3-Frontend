import React from "react";
import Navbar from "./Navbar";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import logo from "./images/logo.png";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import "./Home.css";
import { grey } from "@mui/material/colors";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logOut = () => {
    localStorage.clear();
    navigate("/team");
  };

  return (
    <div className="home">
      <div className="home-top">
        <MenuIcon
          className="menu-icon"
          id="demo-positioned-button"
          aria-controls={open ? "demo-positioned-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          // sx={fontSize: 40 }
          sx={{ color: grey[50], fontSize: 30 }}
        ></MenuIcon>
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <Link to="/profile" className="profile1">
            <MenuItem className="profile1" onClick={handleClose}>
              Profile
            </MenuItem>
          </Link>
          <Link to="/login" className="profile1">
            <MenuItem onClick={handleClose}>Login</MenuItem>
          </Link>
          <Link to="/signup" className="profile1">
            <MenuItem onClick={handleClose}>SignUp</MenuItem>
          </Link>

          <Link to="/aboutus" className="profile1">
            <MenuItem onClick={handleClose}>About Us</MenuItem>
          </Link>
          <Link to="/" className="profile1">
            <MenuItem onClick={logOut}>Logout</MenuItem>
          </Link>
        </Menu>

        <Link to="/team" className="link1">
          <h4>GROUPS</h4>
        </Link>
        <Link to="/favorite-teams" className="link1">
          <h4>FAVTEAMS</h4>
        </Link>
        <Link to="/posts" className="link1">
          <h4>FANPAGE</h4>
        </Link>

        <img width="50px" className="logo-lap" src={logo}></img>
      </div>
    </div>
  );
};

export default Home;
