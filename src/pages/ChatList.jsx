import React, { useState, useEffect } from 'react';
import { ListGroup, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';

const ChatList = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem('dreamcup-token');
  axios.defaults.headers.common['Authorization'] = token;

  const [chatRooms, setChatRooms] = useState([]);

  const moveToLoginPage = () => {
    navigate('/chatRoom', {state : { "roomId" : "1"}});
  };
  
  useEffect(() => {
    axios.get('/api/chatRoom')
      .then(response => {
        console.log("response.data");
        console.log(response.data);
        setChatRooms(response.data);
      })
      .catch(error => {
        console.error('목록 조회 오류', error);
      });
  }, []);

  return (
    <Container fluid="md" className="mt-5">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h2 className="text-center mb-5">입장 가능한 방 목록</h2>
          <ListGroup variant="flush">
            {chatRooms.map((room, i) => (
              <ListGroup.Item key={i}>
                <h5>{room.title}</h5>
                <p>생성일자 : {room.updatedDate}</p>
                <Button variant="primary" onClick={moveToLoginPage} >참가하기</Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default ChatList;