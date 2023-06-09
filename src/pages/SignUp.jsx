import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';
import logo from '../assets/logo.png';

const SignUp = () => {
  const navigate = useNavigate();

  const [nickname, setNickname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const moveToLoginPage = () => {
    navigate('/login');
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!nickname || !username || !password) {
      setError('정보를 모두 입력해 주세요');
      console.log("1");
      return;
    }

    if (!validateEmail(username)) {
      setError('유효한 이메일 형식으로 입력해 주세요');
      console.log("2");
      return;
    }

    try {
      const response = await axios.post('/api/signup', {
        nickname,
        username,
        password
      });

      // Handle success response
      console.log('Sign-up success:', response.data);
      moveToLoginPage();
    } catch (error) {
      // Handle error
      console.error('Sign-up error:', error);
    }
  };

  const validateEmail = (email) => {
    // Basic email validation using regex
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  return (
  <div className="App bg-light">
    <div className="container py-5">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-md-4">
          <div className="text-center mb-4">
            <img className="mb-4" src={logo} alt="logo" width="300" height="200" />
            <h1 className="h3 mb-3 font-weight-normal text-primary">가입하기</h1>
          </div>
          <div className="card p-4">
            <Form onSubmit={handleSignUp}>
              <Form.Group controlId="formNickname" className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Enter your nickname"
                  value={nickname}
                  onChange={handleNicknameChange}
                />
              </Form.Group>

              <Form.Group controlId="formUsername" className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Enter your email"
                  value={username}
                  onChange={handleUsernameChange}
                  isInvalid={error && !validateEmail(username)}
                />
                {error && !validateEmail(username) && (
                  <Form.Control.Feedback type="invalid">
                    {error}
                  </Form.Control.Feedback>
                )}
              </Form.Group>

              <Form.Group controlId="formPassword" className="mb-3">
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="mb-3 w-100">
                가입하기
              </Button>
              <Button variant="secondary" onClick={moveToLoginPage} className="w-100">
                로그인 페이지로 돌아가기
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default SignUp;