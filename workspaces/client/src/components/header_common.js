import * as React from "react";
import { useNavigate } from "react-router-dom";

import AppBar from "@mui/material/AppBar";

import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Header_Common() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const onClick = (e) => {
    let token = localStorage.getItem("token");

    const body = {
      message: "kill token"
    };
    axios
      .post("http://localhost:8080/auth/logout", body, {
        headers: {
          "x-access-token": token,
        },
      })
      .then((res) => {
        {
          console.log(res);
          localStorage.clear();
          // localStorage.setItem("isLogin", false);
        }
      });
    navigate("/");

    // axios.defaults.headers.post["Auth"] = token;

    // console.log(token);
  };

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

        {/* <Link
            to= "/login"
            >
            <Button className="loginButton" style={{backgroundColor: "orange", color:"black"}}>Login</Button>
          </Link> */}


          <Button
            style={{ backgroundColor: "orange", color: "black" }}
            color="inherit"
            onClick={onClick}
          >
            Log out
          </Button>

      </Toolbar>
    </AppBar>
  );
}
