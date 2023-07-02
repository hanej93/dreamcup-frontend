import React, { useState } from 'react';
import {
    MDBInput,
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane
  } from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
 
const Login = () => {
    const navigate = useNavigate();
    
    const [justifyActive, setJustifyActive] = useState('tab1');
    // 화면 변수
    const [inptbxLoginEmailAddress, setInptbxLoginEmailAddress] = useState('');
    const [inptbxLoginPassword, setInptbxLoginPassword] = useState('');
    const [inptbxSignUpEmailAddress, setInptbxSignUpEmailAddress] = useState('');
    const [inptbxSignUpNickName, setInptbxSignUpNickName] = useState('');
    const [inptbxSignUpTag, setInptbxSignUpTag] = useState('');
    const [inptbxSignUpPassword, setInptbxSignUpPassword] = useState('');
    const [inptbxSignUpPasswordCheck, setInptbxSignUpPasswordCheck] = useState('');
    const [btnRegisterDisabled, setBtnRegisterDisabled] = useState(true);

    const handleJustifyClick = (value) => {
        if (value === justifyActive) {
            return;
        }
        clearData();
        setJustifyActive(value);
    };

    const clearData = () =>{
        setInptbxLoginPassword('');
        setInptbxLoginEmailAddress('');
        setInptbxSignUpEmailAddress('');
        setInptbxSignUpNickName('');
        setInptbxSignUpPassword('');
        setInptbxSignUpPasswordCheck('');
    };

    const handleLoginEmailChange = (e) =>{
        setInptbxLoginEmailAddress(e.target.value);
    };

    const handleLoginPasswordChange = (e) =>{
        setInptbxLoginPassword(e.target.value);
    };

    const handleSignUpEmailAddressChange = (e) =>{
        setInptbxSignUpEmailAddress(e.target.value);
    };

    const handleSignUpTagChange = (e) =>{
        setInptbxSignUpTag(e.target.value);
    };

    const handleSignUpNickNameChange = (e) =>{
        setInptbxSignUpNickName(e.target.value);
    };

    const handleSignUpPasswordChange = (e) =>{
        setInptbxSignUpPassword(e.target.value);
        if(e.target.value === inptbxSignUpPasswordCheck) {
            console.log("해제");
            setBtnRegisterDisabled(false);
        } else {
            setBtnRegisterDisabled(true);
        }
    };

    const handleSignUpPasswordCheckChange = (e) =>{
        setInptbxSignUpPasswordCheck(e.target.value);
        if(e.target.value === inptbxSignUpPassword) {
            console.log("해제");
            setBtnRegisterDisabled(false);
        } else {
            setBtnRegisterDisabled(true);
        }
    };

    const handleRegistration = async (e) => {
        e.preventDefault();
        try {
          const registrationData = { 
              username : inptbxSignUpEmailAddress, 
              nickname : inptbxSignUpNickName,
              nameTag  : inptbxSignUpTag,
              password : inptbxSignUpPassword };
          
          const signupResponse = await axios.post('/api/signup', registrationData);
          console.log("success!")
          console.log(signupResponse.data);
          handleJustifyClick('tab1');
          return;
        } catch (error) {
          console.log(error);
          return;
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
          const loginData = { 
              username : inptbxLoginEmailAddress,
              password : inptbxLoginPassword };
          
          const loginResponse = await axios.post('/api/login', loginData);
          console.log("success!")
          console.log(loginResponse.data);

          const token = loginResponse.headers.authorization;

          localStorage.setItem('token', token);
          localStorage.setItem('userInfo', JSON.stringify(loginResponse.data));
          navigate('/');
          return;
        } catch (error) {
          console.log(error);
          return;
        }
    };


    return (
        <section className="vh-100" style={{backgroundColor: '#eee'}}>
            <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-1 col-xl-1">
                        <div className="card text-black" style={{borderRadius: '25px', width: '60rem', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
                            <div className="card-body p-md-5">
                                <div className="row justify-content-center">
                                    <div className="col-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 order-5 order-lg-5">
                                        <MDBTabs justify className='mb-3'>
                                            <MDBTabsItem>
                                                <MDBTabsLink onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'}>
                                                로그인
                                                </MDBTabsLink>
                                            </MDBTabsItem>
                                            <MDBTabsItem>
                                                <MDBTabsLink onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>
                                                등록
                                                </MDBTabsLink>
                                            </MDBTabsItem>
                                        </MDBTabs>
                                        <MDBTabsContent>
                                            <MDBTabsPane show={justifyActive === 'tab1'} id="pills-login" >
                                                <form className="text-center" onSubmit={handleLogin}>
                                                    <h3 className="mb-3 mt-3">로그인</h3>
                                                    <div className="d-flex flex-row align-items-center mb-4">
                                                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                        <MDBInput id="ipbxLoginEmailAddress" value={inptbxLoginEmailAddress} label='이메일 주소' type='email' onChange={handleLoginEmailChange}/>
                                                    </div>
                                                    <div className="d-flex flex-row align-items-center mb-4">
                                                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                        <MDBInput id="ipbxLoginPassword" value={inptbxLoginPassword} label='비밀번호' type='password' onChange={handleLoginPasswordChange}/>
                                                    </div>

                                                    <div className="row mb-4 justify-content-right">
                                                        <div className="col-md-6 d-flex justify-content-center">
                                                            
                                                        </div>

                                                        <div className="col-md-6 d-flex justify-content-center">
                                                         <Link>비밀번호 찾기</Link>
                                                        </div>
                                                    </div>
                                                    <button type="submit" className="btn btn-lg btn-primary btn-block mb-4">로그인</button>
                                                    <hr className="hr" />

                                                    <div className="text-center mb-3">
                                                        <button className="btn btn-lg btn-block btn-primary" style={{backgroundColor: '#dd4b39'}}
                                                            type="submit"><i className="fab fa-google me-2"></i> Google로 로그인</button>
                                                        <button className="btn btn-lg btn-block btn-primary mb-2" style={{backgroundColor: '#3b5998'}}
                                                            type="submit"><i className="fab fa-facebook-f me-2"></i>Facebook으로 로그인</button>
                                                    </div>
                                                </form>
                                            </MDBTabsPane>
                                            <MDBTabsPane show={justifyActive === 'tab2'} id="pills-register" >
                                                <form className="text-center" onSubmit={handleRegistration}>
                                                    <h3 className="mb-3 mt-3">등록하기</h3>

                                                    <div className="d-flex flex-row align-items-center mb-4">
                                                        <i className="fas fa-user fa-lg me-3 fa-fw"/>
                                                        <MDBInput id="inptbxSignUpEmailAddress" value={inptbxSignUpEmailAddress} label='이메일주소' type='email' onChange={handleSignUpEmailAddressChange}/>
                                                    </div>

                                                    <div className="d-flex flex-row align-items-center mb-4">
                                                        <i className="fas fa-envelope fa-lg me-3 fa-fw"/>
                                                        <MDBInput id="inptbxSignUpNickName" value={inptbxSignUpNickName} label='닉네임' type='text' onChange={handleSignUpNickNameChange}/>
                                                    </div>

                                                    <div className="d-flex flex-row align-items-center mb-4">
                                                        <i className="fas fa-tag fa-lg me-3 fa-fw"/>
                                                        <MDBInput id="inptbxSignUpTag" value={inptbxSignUpTag} label='태그' type='text' maxLength={4} onChange={handleSignUpTagChange}/>
                                                    </div>

                                                    <div className="d-flex flex-row align-items-center mb-4">
                                                        <i className="fas fa-lock fa-lg me-3 fa-fw"/>
                                                        <MDBInput id="inptbxSignUpPassword" value={inptbxSignUpPassword} label='비밀번호' type='password' onChange={handleSignUpPasswordChange}/>
                                                    </div>

                                                    <div className="d-flex flex-row align-items-center mb-4">
                                                        <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                                                        <MDBInput id="inptbxSignUpPasswordCheck" value={inptbxSignUpPasswordCheck} label='비밀번호 확인' type='password' onChange={handleSignUpPasswordCheckChange}/>
                                                    </div>

                                                    <div className="form-check d-flex justify-content-center mb-5">
                                                        <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                                                        <label className="form-check-label">
                                                            정보제공에 동의합니다. <Link >서비스 약관</Link>
                                                        </label>
                                                    </div>
                                                    
                                                    <button type="submit" className="btn btn-lg btn-primary btn-block mb-3" disabled={btnRegisterDisabled}>등록하기</button>
                                                    <hr className="hr" />
                                                    <div className="text-center mb-3">
                                                        <button className="btn btn-lg btn-block btn-primary" style={{backgroundColor: '#dd4b39'}}
                                                            type="submit"><i className="fab fa-google me-2"></i> Google로 로그인</button>
                                                        <button className="btn btn-lg btn-block btn-primary mb-2" style={{backgroundColor: '#3b5998'}}
                                                            type="submit"><i className="fab fa-facebook-f me-2"></i>Facebook으로 로그인</button>
                                                    </div>
                                                </form>
                                            </MDBTabsPane>
                                        </MDBTabsContent>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </section>
    );

};

export default Login;