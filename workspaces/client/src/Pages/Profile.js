import React, { useEffect, useState } from "react";
import Footer from "../default/footer";
import Header_Common from "../components/header_common";
import "../Style/profile.css";
import axios from "axios";

const Profile = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState();
  const [age, setAge] = useState();

  let token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .post(
        "http://localhost:8080/auth/getUserDetails",
        { Email: localStorage.getItem("email") },
        {
          headers: {
            "x-access-token": token,
          },
        }
      )
      .then((res) => {
        // console.log();
        setFirstname(res.data.firstname);
        setLastname(res.data.lastname);
        setEmail(res.data.email);
        setMobile(res.data.mobile);
        setAge(res.data.age);
      });
  }, []);

  const changeMob = () => {
   
  };

  return (
    <div className="form">
      <Header_Common />
      <h2>User Profile:</h2>
      <div className="firstname"> First name: {firstname}</div>

      <div>Last name: {lastname}</div>

      <div>Email: {email}</div>

      <div>
        Mobile: {mobile}{" "}
        
      </div>

      <div> Age: {age}</div>

      <Footer />
    </div>
  );
};

export default Profile;
