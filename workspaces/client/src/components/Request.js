import axios from "axios";
import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";

const Request = () => {
  const [comment, setComment] = useState("");

  const onClick = (e) => {
    var select = document.getElementById("requests");
    var reqValue = select.options[select.selectedIndex].value;
    let token = localStorage.getItem("token");
    e.preventDefault();
    axios
      .post(
        "http://localhost:8080/auth/customerReqs",
        {
          // RequestType: "Pending",
          // Email: localStorage.getItem("Email"),
          // Comment: comment,
          // Status: "Pending",

          Email: localStorage.getItem("email"),
          RequestType : reqValue,
          Comment: comment,
          Status: "Pending",
        },
        {
          headers: {
            "x-access-token": token,
          },
        }
      )
      .then((res) => {
        console.log(res);
        if (res.data["message"] === "Request Raised") {
          alert("Request is raised");
          // navigate("/");
        } else {
          alert(res.data["message"]);
        }
      });
    // alert("Request sent successfully")
  };
  return (
    <div>
      <div style={{ width: "500px" }}>
        <div>
          <select id="requests">
            <option value="Cleaning">
              Cleaning: Make a request for room cleaning
            </option>
            <option value="Food menu">
              Food menu: Make a request to see food menu
            </option>
            <option value="Order food">
              Order food: Make a request to order food
            </option>
          </select>
          <input
            type="text"
            name="comment"
            placeholder="Comment"
            onChange={(e) => setComment(e.target.value)}
          ></input>
          <button
            type="submit"
            onClick={onClick}
            style={{ "background-color": "#00ab66" }}
          >
            Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default Request;