import React from 'react';
import { Route, Routes } from 'react-router-dom';
import useAuth from '../utils/useAuth';
import Home from '../pages/Home';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import ChatList from '../pages/ChatList';
import ChatRoom from '../pages/ChatRoom';
import NotFound from '../pages/NotFound';

const RoutesCollection = () => {
  const auth = useAuth();

  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/login" element={<Login login={auth.login} />} />
      <Route exact path="/signUp" element={<SignUp login={auth.login} />} />
      <Route exact path="/chatList" element={<ChatList login={auth.login} />} />
      <Route exact path="/chatRoom" element={<ChatRoom login={auth.login} />} />
      <Route exact path="*" element={<NotFound/>} />
    </Routes>
  );
};

export default RoutesCollection;