import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import profileOne from '../../assets/hiking.png';
import profileTwo from '../../assets/loan.png';

const Chatting = ({show}) => {

    // const [showChatRoom, setShowChatRoom]  = useState(false);
    const [animationClass, setAnimationClass] = useState(() => 'slide-hide');
    const [chatData, setChatData] = useState([]);
    const [myChatMessege, setMyChatMessege] = useState('');

    const handleKeyDown = (event) => {
        if (event.keyCode === 13) {
            handleEnter();
        }
    };

    const handleClickSendMessage = (e) => {
        e.preventDefault();
        handleEnter();
    };

    const handleEnter = () => {
        if(myChatMessege) {
            console.log(myChatMessege);
            let data = {};
            data.imgurl = profileOne; //이미지url 
            data.chatMsgContent = myChatMessege;
            data.msgDvcd = 2; // 메세지 구분코드
            data.date = getCurrentDateTime(); // 날짜
            chatData.push(data);
            scrollDivToBottom();
        }
        setMyChatMessege('');
    };

    const handleChange = (event) => {
        setMyChatMessege(event.target.value);
    };

    function getCurrentDateTime() {
        const now = new Date();
      
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
      
        const dateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      
        return dateTime;
    };

    useEffect(() => {
        createChatData();
    }, []);

    const createChatData = () => {
        let data = {};
        let alldata = [];

        data.imgurl = profileTwo; //이미지url 
        data.chatMsgContent = "상대방이 보낸 메세지입니다.";
        data.msgDvcd = 1; // 메세지 구분코드
        data.date = "2023-06-12 12:30:00"; // 날짜
        alldata.push(data)

        data = {};
        data.imgurl = profileOne; //이미지url 
        data.chatMsgContent = "내가 보낸 메세지입니다.";
        data.msgDvcd = 2; // 메세지 구분코드
        data.date = "2023-06-12 12:30:00"; // 날짜
        alldata.push(data)

        data = {};
        data.imgurl = ""; //이미지url 
        data.chatMsgContent = "공지사항입니다";
        data.msgDvcd = 0; // 메세지 구분코드 0: 공지/ 1: 상대방/ 2: 자신
        data.date = "2023-06-12 12:30:00"; // 날짜
        alldata.push(data)

        data = {};
        data.imgurl = profileTwo; //이미지url 
        data.chatMsgContent = "상대방이 보낸 메세지입니다.";
        data.msgDvcd = 1; // 메세지 구분코드
        data.date = "2023-07-02 12:30:00"; // 날짜
        alldata.push(data)

        data = {};
        data.imgurl = profileTwo; //이미지url 
        data.chatMsgContent = "상대방이 보낸 메세지입니다.";
        data.msgDvcd = 1; // 메세지 구분코드
        data.date = "2023-07-02 12:30:00"; // 날짜
        alldata.push(data)

        setChatData(alldata);
        scrollDivToBottom();
    };

    const dateToString = (dateString) => {
        const date = new Date(dateString);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const period = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
        const formattedMinutes = minutes.toString().padStart(2, '0');

        return `${formattedHours}:${formattedMinutes} ${period} | ${date.getMonth() + 1}월 ${date.getDate()}일`;
    };

    const scrollDivToBottom = () => {
        const scrollableDiv = document.getElementById('scrollableDivRight');
        scrollableDiv.scrollTop = scrollableDiv.scrollHeight;
    };

    const printMsg = (msg, dvcd, date) => {
        let dateStr = dateToString(date);
        switch (dvcd) {
          case 0:
            return <div>
                <p className="small p-2 mb-1 text-white rounded-3 bg-secondary">
                    {msg}
                </p>
                <p className="small ms-3 mb-3 rounded-3 text-muted float-end">{dateStr}</p>
            </div>
          case 1:
            return <div>
                <p className="small p-2 ms-3 mb-1 rounded-3" style={{ backgroundColor: '#f5f6f7' }}>
                    {msg}
                </p>
                <p className="small ms-3 mb-3 rounded-3 text-muted float-end">{dateStr}</p>
            </div>
          case 2:
            return <div>
                <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
                    {msg}
                </p>
                <p className="small me-3 mb-3 rounded-3 text-muted float-end">{dateStr}</p>
            </div>
          default:
            return
        }
    };

    useEffect(() => {
        if (show) {
            setAnimationClass('slide-show');
        } else {
            setAnimationClass('slide-hide');
        }
    }, [show]);

    return (
    <div className={`col-md-6 col-lg-5 col-xl-4  ${animationClass}`} style= {{width: '40rem'}}>
        <div id="scrollableDivRight" className="pt-3 pe-3" style= {{position: 'relative', height: '20rem' , overflow: "auto"}}>
            <div className="divider d-flex align-items-center mb-4 border-bottom">
                <p className="text-center mx-3 mb-0" style={{color: '#a2aab7'}}>Today</p>
            </div>
            {chatData.map((data, i) => {
                return (
                    <div key={i} className={`d-flex flex-row 
                        ${data.msgDvcd === 0 && 'justify-content-center'} 
                        ${data.msgDvcd === 1 && 'justify-content-start'} 
                        ${data.msgDvcd === 2 && 'justify-content-end'}`}>
                        {(data.msgDvcd !== 0) && (<img src={data.imgurl} alt="avatar 1" style={{width: '45px', height: '100%' }} />) }
                        {printMsg(data.chatMsgContent, data.msgDvcd, data.date)}
                    </div>
                );
            })}
        </div>

        <div className="text-muted d-flex justify-content-start align-items-center pe-3 pt-3 mt-2">
            <input 
                type="text" 
                className="form-control form-control-lg" 
                placeholder="메세지를 입력해주세요"
                value={myChatMessege}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />
            <Link className="ms-3 text-muted"><i className="fas fa-smile"></i></Link>
            <Link className="ms-3" onClick={handleClickSendMessage}><i className="fas fa-paper-plane" ></i></Link>
        </div>
    </div>
    );

}


export default Chatting;