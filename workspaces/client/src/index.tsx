import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './home';
import Header from './header';
import Footer from './footer';
import Login from './login';

ReactDOM.render(
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<App />} />
    <Route path="/Header" element={<Header />} />
    <Route path="/Home" element={<Home />} />
    <Route path="/footer" element={<Footer />} />
    <Route path="/Login" element={<Login />} />
  </Routes>
</BrowserRouter>,
document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
