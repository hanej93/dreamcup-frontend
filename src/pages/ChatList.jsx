import React, { useState, useEffect } from 'react';
import { Button, Card, Badge } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';

const ChatList = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem('dreamcup-token');
  axios.defaults.headers.common['Authorization'] = token;

  const [chatRooms, setChatRooms] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [activeRoom, setActiveRoom] = useState(null);


  const moveToChatPage = (chatRoomId) => {
    navigate('/chatRoom', { state: { "chatRoomId": chatRoomId } });
  };

  const onChatRoomClick = (chatRoomId) => {
    moveToChatPage(chatRoomId);
    setActiveRoom(chatRoomId);
  };
  
  const setChatRoomTitle = (room) => {
    let title = "[" + room.currentUserCount + " / " + room.maxUserCount + "] " + room.title;
    return title;
  };
  
  const getChatRoomList = () => {
    console.log("getChatRoomList ::: ");
    if( currentPage == 0 ) {
      setChatRooms([]);
    }

    if (currentPage > 0 && currentPage >= totalPages) {
      setHasMore(false);
      return;
    }
    let params = {
      "schType": "title",
      "isPublicOnly": true,
      "keyword": "",
      "page": currentPage,
      "size": 15
    };
    axios.get('/api/chat-rooms', {params: params})
    .then(response => {
      setChatRooms(prevRooms => [...prevRooms, ...response.data.content]);
      setTotalPages(response.data.totalPages);
      setCurrentPage(prevPage => prevPage + 1);
    })
    .catch(error => {
      console.error('목록 조회 오류', error);
    });
  };

  useEffect(() => {
    getChatRoomList();
  }, []);


  return (
      <InfiniteScroll
        pullDownToRefreshThreshold={50}
        scrollableTarget="scrollableDiv"
        dataLength={chatRooms.length}
        next={getChatRoomList}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        onScroll={() => console.log('Scrolled')}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>목록조회 끝</b>
          </p>
        }>
          {chatRooms.map((room, i) => (
            <Card 
              key={i} 
              onClick={() => onChatRoomClick(room.chatRoomId)} 
              border={room.chatRoomId === activeRoom ? "primary" : ""}
              className="mb-3"
            >
              <Card.Body>
                <Card.Title>
                  {setChatRoomTitle(room)}
                  {room.chatRoomId === activeRoom && <Badge className="ml-2" variant="primary">Active</Badge>}
                </Card.Title>
                <Card.Text>
                  { "(?인용)" + "템플릿명 - " + room.creatorName}
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </InfiniteScroll>
  );
};

export default ChatList;