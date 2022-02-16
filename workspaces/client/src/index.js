import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/home';
import Header from './default/header';
import Footer from './default/footer';
import Login from './components/Login';
import Signup from './components/Signup';
import ForgotPassword from './components/forgotPassword';

ReactDOM.render(
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<App />} />
    {/* <Route path="/defualt/Header" element={<Header />} /> */}
    <Route path="/Home" element={<Home />} />
    {/* <Route path="/default/footer" element={<Footer />} /> */}
    <Route path="/Login" element={<Login />} />
    <Route path="/Signup" element={<Signup />} />
    <Route path='/forgotpassword' element={<ForgotPassword />} />
  </Routes>
</BrowserRouter>,
document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
