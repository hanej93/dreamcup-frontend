import React from 'react';
import {
  MDBBtn
} from 'mdb-react-ui-kit';
import { useNavigate } from "react-router-dom";
import backImg from '../assets/homebackimg.jpg';

const Home = () => {
  const navigate = useNavigate();

  const handleBtns = () => {
    console.log("test :::: ");
    navigate("/login");
  };

  return (
    <>
      <div
        id='intro-example'
        className='p-5 text-center bg-image'
        style={{ backgroundImage: `url(${backImg})`, height: '40rem'}}
      >
        <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
          <div className='d-flex justify-content-center align-items-center h-100'>
            <div className='text-white'>
              <h1 className='mb-3'>DreamCup에 오신걸 환영합니다</h1>
              <h5 className='mb-4'>오늘도 좋은하루 되세요</h5>
              <MDBBtn
                className="m-2 btn-outline-light "
                outline
                size="lg"
                rel="nofollow"
                target="_blank"
                onClick={handleBtns}
              >
                로그인 / 회원가입
              </MDBBtn>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


export default Home;