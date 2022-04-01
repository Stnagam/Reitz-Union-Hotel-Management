import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../default/header';
import Footer from '../default/footer';
import '../Style/booking.css';
import Header_Common from '../components/header_common';
import { orange } from '@mui/material/colors';
import Card from "react-bootstrap/Card"
import room1 from '../images/room1.png'
import room2 from '../images/room2.png'
// const [Room,setRoom]= useState([]);

const GetRoom = ()  => {

      const navigate = useNavigate();
      // let deluxeAvailable = localStorage.getItem('deluxeAvailability');
      // let executiveAvailable = localStorage.getItem('executiveAvailability');
      let deluxeAvailable= true;
      let executiveAvailable= true;
      let isDeluxe = false;


      const redirect1 = () => {
        navigate('/payment');
        isDeluxe = true;
        localStorage.setItem(isDeluxe, 'isDeluxe');
        console.log(isDeluxe)
      }

      const redirect2 = () => {
        navigate('/payment');
        localStorage.setItem(isDeluxe, 'isDeluxe');
        console.log(isDeluxe)
      }
    return(
      <div><Header_Common />
      {(function() {
          if (deluxeAvailable) {
            return (<Card border="primary" style={{ width: '18rem' }}>
            <Card.Img variant="top" src="../images/room1.png" alt="room1"/>
            <Card.Body>
              <Card.Title><h1>Deluxe Rooms</h1></Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
              </Card.Text>
              <Button onClick = {redirect1} variant="primary">Book Deluxe</Button>
            </Card.Body>
          </Card>);
          };
          
        })()}
        
        {(function() {
          if (executiveAvailable) {
            return (<Card border="primary" style={{ width: '18rem' }}>
            {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
            <Card.Body>
              <Card.Title><h1>Executive Rooms</h1></Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
              </Card.Text>
              <Button onClick = {redirect2} variant="primary">Book Executive</Button>
            </Card.Body>
          </Card>);
          };
          
        })()}
      </div>

)
  
  };
  export default GetRoom;