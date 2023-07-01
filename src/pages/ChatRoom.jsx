import React, { useState, useEffect } from 'react';
import {
    MDBContainer,
    MDBBadge
  } from 'mdb-react-ui-kit';
import profileOne from '../assets/hiking.png';
import profileTwo from '../assets/loan.png';
import profileThree from '../assets/user.png';
import { Link } from 'react-router-dom';
 
const Chatroom = () => {

    const [memberData, setMemberData] = useState([]);
    const [showChatRoom, setShowChatRoom]  = useState(false);

    const createMemberData = () => {
        let data = {};
        let alldata = [];
        data.imgurl = profileTwo; //이미지url 
        data.currentOnlineCheck = "O"; // Online구분값 O: 온라인, X: 비접속, Y: 자리비움, R: 바쁨
        data.selfIntro = "자기소개문구1";
        data.stateStr = "대기중"; // 상태 문구
        data.userNickname = "테스트유저1"; // 이름
        data.alertCnt = 5; // 알림숫자
        alldata.push(data)
        data = {};
        data.imgurl = profileOne; // 이미지url
        data.currentOnlineCheck = "Y"; // Online구분값 O: 온라인, X: 비접속, Y: 자리비움, R: 바쁨
        data.selfIntro = "자기소개문구2";
        data.stateStr = "게임 참가중"; // 상태 문구
        data.userNickname = "테스트유저2"; // 이름
        data.alertCnt = 0; // 알림숫자
        alldata.push(data)

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
      }


    useEffect(()=>{
        createMemberData();
      }, []);

    return (
        <section style={{ backgroundColor: '#eee', borderRadius: '40px', position: 'absolute', bottom: '3rem', right: '3rem'}}>
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

                                    {showChatRoom && 
                                    (<div className="col-md-6 col-lg-5 col-xl-4 ml-3" style= {{width: '40rem'}}>
                                        <div id="scrollableDivRight" className="pt-3 pe-3" style= {{position: 'relative', height: '20rem' , overflow: "auto"}}>

                                            <div className="d-flex flex-row justify-content-start">
                                                <img src={profileOne}
                                                alt="avatar 1" style={{width: '45px', height: '100%' }}/>
                                                <div>
                                                    <p className="small p-2 ms-3 mb-1 rounded-3" style={{ backgroundColor: '#f5f6f7' }}>
                                                        테스트 입니다. 데이터 메시지를 보내고 있어요.
                                                    </p>
                                                    <p className="small ms-3 mb-3 rounded-3 text-muted float-end">12:30 PM | 6월 12일</p>
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row justify-content-end">
                                                <div>
                                                    <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
                                                        내가 보내는 메세지 입니다.
                                                    </p>
                                                    <p className="small me-3 mb-3 rounded-3 text-muted">12:30 PM | 6월 12일</p>
                                                </div>
                                                <img src={profileThree}
                                                alt="avatar 1" style={{ width: '45px', height: '100%'}}/>
                                            </div>

                                            <div className="divider d-flex align-items-center mb-4 border-bottom">
                                                <p className="text-center mx-3 mb-0" style={{color: '#a2aab7'}}>Today</p>
                                            </div>
                                        </div>

                                        <div className="text-muted d-flex justify-content-start align-items-center pe-3 pt-3 mt-2">
                                            <img src={profileOne}
                                                alt="avatar 3" style={{ width: '2rem', height: '100%', margin: '1rem'}}/>
                                            <input type="text" className="form-control form-control-lg" id="exampleFormControlInput2" placeholder="Type message"/>
                                            <Link className="ms-1 text-muted" ><i className="fas fa-paperclip"></i></Link>
                                            <Link className="ms-3 text-muted" ><i className="fas fa-smile"></i></Link>
                                            <Link className="ms-3" ><i className="fas fa-paper-plane"></i></Link>
                                        </div>
                                    </div>)}
                                    {!showChatRoom && <div className="col-md-6 col-lg-7 col-xl-8"></div>}
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