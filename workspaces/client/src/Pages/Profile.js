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
        "http://localhost:8080/auth/userDetails",
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

 
  const editProfile = () => {};

  return (
    <div className="form">
      <Header_Common />
      <h2>User Profile:</h2>
      First name: {firstname}
      <br />
      Last name: {lastname}
      <br />
      Email: {email}
      <br />
      Mobile: {mobile}
      <br />
      Age: {age}
      <button
        onClick={editProfile}
        style={{ color: "white", background: "green" }}
      >
        Edit Profile
      </button>
      <Footer />
    </div>
  );
};

export default Profile;
