import { Input, Select } from '@mui/material';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import Header_Common from '../components/header_common.js';
import Footer from '../default/footer.js';
import Header from '../default/headerHome.js';
import '../Style/payment.css';

const Payment = () => {
  const [errors, seterrors] = useState([]);
  const [data, setData] = useState({
    cardnum: '',
    zip: '',
    month: '',
    year: '',
    cvv: ''
  });

  const BookingID = '';
  const PaymentStatus = 'true';

  const { cardnum, zip, month, year, cvv } = data;

  const onChange = e => setData({ ...data, [e.target.name]: e.target.value });

  const handleValidation = () => {
    let errors = {};
    let formIsValid = true;

    if (!cardnum) {
      formIsValid = false;
      errors['cardnum'] = 'Card number cannot be empty';
    } else {
      if (cardnum.length > 16) {
        formIsValid = false;
        errors['cardnum'] = 'Invalid card';
      }
    }

    if (!zip) {
      formIsValid = false;
      errors['zip'] = 'Zipcode cannot be empty';
    }

    if (zip.length > 5) {
      formIsValid = false;
      errors['zip'] = 'Invalid zipcode';
    }

    if (!month) {
      formIsValid = false;
      errors['month'] = 'Please select month';
    }

    if (!year) {
      formIsValid = false;
      errors['year'] = 'Please select year';
    }

    if (!cvv) {
      formIsValid = false;
      errors['cvv'] = 'Please enter cvv';
    }
    seterrors(errors);
    return formIsValid;
  };

  const onClick = () => {
    if (handleValidation()) {
      let token = localStorage.getItem('token');

      axios
        .post(
          'http://localhost:8080/auth/bookings',
          {
            BookingID,
            PaymentStatus,
            Email: localStorage.getItem('email').toString(),
            NoOfGuests: parseInt(localStorage.getItem('adults')),
            NoOfChildren: parseInt(localStorage.getItem('childrens')),
            CheckIn: localStorage.getItem('checkin'),
            CheckOut: localStorage.getItem('checkout')
          },
          {
            headers: {
              'x-access-token': token
            }
          }
        )
        .then(res => {
          // console.log(res);
        });

      alert('Payment received successfull');
    }
  };
  return (
    <div className='payment'>
      <Header_Common />
      <Form.Group className='radio'></Form.Group>
      <Form.Group>
        <div className='details'>
          <div className='card-number'>
            <h4>
              <label>Credit card number</label>
            </h4>
            <Input
              name='cardnum'
              type='text'
              label='Credit Card Number'
              max='9999999999999999'
              placeholder='0000111100001111'
              onChange={e => onChange(e)}
            />
            <br />
            <span style={{ color: 'red', fontSize: '15px' }}>
              {errors['cardnum']}
            </span>
          </div>
          <div className='zip-code'>
            <h4>
              <label>Zip code</label>
            </h4>
            <Input
              name='zip'
              type='text'
              max='99999'
              label='Billing Zip'
              placeholder='Enter Billing Zip Code'
              onChange={e => onChange(e)}
            />
            <br />
            <span style={{ color: 'red', fontSize: '15px' }}>
              {errors['zip']}
            </span>
          </div>
        </div>
      </Form.Group>
      <Form.Group>
        <div className='expiration'>
          <div className='year'>
            <h4>
              <label>Expiration Year</label>
            </h4>
            <select
              id='year'
              name='year'
              fluid
              label='year'
              onChange={e => onChange(e)}
            >
              <option selected></option>
              <option>2022</option>
              <option>2023</option>
              <option>2024</option>
              <option>2025</option>
              <option>2026</option>
            </select>
            <br />
            <span style={{ color: 'red', fontSize: '15px' }}>
              {errors['year']}
            </span>
          </div>
          <div className='month'>
            <h4>
              <label>Expiration Month</label>
            </h4>
            <select
              id='month'
              name='month'
              fluid
              label='month'
              onChange={e => onChange(e)}
            >
              <option selected></option>
              <option>Jan</option>
              <option>Feb</option>
              <option>Mar</option>
              <option>Apr</option>
              <option>May</option>
              <option>Jun</option>
              <option>Jul</option>
              <option>Aug</option>
              <option>Sep</option>
              <option>Oct</option>
              <option>Nov</option>
              <option>Dec</option>
            </select>
            <br />
            <span style={{ color: 'red', fontSize: '15px' }}>
              {errors['month']}
            </span>
          </div>
          <div className='cvv'>
            <h4>
              <label>CVV</label>
            </h4>
            <Input
              name='cvv'
              fluid
              placeholder='CVV'
              label='cvv'
              onChange={e => onChange(e)}
            />
            <br />
            <span style={{ color: 'red', fontSize: '15px' }}>
              {errors['cvv']}
            </span>
          </div>
        </div>
      </Form.Group>
      <Button
        type='submit'
        style={{ background: 'orange', width: '30%', marginTop: '20px' }}
        onClick={e => onClick(e)}
      >
        <div className='make_payment' style={{ fontSize: '15px' }}>
          Make a Payment
        </div>
      </Button>
      <Footer />
    </div>
  );
};

export default Payment;
