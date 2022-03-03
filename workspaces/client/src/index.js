import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/home';
import Header from './default/header';
import Footer from './default/footer';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import ForgotPassword from './components/forgotPassword';
import Booking from './Pages/Booking';
// import { Rooms } from './Pages/Rooms';
import Payment from './Pages/Payment';

ReactDOM.render(
  <BrowserRouter>
  <Routes>
    {/* <Route path="/" element={<App />} /> */}
    <Route path="/" element={<Home />} />
    <Route path="/home" element={<Home />} />
    <Route default path="/Login" element={<Login />} />
    <Route path="/Signup" element={<Signup />} />
    <Route path="/Booking" element={<Booking />} />
    {/* <Route path="/Rooms" element={<Rooms/>} /> */}
    <Route path="/Payment" element={<Payment/>} />
    <Route path='/forgotpassword' element={<ForgotPassword />} />
  </Routes>
   
</BrowserRouter>,
document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
