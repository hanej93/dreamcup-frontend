import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';

function ChatRoomJoinModal() {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setCode('');
    setError('');
    setShow(true);
  }

  const handleCodeChange = (e) => {
    setCode(e.target.value);
    console.log(e.target.value);
    console.log(code.length);
    if(String(e.target.value).length === 6 ) {
      handleCreateChatRoom(e.target.value);
    } 
  };

  const handleCreateChatRoom = async (priviteCode) => {
    setError('');

    console.log("console.log(priviteCode); " + priviteCode);

    if (!priviteCode || priviteCode.length < 6) {
      setError('코드를 입력해주세요');
      return;
    }  

    const creator = JSON.parse(sessionStorage.getItem('dreamcup-userData')).memberId;
    console.log("creator " + creator);
    try {
      const response = await axios.post('/api/chat-rooms/private-join', {
        "privateCode" : priviteCode,
        "participantId" : creator
      });

      console.log('make success:', response.data);
      navigate('/chatRoom', { state: { "chatRoomId": response.data } });
    } catch (error) {
      console.error('make error:', error);
      setError(error.response.data.message);
    }
  };


  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        코드 입력하기
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>채팅방</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formChatroomTitle">
              <Form.Label>코드</Form.Label>
              <Form.Control 
                type="text" 
                value={code}
                maxLength={6} 
                placeholder="코드를 입력해주세요"
                onChange={handleCodeChange} />
            </Form.Group>
            {error && (
                <div className="alert alert-danger mt-3" role="alert">
                    {error}
                </div>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ChatRoomJoinModal;