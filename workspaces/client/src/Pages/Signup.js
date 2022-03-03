import React, { Fragment, useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

// import CommonBackgroundPage from '../CommonBackground';
// import decode from 'jwt-decode';
/*import  "./technical.css";*/
import "../Style/signup.css";
import HeaderSignUp from "../components/header_signup";
import Footer from "../default/footer";

const Signup = () => {
  const navigate = useNavigate();

  // const history = useHistory();

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    password1: "",
    mobile: "",
    age: "",
  });

  const [errors, seterrors] = useState([]);

  const handleValidation = () => {
    let errors = {};
    let formIsValid = true;

    //
    if (!firstname) {
      formIsValid = false;
      errors["firstname"] = "Firstname field cannot be empty";
    }

    if (!lastname) {
      formIsValid = false;
      errors["lastname"] = "lastname field cannot be empty";
    }
    //Email
    if (!email) {
      formIsValid = false;
      errors["email"] = "Email cannot be empty";
    } else {
      if (email != "undefined") {
        let lastAtPos = email.lastIndexOf("@");
        let lastDotPos = email.lastIndexOf(".");

        if (
          !(
            lastAtPos < lastDotPos &&
            lastAtPos > 0 &&
            email.indexOf("@@") == -1 &&
            lastDotPos > 2 &&
            email.length - lastDotPos > 2
          )
        ) {
          formIsValid = false;
          errors["email"] = "Email is not valid";
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

    if (!password1) {
      formIsValid = false;
      errors["password1"] = "Password cannot be empty";
    } else {
      if (password1 != "undefined") {
        if (password1.length < 8) {
          formIsValid = false;
          errors["password1"] = "Password length should not be less than 8";
        }
      } else {
        if (password != password1) {
          formIsValid = false;
          errors["password1"] = "Password does not matches";
        }
      }
    }

    if (!mobile) {
      formIsValid = false;
      errors["mobile"] = "Mobile cannot be empty";
    } else {
      if (mobile != "undefined") {
        if (mobile.length < 10) {
          formIsValid = false;
          errors["mobile"] = "Invalid Mobile Number";
        }
      }
    }
    //mobile = parseInt(mobile);

    if (!age) {
      formIsValid = false;
      errors["age"] = "Age cannot be empty";
    } else {
      if (age != "undefined") {
        if (age < 3 || age > 120) {
          formIsValid = false;
          errors["age"] = "Age should be Between 3 to 120";
        }
      }
    }
    //age = parseInt(age);

    seterrors(errors);
    return formIsValid;
  };

  const { firstname, lastname, email, password, password1, mobile, age } =
    formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    // handleValidation();
    e.preventDefault();

    if (handleValidation()) {
      axios
        .post("http://localhost:8080/signup", {
          Firstname: firstname,
          Lastname: lastname,
          Email: email,
          Password: password,
          Mobile: parseInt(mobile),
          Age: parseInt(age),
        })
        .then((res) => {
          console.log(res.data);
          alert(res.data["message"]);
          if (res.data["message"] === "Success") {
            navigate("/login");
          }
        });
    }
  };

  return (
    <>
      <Fragment>
        <HeaderSignUp />
        <div className="signupform">
          <h1>First time user!!! Register</h1>
          <span style={{ color: "red" }}>{formData.errormsg}</span>

          <Form onSubmit={(e) => onSubmit(e)}>
            <Form.Group controlId="firstname">
              {/* <Form.Label>First Name</Form.Label> */}
              <Form.Control
                type="text"
                name="firstname"
                placeholder="Enter First name"
                value={firstname}
                required
                onChange={(e) => onChange(e)}
              />
              <br />
              <span style={{ color: "red", fontSize: "15px" }}>
                {errors["firstname"]}
              </span>
            </Form.Group>

            <Form.Group controlId="lastname">
              {/* <Form.Label>Last Name</Form.Label> */}
              <Form.Control
                type="text"
                name="lastname"
                placeholder="Enter Last name"
                value={lastname}
                required
                onChange={(e) => onChange(e)}
              />
              <br />
              <span style={{ color: "red", fontSize: "15px" }}>
                {errors["lastname"]}
              </span>
            </Form.Group>

            <Form.Group controlId="email">
              {/* <Form.Label>Email</Form.Label> */}
              <Form.Control
                name="email"
                type="email"
                placeholder="Enter email"
                value={email}
                required
                onChange={(e) => onChange(e)}
              />
              <br />
              <span style={{ color: "red", fontSize: "15px" }}>
                {errors["email"]}
              </span>
            </Form.Group>

            <Form.Group controlId="password">
              {/* <Form.Label>Password</Form.Label> */}
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter Password"
                value={password}
                required
                onChange={(e) => onChange(e)}
              />
              <br />
              <span style={{ color: "red", fontSize: "15px" }}>
                {errors["password"]}
              </span>
            </Form.Group>

            <Form.Group controlId="password">
              {/* <Form.Label>Confirm Password</Form.Label> */}
              <Form.Control
                type="password"
                name="password1"
                placeholder="Confirm Password "
                value={password1}
                required
                onChange={(e) => onChange(e)}
              />
              <br />
              <span style={{ color: "red", fontSize: "15px" }}>
                {errors["password1"]}
              </span>
            </Form.Group>

            <Form.Group controlId="mobile">
              {/* <Form.Label>Mobile</Form.Label> */}
              <Form.Control
                type="mobile"
                name="mobile"
                placeholder="Enter Mobile number"
                value={mobile}
                required
                onChange={(e) => onChange(e)}
              />
              <br />
              <span style={{ color: "red", fontSize: "15px" }}>
                {errors["mobile"]}
              </span>
            </Form.Group>

            <Form.Group controlId="age">
              {/* <Form.Label>Age</Form.Label> */}
              <Form.Control
                type="age"
                name="age"
                placeholder="Enter Age"
                value={age}
                required
                onChange={(e) => onChange(e)}
              />
              <br />
              <span style={{ color: "red", fontSize: "15px" }}>
                {errors["age"]}
              </span>
            </Form.Group>
            <div className="buttons">
              <Button
                variant="secondary"
                style={{ background: "#ffa500" }}
                size="lg"
                onClick={(e) => {
                  onSubmit(e);
                }}
              >
                Register
              </Button>
              {/* <Link to="/login">
                <Button
                  style={{ color: "white", background: "#1976d2" }}
                  size="lg"
                >
                  Login
                </Button>
              </Link> */}
            </div>
          </Form>
        </div>
      </Fragment>
      <Footer />
    </>
  );
};

export default Signup;
