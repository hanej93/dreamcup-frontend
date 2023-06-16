import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col, ListGroup, Form, Card } from 'react-bootstrap';
import SockJS from 'sockjs-client';
import { Stomp  } from '@stomp/stompjs';
import axios from 'axios';
import { useLocation, useNavigate  } from 'react-router-dom';

function ChatRoom() {
  const token = sessionStorage.getItem('dreamcup-token');
  axios.defaults.headers.common['Authorization'] = token;
  const userId = JSON.parse(sessionStorage.getItem('dreamcup-userData')).memberId;
  const location = useLocation();
  const navigate = useNavigate();

  const [stompClient, setStompClient] = useState(null);
  const [message, setMessage] = useState("");
  const [sender, setSender] = useState("");
  const [messages, setMessages] = useState([]);
  const [participantMembers, setParticipantMembers] = useState([]);
  const [chatRoomId, setChatRoomId] = useState("");

  const [creatorName, setCreatorName ] = useState("");
  const [currentUserCount, setCurrentUserCount ] = useState("");
  const [maxUserCount, setMaxUserCount ] = useState("");
  const [title, setTitle ] = useState("");
  const [updatedDate, setUpdatedDate ] = useState("");

  const handleWebSocket = () => {
    const socket = new SockJS('/ws');
    const client = Stomp.over(socket);
    client.connect({}, frame => {
      console.log('Connected: ' + frame);
      client.subscribe('/exchange/chat.exchange/message.100', function(message) {
        console.log(`<<< message: ${message}`);
        // setMessages(prevMessages => [...prevMessages, JSON.parse(message.body)]);
      });
    });
    setStompClient(client);
    return () => {
      if (client !== null) {
        client.disconnect();
      }
      console.log("Disconnected");
    };
  };

  useEffect(() => {
    handleChatRoomInfo();
    handleWebSocket();
  }, []);

  const sendMessage = () => {
    let chatVo = {
      chatRoomId: chatRoomId,
      senderId: sender,
      message: message,
      messageType: "MEMBER"
    };
    stompClient.send("/pub/message", {}, JSON.stringify(chatVo));
    setMessage('');
  };

  const showMessage = (message) => {
    setMessages(prevMessages => [...prevMessages, message]);
  };

  const handleChatRoomInfo = () => {
    console.log("chatRoomId ::: " + chatRoomId);
    setChatRoomId("100");
    axios.defaults.headers.common['Authorization'] = token;
    axios.get('/api/chat-rooms/100')
    .then(response => {
      console.log(response.data);
      setCreatorName(response.data.creatorName);
      setCurrentUserCount(response.data.currentUserCount);
      setMaxUserCount(response.data.maxUserCount);
      setTitle(response.data.title);
      setUpdatedDate(response.data.updatedDate);
      handleChatRoomMemberList();
    })
    .catch(error => {
      console.error('목록 조회 오류', error);
    });
  }; 

  const handleChatRoomMemberList = () => {
    let params = {
      "ChatRoomId" : chatRoomId
    };
    axios.get('/api/chat-rooms/members', {params : params})
    .then(response => {
      console.log('목록 조회 성공', response.data);
      setParticipantMembers(response.data);
      let check = false;
      response.data.forEach((elem, index)=>{
        if(elem.participantId === userId) {
          check = true;
        }
      });
      if(!check) {
        handleJoinPublicChatRoom(chatRoomId);
      }
    }).catch(error => {
      console.error('목록 조회 오류', error);
    });
  };

  const handleJoinPublicChatRoom = async (chatRoomId) => {
    const creatorId = JSON.parse(sessionStorage.getItem('dreamcup-userData')).memberId;
    
    try {
      const response = await axios.post('/api/chat-rooms/public-join', {
        "chatRoomId" : chatRoomId,
        "participantId" : creatorId
      });

      navigate('/chatRoom', { state: { "chatRoomId": response.data.id } });
    } catch (error) {
      console.error('make error:', error);
    }
  };

  const handleJoinPrivateChatRoom = async (chatRoomId) => {
    const creatorId = JSON.parse(sessionStorage.getItem('dreamcup-userData')).memberId;
    
    try {
      const response = await axios.post('/api/chat-rooms/private-join', {
        "privateCode" : "",
        "participantId" : creatorId
      });

      navigate('/chatRoom', { state: { "chatRoomId": response.data.id } });
    } catch (error) {
      console.error('make error:', error);
    }
  };

  const handleChatRoomExit = () => {
    
    axios.post('/api/chat-rooms/leave',{
      "chatRoomId" : chatRoomId,
      "participantId" : userId
    })
    .then(response => {
      console.error('목록 조회 성공', response.data);
      navigate('/');
    }).catch(error => {
      console.error('목록 조회 오류', error);
    });
  }

  return (
    <Container>
      <Row>
        <Col>
          <h2>{title}</h2>
          <p>방장 : {creatorName}</p>
          <p>참가 인원 수 : {currentUserCount} / {maxUserCount}</p>
          <p>{updatedDate}</p>
        </Col>
        <Col xs={2}>
          <Button variant="danger" onClick={handleChatRoomExit}>나가기</Button>
        </Col>
      </Row>
      <Row>
        <Col xs={3}>
          <h4>멤버들</h4>
          <ListGroup>
            {participantMembers.map((member, i) => (
              <ListGroup.Item key={i}>{member.nickname}</ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col>
          <h4>Chat</h4>
          <Card style={{ height: '300px', marginBottom: '10px', overflow: 'auto' }}>
            <Card.Body>
              {messages.map((message, i) => (
                <p key={i}><strong>{message.senderId}</strong>: {message.message}</p>
              ))}
            </Card.Body>
          </Card>
          <Form>
            <Form.Group controlId="chatMessage">
              <Form.Control as="textarea" rows={3} value={message} onChange={e => setMessage(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="button" onClick={sendMessage}>보내기</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default ChatRoom;