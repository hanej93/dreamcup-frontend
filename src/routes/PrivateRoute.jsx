import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';

const PrivateRoute = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/login" element={<Login/>} />
      <Route exact path="*" element={<NotFound/>} />
    </Routes>
  );
};

export default PrivateRoute;