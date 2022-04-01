import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../Style/Login.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import Footer from "../default/footer";
import HeaderLogin from "../components/header_login";
import AdminHeader from "../components/AdminHeader";

const AdminLogin = () => {
  const storedJwt = localStorage.getItem("token");
  const [jwt, setJwt] = useState(storedJwt || null);

  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [errors, seterrors] = useState([]);

  const handleValidation = () => {
    let errors = {};
    let formIsValid = true;

    if (!username) {
      formIsValid = false;
      errors["username"] = "username cannot be empty";
    } else {
      if (username != "undefined") {
        console.log(username);
        let lastAtPos = username.lastIndexOf("@");
        let lastDotPos = username.lastIndexOf(".");

        if (
          !(
            lastAtPos < lastDotPos &&
            lastAtPos > 0 &&
            username.indexOf("@@") == -1 &&
            lastDotPos > 2 &&
            username.length - lastDotPos > 2
          )
        ) {
          formIsValid = false;
          errors["username"] = "username is not valid";
        }
      }
    }

    if (!password) {
      formIsValid = false;
      errors["password"] = "Password cannot be empty";
    } else {
      if (password != "undefined") {
        if (password.length < 8) {
          formIsValid = false;
          errors["password"] = "Password length should not be less than 8";
        }
      }
    }
    seterrors(errors);
    return formIsValid;
  };

  const callLoginApi = (e) => {
    handleValidation();
    e.preventDefault();
    if (username == "admin" && password == "admin") {
    //   localStorage.setItem("token", "token"]);
      localStorage.setItem("email", username);
      
      
      navigate("/admin");
    } else {
      alert("Please enter valid username and password");
    }
  };

  var temp = { pass: "123456", username: "he.patel@ufl.edu" };

  return (
    <div id="login" className="Login">
      <AdminHeader />
      <i className="icon-user"></i>
      <Form onSubmit={callLoginApi} className="loginform">
        <h1>
          <span className="log-in">Admin Login</span>
        </h1>
        <Form.Group size="lg" controlId="username">
          <Form.Control
            autoFocus
            className="username"
            name="username"
            type="username"
            value={username}
            placeholder="Enter username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Control
            className="password"
            type="password"
            name="password"
            value={password}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Link to="/forgotpassword">Forgot Password? </Link>
        <br />
        <div className="buttons">
          <Button
            size="lg"
            className="submit"
            type="submit"
            style={{ color: "white", background: "#1976d2" }}
          >
            Login
          </Button>
        </div>
      </Form>
      <Footer style={{ position: "fixed" }} />
    </div>
  );
};

export default AdminLogin;
