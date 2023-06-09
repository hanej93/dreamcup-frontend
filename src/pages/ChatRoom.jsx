import React, { useState, useEffect } from 'react';
import { Form, InputGroup, Button, ListGroup } from 'react-bootstrap';
import { useLocation  } from 'react-router-dom';
import axios from 'axios';


const ChatRoom = () => {
  const [message, setMessage] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const location = useLocation();
  const apiurl = '/api/chatRoom/' + location.roomId;

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setChatLog([...chatLog, message]);
    setMessage('');
  };

  useEffect(() => {
    axios.get(apiurl)
      .then(response => {
        console.log("response.data");
        console.log(response.data);
      })
      .catch(error => {
        console.error('목록 조회 오류', error);
      });
  }, [apiurl]);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <h3 className="text-center">Chat Room</h3>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;