import * as React from "react";
import { useNavigate } from "react-router-dom";

import AppBar from "@mui/material/AppBar";

import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";

import { List } from "@mui/material";
import UserDropDown from "./UserDropDown";

// import { Avatar } from '@material-ui';

// import { Avatar } from "react-native-paper";

export default function Header_Common() {
  const token = localStorage.getItem("token");

  return (
    <AppBar position="static">
      <Toolbar>
        {/*Inside the IconButton, we
           can render various icons*/}
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          {/*This is a simple Menu
             Icon wrapped in Icon */}
          {/* <MenuIcon /> */}
        </IconButton>
        {/* The Typography component applies
           default font weights and sizes */}

        <Typography
          variant="h3"
          component="div"
          sx={{ flexGrow: 1 }}
          style={{ textAlign: "center" }}
        >
          <Link
            to="/home"
            style={{
              textDecoration: "inherit",
              color: "inherit",
              textAlign: "center",
            }}
          >
            Reitz Union Hotel
          </Link>
        </Typography>

        <UserDropDown />
      </Toolbar>
    </AppBar>
  );
}
