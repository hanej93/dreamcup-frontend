import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import RoutesCollection from './routes/RoutesCollection';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <RoutesCollection/>
    </BrowserRouter>
  );
}

export default App;
