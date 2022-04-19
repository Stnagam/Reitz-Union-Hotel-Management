import * as React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import { blue, orange, yellow } from "@mui/material/colors";

import "../Style/userDropDown.css";

export default function UserDropDown() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const showProfile = () => {
    navigate("/profile");
  };

  const showBooking = () => {
    navigate("/customerHome")
  }
  const onClick = (e) => {
    let token = localStorage.getItem("token");

    const body = {
      message: "kill token",
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
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Avatar sx={{ bgcolor: orange[500] }}>
          {localStorage.getItem("email").charAt(0).toUpperCase()}
        </Avatar>
      </Button>
      <Menu
        className="menu"
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem className="menuItem" onClick={showProfile}>
          Profile
        </MenuItem>
        <MenuItem className="menuItem" onClick={showBooking}>
          My bookings
        </MenuItem>
        <MenuItem className="menuItem" onClick={onClick}>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}
