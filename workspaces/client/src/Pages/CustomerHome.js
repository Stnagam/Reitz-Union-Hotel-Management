import React from "react";
import Header_Common from "../components/header_common";
import Footer from "../default/footer";
// import "../Style/home.css";
import Tile from "../components/Tile";
import "../Style/customerHome.css";

const CustomerHome = () => {
  var today = new Date();
  var date = today.getDate();
  var month = today.getMonth() + 1;
  var year = today.getFullYear();
  if (date < 10) {
    date = "0" + date.toString();
  }
  if (month < 10) {
    month = "0" + month.toString();
  }
  // month = {month<10 ? `0${month}`:`${month}`};
  var date = date + "-" + month + "-" + year;
  return (
    <div className="cust-home">
      <Header_Common />
      <div>
        <h3>Currnet booking</h3>
        {(date == "23-03-2022") && <Tile isCurrent={true} />}
        {/* {(date == "21-03-2022") || "No current booking" } */}
      </div>
      <div>
        <h3>Upcoming booking</h3>
        {(date > "10-03-2022") && <Tile isCurrent={false} />}
        {(date > "10-03-2022") || "No upcoming booking" }
      </div>
      <Footer style={{"margin-bottom":"100px"}}/>
    </div>
  );
};

export default CustomerHome;
