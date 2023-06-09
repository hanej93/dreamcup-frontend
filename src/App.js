import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import RoutesCollection from './routes/RoutesCollection';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <RoutesCollection/>
    </BrowserRouter>
  );
};

export default App;