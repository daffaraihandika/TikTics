import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol,
  MDBBtn
} from 'mdb-react-ui-kit';
import Navbar from '../../components/Navbar'
import './Dashboard.css';

function Dashboard() {
  const [data, setData] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    getTopInfluencer()
  }, [])

  const getTopInfluencer = async() => {
    try {
      const response = await axios.get('http://localhost:5000/influencers')
      console.log(response.data)
      setData(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <Navbar/>
      <MDBContainer>
        <h1 className='title text-center'>Influencer and content recommendations that will change your social media experience.</h1>
        <MDBRow>
          
          <MDBCol sm='6'>
            <MDBCard>
              <MDBCardBody>
                <MDBCardTitle className='text-center'>Top Influencer</MDBCardTitle>
                {data ? (
                  data.map((influencer) => (
                    <MDBRow key={influencer._id.$oid}>
                      <MDBCol md='7'>
                        <p className='nama'>{influencer.nickname}</p>
                        <p className='username'>{influencer.username}</p>
                      </MDBCol>
                      <MDBCol md='5'>
                        <p className='value-engagement'>{`${(influencer.engagement_rate_influencer).toLocaleString(undefined, { maximumFractionDigits: 2 })}%`}</p>
                        <p className='text-engagement'>Engagement Rate</p>
                      </MDBCol>
                    </MDBRow>
                  ))
                ) : (
                  <p>Loading...</p>
                )}
                <MDBBtn href='#'>Go somewhere</MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>

          <MDBCol sm='6'>
            <MDBCard>
              <MDBCardBody>
                <MDBCardTitle>Top Content</MDBCardTitle>
                <MDBCardText>
                  With supporting text below as a natural lead-in to additional content.
                </MDBCardText>
                <MDBBtn href='#'>Go somewhere</MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>

        </MDBRow>
      </MDBContainer>
    </div>
  )
}

export default Dashboard
