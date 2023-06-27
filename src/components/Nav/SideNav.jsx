import React from 'react';
import { MDBListGroup, MDBListGroupItem } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';

const SideNav = () => {

  return (
    <div className="sidenav" style={{ marginTop: '50px', zIndex: 200}}>
      <MDBListGroup>
        <MDBListGroupItem>
          <Link to="/">메인</Link>
        </MDBListGroupItem>
        <MDBListGroupItem>
          <Link to="/gameroom">게임방</Link>
        </MDBListGroupItem>
        <MDBListGroupItem>
          <Link to="/chatlist">목록</Link>
        </MDBListGroupItem>
        <MDBListGroupItem>
          <Link to="/sss">에러페이지</Link>
        </MDBListGroupItem>
      </MDBListGroup>
    </div>
  );
};

export default SideNav;