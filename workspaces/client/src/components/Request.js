import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";

const Request = () => {
  const [comment, setComment] = useState("");

  const onClick = (e) => {
    var select = document.getElementById("requests");
    var value = select.options[select.selectedIndex].value;
    e.preventDefault();
    // axios
    //   .post("http://localhost:8080/requests", {
    //     RequestType: "Pending",
    //     Email: localStorage.getItem("Email"),
    //     Comment:,
    //     Status: ,
    //   })
    //   .then((res) => {

    //     if (res.data["message"] === "logged in") {

    //       // localStorage.setItem("email", res.data["email"]);

    //       setMessage(res.data["message"]);
    //       navigate("/reservation");
    //     } else {
    //       alert(res.data["message"]);
    //     }
    //   });
    // alert("Request sent successfully")
    console.log({ value });
  };
  return (
    <div>
      <div style={{ width: "500px" }}>
        <div>
          <select id="requests">
            <option value="Cleaning">Cleaning: Make a request for room cleaning</option>
            <option value="Food menu">Food menu: Make a request to see food menu</option>
            <option value="Order food">Order food: Make a request to order food</option>
          </select>
          <input
            type="text"
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
