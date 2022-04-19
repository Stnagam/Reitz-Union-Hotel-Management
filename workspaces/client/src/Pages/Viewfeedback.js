import React, { useEffect, useState } from "react";
import Header_Common from "../components/header_common";
import Footer from "../default/footer";
// import "../Style/home.css";
import Tile from "../components/Tile";
import "../Style/customerHome.css";
import axios from "axios";
import { Button, Card } from "react-bootstrap";


const ViewFeedback = () => {
    
    const [feedback, setFeedback] = useState([]);
    
    useEffect(() => {
        const email = localStorage.getItem("email");
        let token = localStorage.getItem("token");

        axios.post(
        "http://localhost:8080/auth/viewfeedback",

        {
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
        setFeedback(res.data);
        console.log(feedback)
      });
  }, []);

  return (
    <div>
        <Header_Common/>
        <h1>All Feedbacks</h1>
        {feedback.map((fData) => {
            return (
            //  <h4>User {fData.email}</h4>
             <h4>
             {fData.email}: {fData.feedbackform}
             </h4>
        )})};
        <Footer/>
    </div>
  );
        }
export default ViewFeedback;
