import React, {useState} from 'react';
import { MDBListGroup, MDBListGroupItem, MDBContainer, MDBNavbar, MDBIcon, MDBNavbarNav, MDBNavbarItem, MDBDropdown, MDBDropdownItem, MDBDropdownMenu, MDBDropdownToggle ,MDBBadge, MDBNavbarBrand } from 'mdb-react-ui-kit';
import userImage from '../../assets/user.png'
import SideNav from '../../components/Nav/SideNav'
import { Link, useNavigate  } from 'react-router-dom';

const BasicHeader = () => {
    const [showNavExternal, setShowNavExternal]  = useState(false);
    const navigate = useNavigate();

    // 여기서 메뉴 목록 가져오는 파트

    const moveToMyProfilePage = (e) => {
        e.preventDefault();
        navigate('/myProfile');
    };

    const handleLogOut = (e) => {
        e.preventDefault();
        console.log("LogOut");
    };

    return (
        <header style={{width : '100%'}}>
            <MDBNavbar expand='lg' light className='bg-white fixed-top'>
                <MDBContainer>
                    <MDBNavbarBrand onClick={() => setShowNavExternal(!showNavExternal)}>
                        <MDBIcon icon='bars' fas />
                    </MDBNavbarBrand>
                </MDBContainer>
                <MDBContainer fluid>
                    <MDBNavbarNav className='col-md-4 d-flex justify-content-center justify-content-md-end align-items-center' right fullWidth={true}>
                        <MDBNavbarItem >
                            <MDBDropdown>
                                <MDBDropdownToggle tag='a' className='me-3 hidden-arrow'>
                                    <MDBIcon fas icon='bell' />
                                    <MDBBadge pill notification color='danger'>
                                    20
                                    </MDBBadge>
                                </MDBDropdownToggle>
                                <MDBDropdownMenu>
                                    <MDBDropdownItem link>
                                        친구신청
                                        <MDBBadge className='ms-2' color='danger'>3</MDBBadge>
                                    </MDBDropdownItem>
                                    <MDBDropdownItem link>
                                        채팅
                                        <MDBBadge className='ms-2' color='danger'>15</MDBBadge>
                                    </MDBDropdownItem>
                                    <MDBDropdownItem link>
                                        초대장
                                        <MDBBadge className='ms-2' color='danger'>2</MDBBadge>
                                    </MDBDropdownItem>
                                </MDBDropdownMenu>
                            </MDBDropdown>
                        </MDBNavbarItem>

                        <MDBNavbarItem className='d-flex align-items-center'>
                            <MDBDropdown>
                                <MDBDropdownToggle tag='a' className='me-3 hidden-arrow' >
                                    <img
                                    src= {userImage}
                                    className='rounded-circle'
                                    height='22'
                                    alt='Avatar'
                                    loading='lazy'
                                    />
                                </MDBDropdownToggle>
                                <MDBDropdownMenu>
                                    <MDBDropdownItem link onClick={moveToMyProfilePage}>
                                        내정보
                                    </MDBDropdownItem>
                                    <MDBDropdownItem link onClick={handleLogOut}>
                                        로그아웃
                                    </MDBDropdownItem>
                                </MDBDropdownMenu>
                            </MDBDropdown>
                        </MDBNavbarItem>
                    </MDBNavbarNav>
                </MDBContainer>
            </MDBNavbar>
            <SideNav show={showNavExternal}>
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
            </SideNav>
        </header>
    );
}

export default BasicHeader;