import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';

const PublicRoute = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/about" element={<About />} />
      <Route exact path="/contact" element={<Contact/>} />
      <Route exact path="/login" element={<Login/>} />
      <Route exact path="*" element={<NotFound/>} />
    </Routes>
  );
};

export default PublicRoute;