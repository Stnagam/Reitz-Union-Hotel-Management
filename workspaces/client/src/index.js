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
import ResetPassword from './components/setNewPassword';
import Booking from './Pages/Booking';
// import { Rooms } from './Pages/Rooms';
import Payment from './Pages/Payment';
import Reservation from './Pages/Reservation';
import CustomerHome from './Pages/CustomerHome.js';
import AdminLogin from './Pages/AdminLogin';
import Admin from './Pages/Admin';


ReactDOM.render(
  <BrowserRouter>
  <Routes>
    {/* <Route path="/" element={<App />} /> */}
    <Route path="/" element={<Home/>} />
    <Route path="/reservation" element={<Reservation />} />
    <Route default path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/booking" element={<Booking />} />
    {/* <Route path="/Rooms" element={<Rooms/>} /> */}
    <Route path="/payment" element={<Payment/>} />
    <Route path='/forgotpassword' element={<ForgotPassword />} />
    <Route path='/resetpassword' element={<ResetPassword />} />
     <Route path="/CustomerHome" element={<CustomerHome/>} />
     <Route path="/adminLogin" element={<AdminLogin/>} />
     <Route exact path="/admin" element={<Admin/>} />
  </Routes>
   
</BrowserRouter>,
document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
