import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, CardGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../default/header';
import '../Style/booking.css';
import Header_Common from '../components/header_common';
import { orange } from '@mui/material/colors';
import Card from "react-bootstrap/Card"
import room1 from '../images/room1.png'
import room2 from '../images/room2.png'
import Footer from "../default/footer";
import "../Style/rooms.css"
// const [Room,setRoom]= useState([]);

const GetRoom = ()  => {

      const navigate = useNavigate();
      let deluxeAvailable = true;
      let executiveAvailable = true;
      // deluxeAvailable = localStorage.getItem('deluxeAvailability');
      // executiveAvailable = localStorage.getItem('executiveAvailability');

      let isDeluxe = false;


      const redirect1 = () => {
        navigate('/payment');
        isDeluxe = true;
        localStorage.setItem('isDeluxe', isDeluxe);
        console.log(isDeluxe)
      }

      const redirect2 = () => {
        navigate('/payment');
        localStorage.setItem('isDeluxe', isDeluxe);
        console.log(isDeluxe)
      }
    return(
      <div className= "rooms"> <Header_Common />
      <CardGroup>
      {(function() {
          if (deluxeAvailable === true) {
            return (<Card border="primary" style={{ width: '18rem' }}>
            <Card.Img variant="top" src={room2} width= "120%" />
            <Card.Body>
              <Card.Title><h3>Deluxe Rooms</h3></Card.Title>
              <Card.Text>
                Price per deluxe room is $140
              </Card.Text>
              <Button style={{ backgroundColor: "orange", color: "black" }}
            color="inherit" onClick = {redirect1} variant="primary">Book Deluxe</Button>
            </Card.Body>
          </Card>);
          };
          
        })()}
        
        {(function() {
          if (executiveAvailable === true) {
            return (<Card border="primary" style={{ width: '18rem' }}>
            <Card.Img variant="top" src={room1} width="120%"  />
            <Card.Body>
              <Card.Title><h3>Executive Rooms</h3></Card.Title>
              <Card.Text>
                Price per executive room is $200
              </Card.Text>
              <Button style={{ backgroundColor: "orange", color: "black" }}
            color="inherit" onClick = {redirect2} variant="primary">Book Executive</Button>
            </Card.Body>
          </Card>);
          };
          
        })()}
        </CardGroup>
        <Footer style={{"margin-bottom":"100px"}}/>
      </div>

)
  
  };
  export default GetRoom;