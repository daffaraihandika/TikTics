import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:5000/login', {
          username, password
        });
        
        navigate('/dashboard');
        console.log("Login Berhasil");
        console.log("Response :", response.data);
        
    } catch (error) {
        console.log(error.response.data.error);
        setMsg(error.response.data.error);
        setError(true);
    }
  }

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
                <form onSubmit={loginHandler}>
                  <MDBInput wrapperClass='mb-4' label='Username' id='form1' type='text' value={username} onChange={(e) => setUsername(e.target.value)} required/>
                  <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' value={password} onChange={(e) => setPassword(e.target.value)} required/>

                  <div className="d-flex justify-content-between mx-4 mb-4">
                    <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
                    <a href="!#">Forgot password?</a>
                  </div>

                  <MDBBtn className="mb-4 w-100">Sign in</MDBBtn>
                </form>

              </MDBCardBody>
            </MDBContainer>

          </MDBCol>

        </MDBRow>

      </MDBCard>
    </MDBContainer>
  );
}

export default SignIn;