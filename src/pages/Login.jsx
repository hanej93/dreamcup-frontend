import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';
import logo from '../assets/logo.png';

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const moveToSignUpPage = () => {
    navigate('/signUp');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('정보를 모두 입력해 주세요');
      return;
    }

    if (!validateEmail(username)) {
      setError('유효한 이메일 형식으로 입력해 주세요');
      return;
    }

    try {
      const response = await axios.post('/api/login', {
        username,
        password
      });
      console.log('Login success:', response.data);
      // 'Authorization' header 에서 토큰 빼오기 
      const token = response.headers.authorization;
      // session storage 에 저장
      sessionStorage.setItem('dreamcup-token', token);
      sessionStorage.setItem('dreamcup-userData', JSON.stringify(response.data));
      setError('');
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      setUsername("");
      setPassword("");
      setError(`아이디 또는 비밀번호를 잘못 입력했습니다.
      입력하신 내용을 다시 확인해주세요.`);
    }
  };

  const validateEmail = (email) => {
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
            <h1 className="h3 mb-3 font-weight-normal text-primary">로그인</h1>
          </div>
          <div className="card p-4">
            <Form onSubmit={handleLogin}>
              <Form.Group controlId="formUsername">
                <Form.Control
                  type="text"
                  placeholder="이메일 주소를 입력해 주세요"
                  value={username}
                  onChange={handleUsernameChange}
                  isInvalid={error && !validateEmail(username)}
                  className="mb-3"
                />
              </Form.Group>
              <Form.Group controlId="formPassword">
                <Form.Control
                  type="password"
                  placeholder="비밀번호를 입력해주세요"
                  value={password}
                  onChange={handlePasswordChange}
                  className="mb-3"
                />
              </Form.Group>
              {error && (
                  <div className="alert alert-danger mt-3" role="alert">
                      {error}
                  </div>
              )}
              <Button variant="primary" type="submit" className="mb-3 w-100">
                로그인
              </Button>
              <Button variant="secondary" onClick={moveToSignUpPage} className="w-100">
                회원가입
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Login;