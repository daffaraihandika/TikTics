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
import Navbar from '../../components/Navbar'
import './Dashboard.css';

import Carousel from 'react-bootstrap/Carousel';

function Dashboard() {
  const [dataInfluencer, setDataInfluencer] = useState("");
  const [dataContent, setDataContent] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    getTopInfluencer();
    getTopContent();
    embedTikTokScript();
  }, [])

  const getTopInfluencer = async() => {
    try {
      const response = await axios.get('http://localhost:5000/influencers')
      console.log("Data Top Influencer: ", response.data)
      setDataInfluencer(response.data)
    } catch (error) {
      console.log(error)
    }
  }

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
        <h1 className='title text-center'>Influencer and content recommendations that will change your social media experience.</h1>
        <MDBRow>
          
          <MDBCol sm='6'>
            <MDBCard>
              <MDBCardBody>
                <MDBCardTitle className='text-center'>Top Influencer</MDBCardTitle>
                {dataInfluencer ? (
                  dataInfluencer.map((influencer) => (
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
                <MDBCardTitle className='text-center'>Top Content</MDBCardTitle>
                
                {/* Carousel Top Content */}

                {dataContent ? (
                  <Carousel
                    nextIcon={<FaChevronRight style={{ color: 'gray' }} />}
                    prevIcon={<FaChevronLeft style={{ color: 'gray' }} />}
                  >
                    {dataContent.map((content) => (
                      <Carousel.Item key={content._id.$oid}>
                        <p className='text-center'>Engagement Rate: {`${(content.engagement_rate_content).toLocaleString(undefined, { maximumFractionDigits: 2 })}%`}</p>
                        <div dangerouslySetInnerHTML={{ __html: `
                          <blockquote class="tiktok-embed" cite="${content.link}" data-video-id="${content.id_content}" style="max-width: 605px;min-width: 325px;" > <section></section></blockquote> <script async src="https://www.tiktok.com/embed.js"></script>
                        ` }} />
                      </Carousel.Item>
                    ))}
                  </Carousel>
                ) : (
                  <p>Loading Content data...</p>
                )}

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
