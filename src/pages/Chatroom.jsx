import React, { useState, useEffect } from 'react';
import {
    MDBContainer,
    MDBBadge
  } from 'mdb-react-ui-kit';
import profileTwo from '../assets/loan.png';
import { Link } from 'react-router-dom';
import Chatting from '../components/Chat/Chatting';
import axios from 'axios';
 
const Chatroom = ({show}) => {

    const [memberData, setMemberData] = useState([]);
    const [showChatRoom, setShowChatRoom]  = useState(false);

    const [animationClass, setAnimationClass] = useState('');

    useEffect(() => {
        if (show) {
            setAnimationClass('slide-up');
            callFriendList();
        } else {
            setAnimationClass('slide-down');
        }
        console.log("dude" + show);
    }, [show]);

    const callFriendList= async () => {
        try {
          let loginData = JSON.parse(localStorage.getItem('userInfo'));
            
          const requestData = { 
                page : 1,
                size : 10,
                memberId: loginData.memberId,
                accepted : true
          };

          console.log("requestData!");
          console.log(requestData);
          axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
          
          const friendListResponse = await axios.get('/api/friendship', requestData);
          console.log("success!")
          console.log(friendListResponse.data);
          createMemberData(friendListResponse.data.content);
          return;
        } catch (error) {
          console.log(error);
          return;
        }
    };

    const createMemberData = (inputData) => {
        let data = {};
        let alldata = [];

        inputData.map((elem, indx) => {
            data.imgurl = profileTwo; //이미지url 
            data.currentOnlineCheck = "O"; // Online구분값 O: 온라인, X: 비접속, Y: 자리비움, R: 바쁨
            data.selfIntro = "자기소개문구 " + indx;
            data.stateStr = "대기중"; // 상태 문구
            data.userNickname = elem.nickname; // 이름
            data.alertCnt = 5; // 알림숫자
            alldata.push(data)
        });

        setMemberData(alldata);
    };

    const chooseBadge = (params) => {
        switch (params) {
          case 'P':
            return <MDBBadge color='primary' dot />
          case 'Y':
            return <MDBBadge color='warning' dot />
          case 'R':
            return <MDBBadge color='danger' dot />
          case 'O':
            return <MDBBadge color='success' dot />
          case 'X':
            return <MDBBadge color='secondary' dot />
          default:
            return <MDBBadge color='secondary' dot />
        }
    };

    return (
        <section className={`${animationClass} toggle-chat position-fixed`} style={{ backgroundColor: '#eee', borderRadius: '40px'}}>
            <MDBContainer className="py-5">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card" id="chat3" style={{borderRadius: '15px'}}>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0" style={{width: '25rem'}}>
                                        <div className="p-3" >
                                            <div className="input-group rounded mb-3">
                                                <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search"
                                                aria-describedby="search-addon" />
                                                <span className="input-group-text border-0" id="search-addon">
                                                    <i className="fas fa-search"></i>
                                                </span>
                                            </div>
                                            <div id="scrollableDivLeft" style={{position: 'relative', height: '20rem', overflow: "auto"}}>
                                                <ul className="list-unstyled mb-0">
                                                    {memberData.map((data, i) => {
                                                        return (
                                                        <li key={i} className="p-2 border-bottom">
                                                            <Link className="d-flex justify-content-between" onClick={() => setShowChatRoom(!showChatRoom)}>
                                                            <div className="d-flex flex-row">
                                                                <div>
                                                                    {chooseBadge(data.currentOnlineCheck)}
                                                                    <img
                                                                        src={data.imgurl}
                                                                        alt="avatar" className="d-flex align-self-center me-3" width="60em"/>                                                
                                                                </div>
                                                                <div className="pt-1">
                                                                <p className="fw-bold mb-0">{data.userNickname}</p>
                                                                <p className="small text-muted">{data.selfIntro}</p>
                                                                </div>
                                                            </div>
                                                            <div className="pt-1">
                                                                <p className="small text-muted mb-1">{data.stateStr}</p>
                                                                {data.alertCnt > 0 &&  (<span className="badge bg-danger rounded-pill float-end">{data.alertCnt}</span>)}
                                                            </div>
                                                            </Link>
                                                        </li>);
                                                    })}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <Chatting show={showChatRoom}></Chatting>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </MDBContainer>
        </section>
    );

};

export default Chatroom;