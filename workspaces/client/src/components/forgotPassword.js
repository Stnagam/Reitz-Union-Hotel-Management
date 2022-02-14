import React, { useState } from 'react';
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Form } from 'react-bootstrap';



export default function ForgotPassword(){

    const [email, setEmail] = useState("");
        return(
            <div>
                 <Typography variant="h3" 
            component="div" sx={{ flexGrow: 1 }} style={{textAlign: "center"}}>
            Forgot Password
                </Typography>
                <Typography variant="h6" 
            component="div" sx={{ flexGrow: 1 }} style={{textAlign: "center"}}>
            Lost your password? Please enter your username or email address. You will receive a link to create a new password via email.
                </Typography>
                <p><Form>
                <Form.Control
            autoFocus
            type="email"
            value={email}
            placeholder="Enter Email" 
            // onChange={(e : any) => setEmail(e.target.value)} 
            /> 
            </Form>
            <Button style={{backgroundColor: "orange", color: "black"}} color="inherit" >Submit</Button>
            </p>


            </div>
                );
    
}

