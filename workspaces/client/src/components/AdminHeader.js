import * as React from "react";
import { useNavigate } from "react-router-dom";

import AppBar from "@mui/material/AppBar";

import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import axios from "axios";
const AdminHeader = () => {
  const navigate = useNavigate();

  const onClick = (e) => {
    navigate("/");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        ></IconButton>

        <Typography
          variant="h3"
          component="div"
          sx={{ flexGrow: 1 }}
          style={{ textAlign: "center" }}
        >
          <Link
            to="/"
            style={{
              textDecoration: "inherit",
              color: "inherit",
              textAlign: "center",
            }}
          >
            Reitz Union Hotel
          </Link>
        </Typography>

        <Button
          style={{ backgroundColor: "orange", color: "black" }}
          color="inherit"
          onClick={onClick}
        >
          Back
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default AdminHeader;
