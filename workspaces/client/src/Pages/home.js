import React from 'react';
// importing Link from react-router-dom to navigate to
// different end points.
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
// import IconButton from "@mui/material/IconButton";
// import { AlignHorizontalCenter, RecentActorsOutlined } from "@mui/icons-material";
//import {hp_table} from "./hp_table"
import img from '../images/ReitzUnion.jpg';
import { Box } from '@mui/system';
import Header from '../default/header';
import Footer from '../default/footer';

const data = [
  {
    Room_Type: 'Standard Room',
    Accomodations: '1 Queen Bed or 2 Double Beds',
    Occupancy_Rate: '$109',
    Football_Weekends: '$200-$225'
  },
  {
    Room_Type: 'Deluxe Room',
    Accomodations: '1 King Bed or 2 Queen Beds',
    Occupancy_Rate: '$119',
    Football_Weekends: '$250-$275'
  },
  {
    Room_Type: 'Business Suite',
    Accomodations: '1 Sofa Sleeper or 2 Double Beds',
    Occupancy_Rate: '$129',
    Football_Weekends: '$300'
  },
  {
    Room_Type: 'Executive Suite',
    Accomodations: '1 Sofa Sleeper or 2 Queen Beds',
    Occupancy_Rate: '$139',
    Football_Weekends: '$325'
  }
];
const Home = () => {
  return (
    <React.Fragment>
      <Header></Header>
      <div>
        <img src={img} width={'100%'} height={'400px'} />
        <p>
          Located in the heart of the University of Florida campus, the Reitz
          Union Hotel provides a unique and diverse environment, committed to
          excellent service. We strive to create a safe, welcoming, and positive
          atmosphere for our visitors, while allowing our student staff to
          cultivate their personal and professional development within the
          university. We look forward to hosting your family, group, or
          conference event.
        </p>

        <p style={{ textAlign: 'center' }}>
          <Link to='/Booking'>
            <button
              style={{
                backgroundColor: 'Orange',
                height: '50px',
                width: '300px'
              }}
              color='Secondary'
            >
              Make A Reservation
            </button>
          </Link>
        </p>

        <p>
          Check-out time is by 12 p.m. (noon), therefore, accommodations may not
          be available for check-in prior to 3 p.m. Please note that while all
          major credit cards are accepted, personal checks are not. A valid
          state issued ID and credit card are required at check-in. ALL RATES
          ARE SUBJECT TO CHANGE.
        </p>
        <h2 style={{ textAlign: 'center' }}>Accomodation and Rates</h2>
        <Box display='flex' alignItems={'center'} justifyContent={'center'}>
          <table
            style={{
              textAlign: 'left',
              borderWidth: '1px',
              borderColor: '#aaaaaa',
              borderStyle: 'solid'
            }}
          >
            <tr>
              <th>Room Type</th>
              <th>Accomodations</th>
              <th>Occupancy Rate</th>
              <th>Football Weekends</th>
            </tr>
            {data.map((val, key) => {
              return (
                <tr key={key}>
                  <td>{val.Room_Type}</td>
                  <td>{val.Accomodations}</td>
                  <td style={{ textAlign: 'center' }}>{val.Occupancy_Rate}</td>
                  <td style={{ textAlign: 'center' }}>
                    {val.Football_Weekends}
                  </td>
                </tr>
              );
            })}
          </table>
        </Box>
      </div>
      <Footer></Footer>
    </React.Fragment>
  );
};

export default Home;
