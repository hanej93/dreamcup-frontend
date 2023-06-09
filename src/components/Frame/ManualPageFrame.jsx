import React from 'react';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';

const ManualPageFrame = ({children}) => {
    return (
      <div>
        <Header />
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
              <Sidebar />
            </div>
            <div className="col-md-9">
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default ManualPageFrame;