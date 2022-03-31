import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import axios from 'axios';
import Header from '../default/header';
import Footer from '../default/footer';
import '../Style/booking.css';
import Header_Common from '../components/header_common';
import { orange } from '@mui/material/colors';

const Booking = () => {
  const navigate = useNavigate();

  const [filterdata, setFilterdata] = useState({
    adults: 0,
    children: 0,
    checkin: '',
    checkout: ''
  });

  const [errors, seterrors] = useState([]);

  const handleValidation = () => {
    let errors = {};
    let formIsValid = true;

    if (adults < 1) {
      formIsValid = false;
      errors['adults'] = 'Select number of adults';
    }

    // if (children < 1) {
    //   formIsValid = false;
    //   errors["children"] = "Select number of children";
    // }

    if (!checkin) {
      formIsValid = false;
      errors['checkin'] = 'Select checkin date';
    }

    if (!checkout) {
      formIsValid = false;
      errors['checkout'] = 'Select checkout date';
    }

    seterrors(errors);
    return formIsValid;
  };

  const { adults, children, checkin, checkout } = filterdata;

  const onChange = e =>
    setFilterdata({ ...filterdata, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();

    if (handleValidation()) {
      localStorage.setItem('adults', adults);
      localStorage.setItem('childrens', children);
      localStorage.setItem('checkin', checkin);
      localStorage.setItem('checkout', checkout);
      axios
      .post("http://localhost:8080/bookings", {
      bookingID: "",
      roomID: null,
      typeOfRoom: "",
      noOfRoomsToBook: null,
      email: localStorage.getItem('email'),
      noOfGuests: adults,
      noOfChildren: children,
      checkInDummy: checkin,
      checkOutDummy: checkout,
      checkin: null,
      checkout: null,
      amount: "",
      paymentStatus: "",
      reserveRooms: ""
      })
      .then((res) => {
        console.log(res.data('message'));
        if (res.data["message"] !== "no rooms available in the specified time period") {
        localStorage.setItem('bookingID', res.data('bookingID'));
        localStorage.setItem('deluxeAvailability', res.data('deluxeAvailability'));
        localStorage.setItem('executiveAvailability', res.data('executiveAvailability'));
        localStorage.setItem('deluxeAmount', res.data('deluxeAmount'));
        localStorage.setItem('executiveAmount', res.data('executiveAmount'));
        localStorage.setItem('reserveRooms', res.data('reserveRooms'));
        localStorage.setItem('noofroomstobook', res.data('noofroomstobook'));
        }
      });
      console.log(filterdata);
      console.log(localStorage.getItem('email'));
      navigate('/rooms');
    }
  };
  return (
    <div>
      <Header_Common />
      <div className='form'>
        <div className='filter'>
          <Form>
            <div className='checkin'>
              <Form.Group controlId='checkin'>
                <h4>
                  <Form.Label>Checkin Date</Form.Label>
                </h4>
                <Form.Control
                  name='checkin'
                  type='date'
                  value={checkin}
                  required
                  style={{ width: '100%' }}
                  onChange={e => onChange(e)}
                />
                <br />
                <span style={{ color: 'red', fontSize: '15px' }}>
                  {errors['checkin']}
                </span>
              </Form.Group>
            </div>

            <div className='checkout'>
              <Form.Group controlId='checkout'>
                <h4>
                  <Form.Label>Checkout Date</Form.Label>
                </h4>
                <Form.Control
                  type='date'
                  name='checkout'
                  placeholder='Enter Password'
                  value={checkout}
                  required
                  style={{ width: '100%' }}
                  onChange={e => onChange(e)}
                />
                <br />
                <span style={{ color: 'red', fontSize: '15px' }}>
                  {errors['checkout']}
                </span>
              </Form.Group>
            </div>

            <div className='adults'>
              <h4>
                <label htmlFor='adults'>Adults(13 and above)</label>
              </h4>
              <select
                id='adults'
                className='form-control'
                name='adults'
                style={{ width: '100%' }}
                onChange={e => onChange(e)}
              >
                <option>0</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
              </select>
              <span style={{ color: 'red', fontSize: '15px' }}>
                {errors['adults']}
              </span>
            </div>
            <br />

            <div className='children'>
              <h4>
                <label htmlFor='children'>Children(12 and below)</label>
              </h4>
              <select
                id='children'
                name='children'
                style={{ width: '100%' }}
                onChange={e => onChange(e)}
              >
                <option>0</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
              <span style={{ color: 'red', fontSize: '15px' }}>
                {errors['children']}
              </span>
            </div>
          </Form>
        </div>
        {/* <Link to="/rooms" state={{ filterdata }}> */}
        <Button
          type='submit'
          className='booking'
          style={{ background: 'orange', width: '15%', marginTop: '20px' }}
          onClick={e => onSubmit(e)}
        >
          <div style={{ fontSize: '15px' }}>Select Rooms</div>
        </Button>
        {/* </Link> */}
      </div>
      <Footer />
    </div>
  );
};

export default Booking;
