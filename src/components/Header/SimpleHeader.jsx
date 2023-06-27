import React, { useState } from 'react';
import {
  MDBNavbar,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarToggler,
  MDBNavbarLink,
  MDBContainer,
  MDBIcon,
  MDBCollapse
} from 'mdb-react-ui-kit';

const SimpleHeader = () => {
  const [showBasic, setShowBasic] = useState(false);

  return (
    <header>
    <MDBNavbar expand='lg' light bgColor='white'>
        <MDBContainer fluid>
            <MDBNavbarToggler
            onClick={() => setShowBasic(!showBasic)}
            >
            <MDBIcon fas icon='bars' />
            </MDBNavbarToggler>
            <MDBCollapse show={true}>
            <MDBNavbarNav right className='mb-2 mb-lg-0'>
                <MDBNavbarItem active>
                <MDBNavbarLink aria-current='page' href='#'>
                    Home
                </MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                <MDBNavbarLink >Features</MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                <MDBNavbarLink >Pricing</MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                <MDBNavbarLink >About</MDBNavbarLink>
                </MDBNavbarItem>
            </MDBNavbarNav>
            </MDBCollapse>
        </MDBContainer>
    </MDBNavbar>
    </header>
  );
}


export default SimpleHeader;