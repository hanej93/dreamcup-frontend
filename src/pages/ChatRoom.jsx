import React, { useState, useEffect } from 'react';
import { Container, Row, Col, FormControl, Button, Alert } from 'react-bootstrap';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import axios from 'axios';
import { useLocation  } from 'react-router-dom';

function ChatRoom() {
  const location = useLocation();

  const [stompClient, setStompClient] = useState(null);
  const [message, setMessage] = useState("");
  const [sender, setSender] = useState("");
  const [messages, setMessages] = useState([]);
  const chatRoomId = location.state.chatRoomId;

  useEffect(() => {
    // var client = new Client({
    //   webSocketFactory: () => new SockJS('/ws'),
    // });
    // let subscription;

    // client.brokerURL = '/ws';
    // client.onConnect = function(frame) {
    //     console.log('Connected: ' + frame);
    //     subscription = client.subscribe('/exchange/chat.exchange/message.' + chatRoomId, function(message) {
    //         console.log(`<<< message: ${message}`);
    //         showMessage(JSON.parse(message.body));
    //     });
    // };

    // client.onStompError = function(frame) {
    //   console.log('Broker reported error: ' + frame.headers['message']);
    //   console.log('Additional details: ' + frame.body);
    // };

    // client.activate();

    // setStompClient(client);

    // return () => {
    //   if(subscription) {
    //     subscription.unsubscribe();
    //   }
    //   if(client.active) {
    //     client.deactivate();
    //   }
    //   console.log("Disconnected");
    // }
    // chatRoomId
}, []);

useEffect(() => {
  axios.get('/api/chat-rooms', {
    params: chatRoomId
  })
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error('목록 조회 오류', error);
  });
}, [chatRoomId]);

  const sendMessage = () => {
    let chatVo = {
        chatRoomId: chatRoomId,
        senderId: sender,
        content: message,
    };
    stompClient.send("/pub/message", {}, JSON.stringify(chatVo));
  }

  const showMessage = (message) => {
    setMessages(prevMessages => [...prevMessages, message]);
  }

  return (
    <Container>
        <Row>
            <Col md={{ span: 6, offset: 3 }} className="mt-5">
                <h2>Chat Room</h2>
                <div className="mt-3">
                    {messages.map((message, i) => (
                        <Alert key={i} variant="primary">
                            <strong>{message.sender}</strong>: {message.content}
                        </Alert>
                    ))}
                </div>
                <FormControl className="mt-3" placeholder="Type your message..." value={message} onChange={e => setMessage(e.target.value)} />
                <Button className="mt-3" onClick={sendMessage}>Send</Button>
                <FormControl className="mt-3" placeholder="Sender..." value={sender} onChange={e => setSender(e.target.value)} />
                <FormControl className="mt-3" value={chatRoomId} disabled />
            </Col>
        </Row>
    </Container>
  );
}

export default ChatRoom;