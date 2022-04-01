import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import Request from "./Request";
import img from "../images/deluxe.jpg";

const Tile = (props) => {
  const [isRequested, setisRequested] = useState(false);
  const onClick = (e) => {
    // e.preventDefault();
    if (isRequested == false) setisRequested(true);
    if (isRequested == true) setisRequested(false);
  };
  return (
    <div>
      <Card >
        <h4>Deluxe room</h4>
        <img variant="top" s src={img} style={{ width: "80%" }} />
        <Card.Body>
          <p>Booking Date: </p>

          {props.isCurrent && (
            <button type="submit" style={{"background-color":"#ffa500"}} onClick={onClick}>
              Raise a reuqest
            </button>
          )}
          {isRequested && <Request />}
        </Card.Body>
      </Card>
    </div>
  );
};

export default Tile;
