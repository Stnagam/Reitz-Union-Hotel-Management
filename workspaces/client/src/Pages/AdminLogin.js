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
    } 

    if (!password) {
      formIsValid = false;
      errors["password"] = "Password cannot be empty";
    } 
    seterrors(errors);
    return formIsValid;
  };

  const callLoginApi = (e) => {
    handleValidation();
    e.preventDefault();
    axios
      .post("http://localhost:8080/login", {
        Email: username,
        Password: password,
      })
      .then((res) => {
        // console.log(res.data['message']);
        // setMessage(res.data['message']);
        // alert(message);
        // console.log(res);
        if (res.data["message"] === "logged in") {
          console.log(res.data);
          localStorage.setItem("token", res.data["token"]);
          localStorage.setItem("email", res.data["email"]);
          setJwt(res.data["token"]);
          localStorage.setItem("isLogin", true);
          setMessage(res.data["message"]);
          navigate("/admin");
        } else {
          alert(res.data["message"]);
        }
      });
    }

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
