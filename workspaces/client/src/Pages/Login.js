import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../Style/Login.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import Footer from "../default/footer";
import HeaderLogin from "../components/header_login";

export default function Login() {
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
          navigate("/reservation");
        } else {
          alert(res.data["message"]);
        }
      });
  };

  var temp = { pass: "123456", username: "he.patel@ufl.edu" };

  return (
    <div id="login" className="Login">
      <HeaderLogin />
      <i className="icon-user"></i>
      <Form onSubmit={callLoginApi} className="loginform">
        <h1>
          <span className="log-in">Log in</span> or{" "}
          <span className="sign-up">sign up</span>
        </h1>
        <Form.Group size="lg" controlId="username">
          {/* <Form.Label className="label">username:</Form.Label> */}
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
          {/* <Form.Label className="label">Password:</Form.Label> */}
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
        <a href="">Forgot Password?</a>
        <br />
        <div className="buttons">
          {/* <Link to='/signup'>
            <Button
              size='lg'
              className='signup'
              type='submit'
              style={{ background: '#ffa500' }}
            >
              Signup
            </Button>
          </Link> */}
          <Button
            size="lg"
            className="submit"
            type="submit"
            style={{ color: "white", background: "#1976d2" }}
          >
            Login
          </Button>
          {/* {jwt && (
            <pre>
              <code>{jwt}</code>
            </pre>
          )} */}
        </div>
      </Form>
      <Footer style={{ position: "fixed" }}/>
    </div>
  );
}
