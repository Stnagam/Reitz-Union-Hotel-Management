// import React, { useState } from 'react';
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box"
import { Form } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
// import axios from 'axios';

// export function ForgotPasswordPage(emailValue) {
//     const [errorMessage, setErrorMessage] = useState('');
//     var[emailValue, setEmailValue] = useState(false);
//     var[emailValue, setEmailValue] = useState('');
//     const history = useNavigate();
//     const[success, setSuccess]=useState('');

//     const onSubmitClicked= async () => {
//         try {
//             await axios.put('/api/forgot-password/${emailValue}');
//             setSuccess(true);
//             setTimeout(() =>{
//                 history.push('/login');
//             }, 3000);
//         } catch(e){
//             setErrorMessage(e.message);
//         }
//     }

//     return success? (
//         <div className="content-container">
//         <h1> Success </h1>
//         <p> Check your email for a reset link </p>
//         </div>
//      ) : (
//          <div className="content-container">
//          <h1>Forgot Password</h1>
//          <p>Enter your email and we'll send you a  reset link </p>
//          {errorMessage && <div className='fail'> {errorMessage} </div> }
//          <input
//          value={emailValue}
//          onChange={e => setEmailValue(e.target.value)}
//          placeholder="someone@gmail.com" />
//          <button
//             disabled = {!emailValue}
//             // onCLick = {onSubmitCLicked}
//             > Send Reset Link</button>
//         </div>
//      );
// };
// export default ForgotPasswordPage;

import React, { Fragment, useState} from 'react';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import Header from "../default/header";
import Footer from "../default/footer"


const title = {
  pageTitle: 'Forgot Password Screen',
};

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        });
      
      const [errors, seterrors] = useState([]);

      const handleValidation = () => {
        let errors = {};
        let formIsValid = true;

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

  const {email} =
  formData;

  const onChange = (e) =>
  setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    // handleValidation();
    e.preventDefault();

    if (handleValidation()) {
      axios
        .post("http://localhost:8080/otpgeneration", {
        Email: email
        })
        .then((res) => {
          console.log(res.data);
          alert(res.data["message"]);
          if (res.data["message"] === "successfully got the emailid") {
            navigate("/resetpassword");
          }
        });
    }
  };

  return (
    <>
      <Fragment>
        <Header />
        <div className="forgotpasswordform">
          <h1>Please enter your registered email ID</h1>
          <span style={{ color: "red" }}>{formData.errormsg}</span>

          <Form onSubmit={(e) => onSubmit(e)}>
            <Form.Group controlId="firstname">
              {/* <Form.Label>First Name</Form.Label> */}
              <Form.Control
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                required
                onChange={(e) => onChange(e)}
              />
              <br />
              <span style={{ color: "red", fontSize: "15px" }}>
                {errors["email"]}
              </span>
            </Form.Group>
            
            <div>
            <Button
                variant="secondary"
                style={{ background: "#ffa500" }}
                size="lg"
                onClick={(e) => {
                  onSubmit(e);
                }}
              >
                Send OTP
              </Button>
            </div>
            </Form>
        </div>
      </Fragment>
      <Footer />
      </>
  );
};
 export default ForgotPassword;