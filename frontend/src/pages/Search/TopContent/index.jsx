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
import './TopContent.css';
import SearchBar from '../../../components/SearchBar';
import Topbar from '../../../components/Topbar';

import Carousel from 'react-bootstrap/Carousel';

function TopContent() {
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
        <SearchBar/>
        <Topbar/>
        <MDBCard style={{ marginTop: '2rem' }}>
            <MDBCardBody>
                <MDBRow>
                {dataContent ? (
                dataContent.map((content) => (
                    <MDBCol key={content._id.$oid}>
                        <p className='text-center'>Engagement Rate: {`${(content.engagement_rate_content).toLocaleString(undefined, { maximumFractionDigits: 2 })}%`}</p>
                        <div dangerouslySetInnerHTML={{ __html: `
                            <blockquote class="tiktok-embed" cite="${content.link}" data-video-id="${content.id_content}" style="max-width: 605px;min-width: 325px;" > <section></section></blockquote> <script async src="https://www.tiktok.com/embed.js"></script>
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

export default TopContent
