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
  MDBBtn,
  MDBCarousel, 
  MDBCarouselItem,
  MDBCarouselControl
} from 'mdb-react-ui-kit';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Navbar from '../../../components/Navbar';
import SearchBar from '../../../components/SearchBar';
import Topbar from '../../../components/Topbar';

import Carousel from 'react-bootstrap/Carousel';

function StatistikInfluencer() {
  const [dataContent, setDataContent] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    getTopContent();
    embedTikTokScript();
  }, [])

  const getTopContent = async() => {
    try {
      const response = await axios.get('http://localhost:5000/contents')
      
      // Menambahkan atribut 'id_content' pada setiap objek
      const dataWithId = response.data.map((content) => {
        const linkParts = content.link.split('/');
        const idContent = linkParts[linkParts.length - 1].split('?')[0];
        return { ...content, id_content: idContent };
      });
      
      console.log("Data Top Content: ", dataWithId)
      setDataContent(dataWithId)
    } catch (error) {
      console.log(error)
    }
  }

  const embedTikTokScript = () => {
    const script = document.createElement('script');
    script.src = 'https://www.tiktok.com/embed.js';
    script.async = true;
    document.body.appendChild(script);
  };

  return (
    <div>
      <Navbar/>
      <MDBContainer>
        <h3 style={{ marginTop: '2rem' }}>Profile</h3>
        <MDBCard>
            <MDBCardBody>
                <MDBRow>
                    <MDBCol md={1}>
                        <img
                            src={process.env.PUBLIC_URL + '/images/avatar.png'}
                            alt='Avatar'
                            style={{ width: '100px', height: '100px' }}
                        />
                    </MDBCol>
                    <MDBCol md={8} style={{ paddingLeft: "30px" }}>
                        <p style={{ fontWeight: "bold" }}>Nickname</p>
                        <p>Username</p>
                        <p>Bio</p>
                        <MDBBtn
                        rounded
                        className="text-light px-3 py-2"
                        color="light"
                        size="sm"
                        style={{ background: "linear-gradient(90deg, #555CF6 0%, #812DE2 91.76%)", textTransform: "none" }}
                        >
                        Statistics Prediction
                        </MDBBtn>
                    </MDBCol>
                    <MDBCol md={3}>
                        <MDBCard style={{ background: "linear-gradient(90deg, rgba(255, 168, 0, 0.65) 0%, rgba(255, 138, 0, 0.87) 91.76%)" }}>
                            <MDBCardBody>
                                <center>
                                    <p style={{ fontSize: "40px", fontWeight: "700", marginBottom: "0" }}>49%</p>
                                    <p style={{ marginBottom: "0", fontWeight: "bold" }}>Engagement Rate</p>
                                </center>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
                <MDBRow style={{ margin: "2rem auto" }}>
                    <MDBCol>
                        <p className='text-center' style={{ fontSize: "30px", fontWeight: "700", marginBottom: "0" }}>40K</p>
                        <p className='text-center' style={{ marginBottom: "0" }}>Total Followers</p>
                    </MDBCol>
                    <MDBCol>
                        <p className='text-center' style={{ fontSize: "30px", fontWeight: "700", marginBottom: "0" }}>3.7M</p>
                        <p className='text-center' style={{ marginBottom: "0" }}>Total Followers</p>
                    </MDBCol>
                    <MDBCol>
                        <p className='text-center' style={{ fontSize: "30px", fontWeight: "700", marginBottom: "0" }}>2.8M</p>
                        <p className='text-center' style={{ marginBottom: "0" }}>Total Followers</p>
                    </MDBCol>
                    <MDBCol>
                        <p className='text-center' style={{ fontSize: "30px", fontWeight: "700", marginBottom: "0" }}>3.7M</p>
                        <p className='text-center' style={{ marginBottom: "0" }}>Total Followers</p>
                    </MDBCol>
                    <MDBCol>
                        <p className='text-center' style={{ fontSize: "30px", fontWeight: "700", marginBottom: "0" }}>3.9K</p>
                        <p className='text-center' style={{ marginBottom: "0" }}>Total Followers</p>
                    </MDBCol>
                </MDBRow>
            </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </div>
  )
}

export default StatistikInfluencer
