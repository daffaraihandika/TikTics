import React from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardTitle,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCheckbox,
  MDBTypography
}
from 'mdb-react-ui-kit';
import './SignIn.css';

function SignIn() {
  return (
    <MDBContainer className='my-5'>
      <MDBCard>

        <MDBRow className='g-0 d-flex align-items-center'>

          <MDBCol md='4'>
            <MDBCardImage src='https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg' alt='phone' className='rounded-t-5 rounded-tr-lg-0' fluid />
          </MDBCol>

          <MDBCol md='5' className='d-flex flex-column justify-content-center mx-auto'>
            <MDBContainer>
              <MDBCardTitle className='d-flex justify-content-center'>
              <MDBTypography variant='h1'> Sign In </MDBTypography>
              </MDBCardTitle>
              <MDBCardBody>

                <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email'/>
                <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password'/>

                <div className="d-flex justify-content-between mx-4 mb-4">
                  <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
                  <a href="!#">Forgot password?</a>
                </div>

                <MDBBtn className="mb-4 w-100">Sign in</MDBBtn>

              </MDBCardBody>
            </MDBContainer>

          </MDBCol>

        </MDBRow>

      </MDBCard>
    </MDBContainer>
  );
}

export default SignIn;