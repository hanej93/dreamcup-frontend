import React, {useState} from 'react';
import { Route, Routes } from 'react-router-dom';
import { MDBContainer } from 'mdb-react-ui-kit';
import Home from '../pages/Home';
import Login from '../pages/Login';
import MyProfile from '../pages/MyProfile';
import Chatroom from '../pages/Chatroom';
import ChatList from '../pages/ChatList';
import Gameroom from '../pages/Gameroom';
import NotFound from '../pages/NotFound.jsx';
import BasicHeader from '../components/Header/BasicHeader'

const RoutesCollection = () => {
  const [showNavExternal, setShowNavExternal]  = useState(false);

  return (
    <>
      <BasicHeader></BasicHeader>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/myprofile" element={<MyProfile />} />
        <Route exact path="/chatlist" element={<ChatList />} />
        <Route exact path="/gameroom" element={<Gameroom />} />
        <Route exact path="*" element={<NotFound/>} />
      </Routes>
      <MDBContainer>
        {showNavExternal && (
            <Chatroom></Chatroom>
            )}
      </MDBContainer>
      <button type="button" className="btn btn-dark btn-floating" style={{ position: 'fixed', right: '20px', bottom: '20px' }}  onClick={() => setShowNavExternal(!showNavExternal)}>
          <i className="fab fa-rocketchat"></i>
      </button>
    </>
  );
};

export default RoutesCollection;