import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const RouteGuard = ({ path, component: Component, ...rest }) => {
  function hasJWT() {
    const token = localStorage.getItem("dreamcupToken");
    return !!token;
  }

  return (
    <Route
      path={path}
      {...rest}
      element={hasJWT() ? <Component /> : <Navigate to="/" replace />}
    />
  );
};

export default RouteGuard;