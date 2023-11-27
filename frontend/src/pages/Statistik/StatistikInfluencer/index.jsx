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

        <h3 style={{ marginTop: '2rem' }}>Contents</h3>
        <MDBCard>
            <MDBCardBody>
                <MDBRow>
                    <MDBCol>
                        <p className='text-center'>Engagement Rate: 40%</p>
                        <div dangerouslySetInnerHTML={{ __html: `
                            <blockquote class="tiktok-embed" cite="https://www.tiktok.com/@mrbeast/video/7229017548413570350" data-video-id="7229017548413570350" style="max-width: 605px;min-width: 325px;" > <section> <a target="_blank" title="@mrbeast" href="https://www.tiktok.com/@mrbeast?refer=embed">@mrbeast</a> should I sell my new kicks? 🥶💸<a title="12bucklemyshoe" target="_blank" href="https://www.tiktok.com/tag/12bucklemyshoe?refer=embed">#12bucklemyshoe</a> <a title="ice" target="_blank" href="https://www.tiktok.com/tag/ice?refer=embed">#ice</a><a title="newdrip" target="_blank" href="https://www.tiktok.com/tag/newdrip?refer=embed">#newdrip</a> <a title="drippy" target="_blank" href="https://www.tiktok.com/tag/drippy?refer=embed">#drippy</a> <a title="yeat" target="_blank" href="https://www.tiktok.com/tag/yeat?refer=embed">#yeat</a> <a target="_blank" title="♬ original sound - eddy" href="https://www.tiktok.com/music/original-sound-7222028724672432942?refer=embed">♬ original sound - eddy</a> </section> </blockquote> <script async src="https://www.tiktok.com/embed.js"></script>
                            ` }} />
                    </MDBCol>
                    <MDBCol>
                        <p className='text-center'>Engagement Rate: 40%</p>
                        <div dangerouslySetInnerHTML={{ __html: `
                            <blockquote class="tiktok-embed" cite="https://www.tiktok.com/@mrbeast/video/7116560138814885166" data-video-id="7116560138814885166" style="max-width: 605px;min-width: 325px;" > <section> <a target="_blank" title="@mrbeast" href="https://www.tiktok.com/@mrbeast?refer=embed">@mrbeast</a> <p>Minions &gt; Avengers</p> <a target="_blank" title="♬ Rich Minion - Yeat" href="https://www.tiktok.com/music/Rich-Minion-7109284473828591617?refer=embed">♬ Rich Minion - Yeat</a> </section> </blockquote> <script async src="https://www.tiktok.com/embed.js"></script>
                        ` }} />
                    </MDBCol>
                    <MDBCol>
                        <p className='text-center'>Engagement Rate: 40%</p>
                        <div dangerouslySetInnerHTML={{ __html: `
                            <blockquote class="tiktok-embed" cite="https://www.tiktok.com/@mrbeast/video/7302475940981132590" data-video-id="7302475940981132590" style="max-width: 605px;min-width: 325px;" > <section> <a target="_blank" title="@mrbeast" href="https://www.tiktok.com/@mrbeast?refer=embed">@mrbeast</a> They really thought it was $1000 instead of $10,000 💀 <a title="samsungpartner" target="_blank" href="https://www.tiktok.com/tag/samsungpartner?refer=embed">#samsungpartner</a> <a target="_blank" title="♬ original sound - MrBeast" href="https://www.tiktok.com/music/original-sound-7302475959553477422?refer=embed">♬ original sound - MrBeast</a> </section> </blockquote> <script async src="https://www.tiktok.com/embed.js"></script>
                        ` }} />
                    </MDBCol>
                    <MDBCol>
                        <p className='text-center'>Engagement Rate: 40%</p>
                        <div dangerouslySetInnerHTML={{ __html: `
                            <blockquote class="tiktok-embed" cite="https://www.tiktok.com/@mrbeast/video/7298050264441818410" data-video-id="7298050264441818410" style="max-width: 605px;min-width: 325px;" > <section> <a target="_blank" title="@mrbeast" href="https://www.tiktok.com/@mrbeast?refer=embed">@mrbeast</a> I ran out of candy so I gave away my house instead 😂 <a title="halloween" target="_blank" href="https://www.tiktok.com/tag/halloween?refer=embed">#halloween</a> <a title="trickortreat" target="_blank" href="https://www.tiktok.com/tag/trickortreat?refer=embed">#trickortreat</a> <a title="house" target="_blank" href="https://www.tiktok.com/tag/house?refer=embed">#house</a> <a title="candy" target="_blank" href="https://www.tiktok.com/tag/candy?refer=embed">#candy</a> <a target="_blank" title="♬ original sound - MrBeast" href="https://www.tiktok.com/music/original-sound-7298050299883785002?refer=embed">♬ original sound - MrBeast</a> </section> </blockquote> <script async src="https://www.tiktok.com/embed.js"></script>
                        ` }} />
                    </MDBCol>
                </MDBRow>
            </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </div>
  )
}

export default StatistikInfluencer
