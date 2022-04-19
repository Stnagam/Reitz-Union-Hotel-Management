import React, { useEffect, useState } from "react";
import Header_Common from "../components/header_common";
import Footer from "../default/footer";
// import "../Style/home.css";
import Tile from "../components/Tile";
import "../Style/customerHome.css";
import axios from "axios";
import { Button, Card } from "react-bootstrap";
import room1 from "../images/deluxe.jpg";
import room2 from "../images/room2.png";

const CustomerHome = () => {
  const [upComingBooking, setUpcomingBooking] = useState([]);
  const [pastBooking, setPastBooking] = useState([]);

  useEffect(() => {
    const email = localStorage.getItem("email");
    let token = localStorage.getItem("token");

    axios
      .post(
        "http://localhost:8080/auth/getBookings",

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
        console.log(res);
        setPastBooking(res.data.PastBookings);
        setUpcomingBooking(res.data.UpcomingBookings);
      });
  }, []);

  const onClick = () => {

  };
  const isPast = true;
  return (
    <div className="cust-home">
      <Header_Common />
      {/* <button onClick={onClick}>Click to show</button> */}
      <div>
        <h1>Upcoming booking</h1>
        {/* {pastBooking.} */}

        <div>
          {upComingBooking.map((pData) => {
            return (
              <Card style={{ border: "5px" }}>
                <h3>
                  <Card.Header>Type of room: {pData.typeOfRoom}</Card.Header>
                </h3>
                <Card.Body>
                  {/* <Card.Title>Type of room: {pData.typeOfRoom}</Card.Title> */}
                  {pData.typeOfRoom == "executive" && (
                    <img src={room2} style={{ width: "50%" }} />
                  )}
                  {pData.typeOfRoom == "deluxe" && <img src={room1} />}
                  <div className="roomNo"> Room no: {pData.roomID}</div>
                  <br />
                  {/* {console.log(new Date().toLocaleDateString('en-US'))} */}
                  Checkin date:{" "}
                  {pData.checkin.substr(0, pData.checkin.indexOf("T"))}
                  <br />
                  Cheoutin date:{" "}
                  {pData.checkout.substr(0, pData.checkout.indexOf("T"))}
                  {/* {console.log(pData.checkin)} */}
                  {/* Checkin Date: {pData.checkin.toLocaleDateString("en-US")} */}
                </Card.Body>
              </Card>
            );
          })}
        </div>
      </div>
      <div>
        <h1>Past booking</h1>
        {/* {pastBooking.} */}

        <div>
          {pastBooking.map((pData) => {
            return (
              <Card style={{ border: "5px" }}>
                <h3>
                  <Card.Header>Type of room: {pData.typeOfRoom}</Card.Header>
                </h3>
                <Card.Body>
                  {/* <Card.Title>Type of room: {pData.typeOfRoom}</Card.Title> */}
                  {pData.typeOfRoom == "executive" && (
                    <img src={room2} style={{ width: "50%" }} />
                  )}
                  {pData.typeOfRoom == "deluxe" && <img src={room1} />}
                  <div className="roomNo"> Room no: {pData.roomID}</div>
                  <br />
                  {/* {console.log(new Date().toLocaleDateString('en-US'))} */}
                  Checkin date:{" "}
                  {pData.checkin.substr(0, pData.checkin.indexOf("T"))}
                  <br />
                  Cheoutin date:{" "}
                  {pData.checkout.substr(0, pData.checkout.indexOf("T"))}
                  {/* {console.log(pData.checkin)} */}
                  {/* Checkin Date: {pData.checkin.toLocaleDateString("en-US")} */}
                </Card.Body>
              </Card>
            );
          })}
        </div>
      </div>
      <Footer style={{ "margin-bottom": "100px" }} />
    </div>
  );
};

export default CustomerHome;
