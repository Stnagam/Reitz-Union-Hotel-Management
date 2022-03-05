import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box"
import { Form } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import React, { Component, useState, Fragment} from 'react';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import Header from "../default/header";
import { Link } from "react-router-dom";

// export default class ResetPassword extends React.Component {
//     constructor(props){
//         super(props);
//     this.state = {
//         newPassword: {
//             OTP: props.otp,
//             Email: props.email,
//             Password: props.password
//         }
//     }
// }



// handleOTPChange(e){
//     var newPassword=this.state.newPassword;
//     newPassword.OTP=e.target.value;
    

//     this.setState({newPassword:newPassword});
// }

// handleEmailChange(e){
//     var newPassword=this.state.newPassword;
//     newPassword.Email=e.target.value;
    

//     this.setState({newPassword:newPassword});
// }

// handlePasswordChange(e){
//     var newPassword=this.state.newPassword;
//     newPassword.Password=e.target.value;
    

//     this.setState({newPassword:newPassword});
// }

// handleButtonClicked(){
//     console.log(this.state.newPassword);
//     axios.post("http://localhost:8080/ForgotPassword",{
//         Email: this.newPassword.Email,
//         OTP: this.newPassword.OTP,
//         Password: this.newPassword.Password
//     }).then((res) => {
//         console.log(res);
//         if (res.data["message"]==='success'){
//         alert(res.data["message"]);
//         //   navigate("/");
//         } else {
//           alert(res.data["message"]);
//     }
// });
// };
// render() {
//     return (
        
//         <div>
//             <Header/>
//             <Box sx={{position: "absolute", top: "10%", left: "40%" }}>
//             <h2>Please enter the below details</h2>
//             </Box>
//             <Box sx={{position: "absolute", top: "20%", left: "45%" }}>
//         <label>
//           OTP: 
//         </label>
//         <input type="text" value={this.state.newPassword.OTP} onChange={this.handleOTPChange.bind(this)}/>
//         <br/>
//         <label>
//           Email:
//         </label>
//         <input type="text" value={this.state.newPassword.Email} onChange={this.handleEmailChange.bind(this)} />
//         <br/>
//         <label>
//           New Password:
//         </label>
//         <input  value={this.state.newPassword.Password} onChange={this.handlePasswordChange.bind(this)}/>
//         <br/>
//         <Button varaint="contained" onClick={this.handleButtonClicked.bind(this)}>
//           Set Password
//         </Button>
//         </Box>
//         </div>
//     )
// }
// }

 const ResetPassword = () => {
    const navigate= useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        OTP: "",
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

        if (!OTP) {
          formIsValid = false;
          errors["OTP"] = "OTP cannot be empty"
        }

        seterrors(errors);
        return formIsValid;
      };

    const {email, password, OTP } =
    formData;     

    const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        // handleValidation();
        e.preventDefault();
    
        if(handleValidation()){
          axios
            .post("http://localhost:8080/forgotpassword", {
              Email: email,
              Password: password,
              Otptoken: parseInt(OTP),
              
            })
            .then((res) => {
              console.log(res.data);
              alert(res.data["message"]);
              if (res.data["message"] === "Password changed successfully") {
                navigate("/login");
              }
            });
        }
      };
      return(
          <>
          <Fragment>
              <Header/>
                <div className= "forgotpassword">
                <h2>Please enter the below details to reset your password</h2>
            
               </div>
                
              <div>  
                <Form onSubmit={(e) => onSubmit(e)}>
                <Form.Group controlId="OTP">
                <Form.Control
                type="number"
                name="otp"
                placeholder="Enter OTP"
                value={OTP}
                required
                onChange={(e) => onChange(e)}
              />
              <br />
              <span style={{ color: "red", fontSize: "15px" }}>
                {errors["OTP"]}
              </span>
                </Form.Group>
                <Form.Group controlId="Email">
                <Form.Control
                type="email"
                name="email"
                placeholder="Enter Email ID"
                value={email}
                required
                onChange={(e) => onChange(e)}
              />
              <br />
              <span style={{ color: "red", fontSize: "15px" }}>
                {errors["email"]}
              </span>
                </Form.Group>
                <Form.Group controlId="Password">
                <Form.Control
                type="password"
                name="password"
                placeholder="Enter new password"
                value={password}
                required
                onChange={(e) => onChange(e)}
              />
              <br />
              <span style={{ color: "red", fontSize: "15px" }}>
                {errors["password"]}
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
                Save Password
              </Button>
              </div>
            </Form>
            </div>
          </Fragment>
          </>
      );

    };

export  default ResetPassword;