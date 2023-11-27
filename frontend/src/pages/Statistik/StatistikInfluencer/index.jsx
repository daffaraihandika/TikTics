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
import { useParams } from 'react-router';

function StatistikInfluencer() {
  const [dataContent, setDataContent] = useState("");
  const [dataInfluencer, setDataInfluencer] = useState("");

  const navigate = useNavigate();
  const { username } = useParams();

  useEffect(() => {
    getInfluencerDetail(username)
    // getTopContent();
    embedTikTokScript();
  }, [username])

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

  const getInfluencerDetail = async (username) => {
    try {
  
      const response = await axios.get(`http://localhost:5000//influencer/${username}`);
      
      const dataWithIdContent = response.data.content.map((content) => {
          const linkParts = content.link.split('/');
          const idContent = linkParts[linkParts.length - 1].split('?')[0];
          return { ...content, id_content: idContent };
      });
        
      console.log(`Data Detail Influencer: `, { ...response.data, content: dataWithIdContent });
      setDataInfluencer({ ...response.data, content: dataWithIdContent });
    } catch (error) {
      console.log(error);
    }
  };

  const embedTikTokScript = () => {
    const script = document.createElement('script');
    script.src = 'https://www.tiktok.com/embed.js';
    script.async = true;
    document.body.appendChild(script);
  };

  const formatNumber = (value) => {
    if (value === undefined || value === null) {
        return 'N/A'; // Or any default value you prefer for undefined/null
      }
    
      if (value >= 1e9) {
        return (value / 1e9).toFixed(1) + 'B';
      } else if (value >= 1e6) {
        return (value / 1e6).toFixed(1) + 'M';
      } else if (value >= 1e3) {
        return (value / 1e3).toFixed(1) + 'K';
      } else {
        return value.toString();
      }
  }

  const handleBtnStatPrediction = (username) => {
    navigate(`/statistic-prediction/${username}`)
  }

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
                        <p style={{ fontWeight: "bold" }}>{dataInfluencer.nickname}</p>
                        <p>@{dataInfluencer.username}</p>
                        <p>{dataInfluencer.bio}</p>
                        <MDBBtn
                        rounded
                        className="text-light px-3 py-2"
                        color="light"
                        size="sm"
                        style={{ background: "linear-gradient(90deg, #555CF6 0%, #812DE2 91.76%)", textTransform: "none" }}
                        onClick={() => handleBtnStatPrediction(dataInfluencer.username)}
                        >
                        Statistics Prediction
                        </MDBBtn>
                    </MDBCol>
                    <MDBCol md={3}>
                        <MDBCard style={{ background: "linear-gradient(90deg, rgba(255, 168, 0, 0.65) 0%, rgba(255, 138, 0, 0.87) 91.76%)" }}>
                            <MDBCardBody>
                                <center>
                                    <p style={{ fontSize: "40px", fontWeight: "700", marginBottom: "0" }}>
                                        {`${(dataInfluencer.engagement_rate_influencer ?? 0).toLocaleString(undefined, { maximumFractionDigits: 2 })}%`}
                                    </p>
                                    <p style={{ marginBottom: "0", fontWeight: "bold" }}>Engagement Rate</p>
                                </center>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
                <MDBRow style={{ margin: "2rem auto" }}>
                    <MDBCol>
                        <p className='text-center' style={{ fontSize: "30px", fontWeight: "700", marginBottom: "0" }}>{formatNumber(dataInfluencer.total_followers)}</p>
                        <p className='text-center' style={{ marginBottom: "0" }}>Total Followers</p>
                    </MDBCol>
                    <MDBCol>
                        <p className='text-center' style={{ fontSize: "30px", fontWeight: "700", marginBottom: "0" }}>{formatNumber(dataInfluencer.total_views)}</p>
                        <p className='text-center' style={{ marginBottom: "0" }}>Total Views</p>
                    </MDBCol>
                    <MDBCol>
                        <p className='text-center' style={{ fontSize: "30px", fontWeight: "700", marginBottom: "0" }}>{formatNumber(dataInfluencer.total_likes)}</p>
                        <p className='text-center' style={{ marginBottom: "0" }}>Total Likes</p>
                    </MDBCol>
                    <MDBCol>
                        <p className='text-center' style={{ fontSize: "30px", fontWeight: "700", marginBottom: "0" }}>{formatNumber(dataInfluencer.total_comments)}</p>
                        <p className='text-center' style={{ marginBottom: "0" }}>Total Comments</p>
                    </MDBCol>
                    <MDBCol>
                        <p className='text-center' style={{ fontSize: "30px", fontWeight: "700", marginBottom: "0" }}>{formatNumber(dataInfluencer.total_save)}</p>
                        <p className='text-center' style={{ marginBottom: "0" }}>Total Saved</p>
                    </MDBCol>
                </MDBRow>
            </MDBCardBody>
        </MDBCard>

        <h3 style={{ marginTop: '2rem' }}>Contents</h3>
        <MDBCard>
            <MDBCardBody>
                <MDBRow>
                    {dataInfluencer.content ? (
                        dataInfluencer.content.map((data) => (
                        <MDBCol key={data._id.$oid}>
                            <p className='text-center'>Engagement Rate: {`${(data.engagement_rate_content).toLocaleString(undefined, { maximumFractionDigits: 2 })}%`}</p>
                            <div dangerouslySetInnerHTML={{ __html: `
                                <blockquote class="tiktok-embed" cite="${data.link}" data-video-id="${data.id_content}" style="max-width: 605px;min-width: 325px;" > <section></section></blockquote> <script async src="https://www.tiktok.com/embed.js"></script>
                            ` }} />
                        </MDBCol>
                        ))
                    ) : (
                        <p>Loading Content data...</p>
                    )}
                </MDBRow>
            </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </div>
  )
}

export default StatistikInfluencer
