import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";

import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
  MDBRow,
  MDBCol,
  MDBCheckbox
}
from 'mdb-react-ui-kit';
import './SignUp.css';

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const registerHandler = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:5000/register', {
          username, email, password, confPassword
        });
        
        navigate('/');
        console.log("Register Berhasil");
        console.log("Response :", response.data);
        
    } catch (error) {
        console.log(error.response.data.error);
        setMsg(error.response.data.error);
        setError(true);
    }
  }

  return (
    <MDBContainer fluid className='my-5'>

      <MDBRow className='g-0 align-items-center'>
        <MDBCol col='6'>

          <MDBCard className='ms-5 my-5 cascading-right' style={{background: 'hsla(0, 0%, 100%, 0.55)',  backdropFilter: 'blur(30px)'}}>
            <MDBCardBody className='p-5 shadow-5 text-center'>

              <h2 className="fw-bold mb-5">Sign Up</h2>

              <form onSubmit={registerHandler}>
                <MDBRow>
                  <MDBCol col='6'>
                    <MDBInput wrapperClass='mb-4' label='Username' id='username' type='text' value={username} onChange={(e) => setUsername(e.target.value)} required />
                  </MDBCol>

                  <MDBCol col='6'>
                    <MDBInput wrapperClass='mb-4' label='Email' id='email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </MDBCol>
                </MDBRow>

                <MDBInput wrapperClass='mb-4' label='Password' id='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                <MDBInput wrapperClass='mb-4' label='Confirm Password' id='confPassword' type='password' value={confPassword} onChange={(e) => setConfPassword(e.target.value)} required />

                <div className='d-flex justify-content-center mb-4'>
                  <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Subscribe to our newsletter' />
                </div>

                <MDBBtn className='w-100 mb-4' size='md' type='submit'>Sign Up</MDBBtn>
              </form>

              <div className="text-center">

                <p>or sign up with:</p>

                <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon='facebook-f' size="sm"/>
                </MDBBtn>

                <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon='twitter' size="sm"/>
                </MDBBtn>

                <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon='google' size="sm"/>
                </MDBBtn>

                <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon='github' size="sm"/>
                </MDBBtn>

              </div>

            </MDBCardBody>
          </MDBCard>
        </MDBCol>

        <MDBCol col='6'>
          <img src="https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg" class="w-60 rounded-4 shadow-4"
            alt="" fluid/>
        </MDBCol>

      </MDBRow>

    </MDBContainer>
  );
}

export default SignUp;