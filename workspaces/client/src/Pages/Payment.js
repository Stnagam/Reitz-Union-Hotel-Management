import { Input, Select } from "@mui/material";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import Header_Common from "../components/header_common.js";
import Footer from "../default/footer.js";
import Header from "../default/headerHome.js";
import "../Style/payment.css";

const Payment = () => {
  const [errors, seterrors] = useState([]);
  const [data, setData] = useState({
    cardnum: "",
    zip: "",
    month: "",
    year: "",
    cvv: "",
  });

  const { cardnum, zip, month, year, cvv } = data;

  const onChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

  const handleValidation = () => {
    let errors = {};
    let formIsValid = true;

    if (!cardnum) {
      formIsValid = false;
      errors["cardnum"] = "username cannot be empty";
    } else {
      if (cardnum.length > 16) {
        formIsValid = false;
        errors["username"] = "Invalid card";
      }
    }

    if (!cardnum) {
      formIsValid = false;
      errors["cardnum"] = "card number cannot be empty";
    } else {
      if (cardnum.length > 16) {
        formIsValid = false;
        errors["username"] = "Invalid card";
      }
    }

    if (!zip) {
      formIsValid = false;
      errors["zip"] = "zipcode cannot be empty";
    } else {
      if (cardnum.length > 5) {
        formIsValid = false;
        errors["zip"] = "Invalid zipcode";
      }
    }
    if (!month) {
      formIsValid = false;
      errors["cardnum"] = "username cannot be empty";
    }

    if (!month) {
      formIsValid = false;
      errors["month"] = "please select month";
    }

    if (!year) {
      formIsValid = false;
      errors["year"] = "please select year";
    }

    if (!cvv) {
      formIsValid = false;
      errors["cvv"] = "please type cvv";
    }
    seterrors(errors);
    return formIsValid;
  };

  const onClick = () => {
    if (handleValidation) alert("Payment received successfull");
  };
  return (
    <div className="payment">
       <Header_Common />
      <Form.Group className="radio">
        <div className="radio">
          <div>
            <input name="gateway" type="radio" value="test_gateway" />
            <label htmlFor="test_gateway">Test Gateway</label>
          </div>
          <div>
            <input name="gateway" type="radio" value="stripe" />
            <label htmlFor="stripe">Credit Card</label>
          </div>
        </div>
      </Form.Group>
      <Form.Group>
        <div className="details">
          <div className="card-number">
            <h4>
              <label>Credit card number</label>
            </h4>
            <Input
              name="number"
              type="text"
              label="Credit Card Number"
              max="9999999999999999"
              placeholder="0000111100001111"
              onChange={(e) => onChange(e)}
            />
            <span style={{ color: "red", fontSize: "15px" }}>
              {errors["cardnum"]}
            </span>
          </div>
          <div className="zip-code">
            <h4>
              <label>Zip code</label>
            </h4>
            <Input
              name="postal_billing_zip_code"
              type="text"
              max="99999"
              label="Billing Zip"
              placeholder="Enter Billing Zip Code"
              onChange={(e) => onChange(e)}
            />
            <span style={{ color: "red", fontSize: "15px" }}>
              {errors["zip"]}
            </span>
          </div>
        </div>
      </Form.Group>
      <Form.Group>
        <div className="expiration">
          <div className="month">
            <h4>
              <label>Expiration Month</label>
            </h4>
            <select
              name="expiry_month"
              fluid
              placeholder="Expiration Month"
              label="Month"
              onSelect={(e) => onChange(e)}
            >
              <option selected>2022</option>
              <option>2023</option>
              <option>2024</option>
              <option>2025</option>
              <option>2026</option>
            </select>
            <span style={{ color: "red", fontSize: "15px" }}>
              {errors["month"]}
            </span>
          </div>
          <div className="year">
            <h4>
              <label>Expiration Year</label>
            </h4>
            <select
              name="expiry_year"
              fluid
              placeholder="Expiration Year"
              label="Year"
              onSelect={(e) => onChange(e)}
            >
              <option>Jan</option>
              <option selected>Feb</option>
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
            <span style={{ color: "red", fontSize: "15px" }}>
              {errors["year"]}
            </span>
          </div>
          <div className="cvv">
            <h4>
              <label>CVV</label>
            </h4>
            <Input
              name="CVV"
              fluid
              placeholder="CVV"
              label="CVV"
              onChange={(e) => onChange(e)}
            />
            <span style={{ color: "red", fontSize: "15px" }}>
              {errors["cvv"]}
            </span>
          </div>
        </div>
      </Form.Group>
      <Button type="submit" onClick={onClick}>
        <div className="make_payment">Payment</div>
      </Button>
      <Footer/>
    </div>
  );
};

export default Payment;
