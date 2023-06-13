import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';

function ChatRoomCreateModal() {
  const token = sessionStorage.getItem('dreamcup-token');
  axios.defaults.headers.common['Authorization'] = token;

  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [title, setTitle] = useState('');
  const [userMaxCount, setUserMaxCount] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [error, setError] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setTitle('');
    setError('');
    setUserMaxCount('');
    setIsPrivate('');
    setShow(true);
  }

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleUserMaxCountChange = (e) => {
    setUserMaxCount(e.target.value);
  };

  const handleIsPrivateChange = (e) => {
    if(!e.target.checked) setIsPrivate(false);
    setIsPrivate(e.target.checked);
  };

  const handleCreateChatRoom = async (e) => {
    e.preventDefault();
    setError('');

    if (!title) {
      setError('제목을 입력해주세요');
      return;
    }

    if (!userMaxCount) {
      setError('참여 인원수를 입력해주세요');
      return;
    }
    const creatorId = JSON.parse(sessionStorage.getItem('dreamcup-userData')).memberId;
    try {
      const response = await axios.post('/api/chat-rooms', {
        title,
        userMaxCount,
        creatorId,
        isPrivate
      });
      navigate('/chatRoom', { state: { "chatRoomId": response.data } });
    } catch (error) {
      console.error('make error:', error);
    }
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
      const response = await axios.post('/api/chat-rooms/public-join', {
        "chatRoomId" : chatRoomId,
        "participantId" : creatorId
      });

      navigate('/chatRoom', { state: { "chatRoomId": response.data.id } });
    } catch (error) {
      console.error('make error:', error);
    }
  };


  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        방만들기
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>채팅방 설정</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formChatroomTitle">
              <Form.Label>제목</Form.Label>
              <Form.Control 
                type="text" 
                value={title}
                maxLength={127} 
                placeholder="제목을 입력해 주세요"
                onChange={handleTitleChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formMaxUserCount">
              <Form.Label>사용할 템플릿</Form.Label>
              <Form.Select 
                size="3" >
                <option value="1" defaultValue >1번 템플릿</option>
                <option value="2">2번 템플릿</option>
                <option value="3">3번 템플릿</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formMaxUserCount">
              <Form.Label>최대 인원 수</Form.Label>
              <Form.Select 
                size="3" 
                value={userMaxCount} 
                onChange={handleUserMaxCountChange}>
                <option value="0" defaultValue >선택</option>
                <option value="4">4</option>
                <option value="8">8</option>
                <option value="16">16</option>
                <option value="32">32</option>
                <option value="64">64</option>
                <option value="128">128</option>
                <option value="256">256</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formChatroomPublic">
              <Form.Check 
                value={isPrivate} 
                onChange={handleIsPrivateChange} 
                type="checkbox" 
                id="custom-checkbox"
                label="비공개" />
            </Form.Group>
            {error && (
                <div className="alert alert-danger mt-3" role="alert">
                    {error}
                </div>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCreateChatRoom}>
            생성하기
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ChatRoomCreateModal;