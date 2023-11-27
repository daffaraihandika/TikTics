import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBRow,
  MDBCol,
  MDBBtn,
} from 'mdb-react-ui-kit';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Navbar from '../../components/Navbar'

import Carousel from 'react-bootstrap/Carousel';

function VideoDetail() {
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
      <Navbar />
      <MDBContainer>
        <MDBCard style={{ marginTop: "2rem" }}>
            <MDBCardBody>
            <h3>Detail Video</h3>
            <div dangerouslySetInnerHTML={{ __html: `
                <blockquote class="tiktok-embed" cite="https://www.tiktok.com/@mrbeast/video/7116560138814885166" data-video-id="7116560138814885166" style="width: 100%;" > <section> <a target="_blank" title="@mrbeast" href="https://www.tiktok.com/@mrbeast?refer=embed">@mrbeast</a> <p>Minions &gt; Avengers</p> <a target="_blank" title="♬ Rich Minion - Yeat" href="https://www.tiktok.com/music/Rich-Minion-7109284473828591617?refer=embed">♬ Rich Minion - Yeat</a> </section> </blockquote> <script async src="https://www.tiktok.com/embed.js"></script>
            ` }}/>
            <p className='text-center'>Engagement Rate: 40%</p>
            </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </div>
  );
}

export default VideoDetail
