import React, { useState } from 'react';
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Form } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

export function ForgotPasswordPage(emailValue) {
    const [errorMessage, setErrorMessage] = useState('');
    var[emailValue, setEmailValue] = useState(false);
    var[emailValue, setEmailValue] = useState('');
    const history = useNavigate();
    const[success, setSuccess]=useState('');

    const onSubmitClicked= async () => {
        try {
            await axios.put('/api/forgot-password/${emailValue}');
            setSuccess(true);
            setTimeout(() =>{
                history.push('/login');
            }, 3000);
        } catch(e){
            setErrorMessage(e.message);
        }
    }

    return success? (
        <div className="content-container">
        <h1> Success </h1>
        <p> Check your email for a reset link </p>
        </div>
     ) : (
         <div className="content-container">
         <h1>Forgot Password</h1>
         <p>Enter your email and we'll send you a  reset link </p>
         {errorMessage && <div className='fail'> {errorMessage} </div> }
         <input
         value={emailValue}
         onChange={e => setEmailValue(e.target.value)}
         placeholder="someone@gmail.com" />
         <button
            disabled = {!emailValue}
            // onCLick = {onSubmitCLicked}
            > Send Reset Link</button>
        </div>
     );
};
export default ForgotPasswordPage;