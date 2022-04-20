import React, { Fragment, useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Header_Common from "../components/header_common";
import Footer from "../default/footer";
import "../Style/cancellation.css";

const Getfeedback = () => {
  const navigate = useNavigate();

  // const history = useHistory();

  const [formData, setFormData] = useState({
    email: "",
    feedbackform: "",
  });

  const [errors, seterrors] = useState([]);

  const handleValidation = () => {
    let errors = {};
    let formIsValid = true;

    //
    if (!feedbackform) {
      formIsValid = false;
      errors["feedbackform"] = "Feedback field cannot be empty";
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
    seterrors(errors);
    return formIsValid;
  };

  const { email, feedbackform } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    // handleValidation();
    e.preventDefault();

    if (handleValidation()) {
      let token = localStorage.getItem("token");
      axios
        .post(
          "http://localhost:8080/auth/getfeedback",
          {
            feedbackform: feedbackform,
            Email: email,
          },
          {
            headers: {
              "x-access-token": token,
            },
          }
        )
        .then((res) => {
          console.log(res.data);

          if (res.data["message"] === "feedback logged successfully") {
            alert("Feedback Submitted");
            navigate("/customerHome");
          } else {
            alert("Submission failed!!!!");
          }
        });
    }
  };

  return (
    <>
      <Fragment>
        <Header_Common />
        <div className="cancelform">
          <h1>Please enter your feedback below</h1>
          <span style={{ color: "red" }}>{formData.errormsg}</span>

          <Form onSubmit={(e) => onSubmit(e)}>
            <Form.Group controlId="email">
              {/* <Form.Label>Email</Form.Label> */}
              <Form.Control
                name="email"
                type="email"
                placeholder="Email ID"
                value={email}
                required
                onChange={(e) => onChange(e)}
              />
              <br />
              <span style={{ color: "red", fontSize: "15px" }}>
                {errors["email"]}
              </span>
            </Form.Group>

            <Form.Group controlId="feedbackform">
              {/* <Form.Label>Last Name</Form.Label> */}
              <Form.Control
                type="text"
                name="feedbackform"
                placeholder="Feedback"
                value={feedbackform}
                required
                onChange={(e) => onChange(e)}
              />
              <br />
              <span style={{ color: "red", fontSize: "15px" }}>
                {errors["bookingID"]}
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
                Submit Feedback
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
export default Getfeedback;
