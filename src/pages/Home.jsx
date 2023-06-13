import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navbar, Nav, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate  } from 'react-router-dom';
import ChatList from '../pages/ChatList';
import ChatRoomCreateModal from '../pages/ChatRoomCreateModal';
import ChatRoomJoinModal from '../pages/ChatRoomJoinModal';

const Home = () => {
  // session storage 접근
  const token = sessionStorage.getItem('dreamcup-token');
  const isLoggedIn = !!token;
  const navigate = useNavigate();

  // request header 에 토큰 넣기
  axios.defaults.headers.common['Authorization'] = token;

  const [user, setUser] = useState("");


  const moveToSignUpPage = () => {
    navigate('/signUp');
  };

  const moveToLoginPage = () => {
    navigate('/login');
  };


  const moveToMainPage = () => {
    navigate(0);
    navigate('/');
  };

  const handleLogout = () => {
    sessionStorage.removeItem('dreamcup-token');
    // TODO: Add other logout logic here
    navigate(0);
  };

  const setInfoSetting = () => {
    console.log("setting");
    const creator = JSON.parse(sessionStorage.getItem('dreamcup-userData'));
    if(creator) {
      setUser({
        nickname: creator.nickname
      });
    }    
  }

  useEffect(()=>{
    setInfoSetting();
  }, []);
  

  // <!-- <ChatList/> -->

  return (
    <div className="App bg-light">
      <Navbar bg="primary" variant="dark" expand="lg">
        <Navbar.Brand onClick={moveToMainPage}>Dreamcup</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
        </Nav>
          <Nav>
            {isLoggedIn ? (
              <>
                <Navbar.Text className="text-white mr-3">
                  " {user.nickname} " 님이 로그인 하셨습니다.
                </Navbar.Text>
                <Button variant="outline-light" onClick={handleLogout}>
                  로그아웃
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline-light" className="mr-2" onClick={moveToLoginPage} >로그인</Button>
                <Button variant="outline-light" className="mr-2" onClick={moveToSignUpPage} >회원가입</Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
        {isLoggedIn ? (
          <Container fluid>
            <Row>
              <h2 className="text-center mb-5">입장 가능한 방 목록</h2>
              <Col xs={8} style={{ height: "50em", overflow: "auto" }} id="scrollableDiv">
                <ChatList/>
              </Col>
              <Col xs={4}>
                <ChatRoomCreateModal/>
                <ChatRoomJoinModal/>
              </Col>
            </Row>
          </Container>
        ) : ( <> 
          <Container className="py-5">
            <h1 className="display-4 text-primary">드림컵에 오신걸 환영합니다</h1>
            <p className="lead">홈 화면 입니다</p>
          </Container>
        </> )}
    </div>
  );
};

export default Home;