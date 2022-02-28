import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Header from "../default/header";
import "../Style/booking.css";

const Booking = () => {
  const [filterdata, setFilterdata] = useState({
    adults: 0,
    children: 0,
    checkin: "",
    checkout: "",
  });

  const { adults, children, checkin, checkout } = filterdata;

  const onChange = (e) =>
    setFilterdata({ ...filterdata, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(filterdata);
  };
  return (
    <div>
      <Header />
      <Form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="checkin">
          <Form.Group controlId="email">
            <h4>
              <Form.Label>Checkin Date</Form.Label>
            </h4>
            <Form.Control
              name="checkin"
              type="date"
              placeholder="Enter email"
              value={checkin}
              required
              onChange={(e) => onChange(e)}
            />
            <br />
          </Form.Group>
        </div>

        <div className="checkout">
          <Form.Group controlId="password">
            <h4>
              <Form.Label>Checkout Date</Form.Label>
            </h4>
            <Form.Control
              type="date"
              name="checkout"
              placeholder="Enter Password"
              value={checkout}
              required
              onChange={(e) => onChange(e)}
            />
            <br />
          </Form.Group>
        </div>

        <div className="adults">
          <h4>
            <label for="exampleFormControlSelect1">Adults(13 and above)</label>
          </h4>
          <select
            class="form-control"
            name="adults"
            onChange={(e) => onChange(e)}
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
          </select>
        </div>
        <br />

        <div className="children">
          <h4>
            <label for="exampleFormControlSelect1">Children(12 and below</label>
          </h4>
          <select
           
            name="children"
            onChange={(e) => onChange(e)}
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </div>
      </Form>

       <Link to = "/rooms">       
      <Button type="submit" className="submit" onSubmit={(e) => onSubmit(e)}>
        Submit
      </Button>
      </Link>
    </div>
  );
};

export default Booking;
