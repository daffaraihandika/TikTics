import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBRow,
  MDBCol,
  MDBBtn,
} from "mdb-react-ui-kit";

import Navbar from "../../../components/Navbar";
import Chart from "../../../components/Chart"

function PrediksiStatistik() {
  const [dataInfluencer, setDataInfluencer] = useState("");


  const navigate = useNavigate();
  const { username } = useParams();

  useEffect(() => {
    getInfluencerDetail(username);
  }, [username]);


   const getInfluencerDetail = async (username) => {
    try {
      const response = await axios.get(`http://localhost:5000//influencer/${username}`);
      console.log(`Data Detail Influencer: `, response.data);
      setDataInfluencer(response.data);
    } catch (error) {
      console.log(error);
    }
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

    const handleInfluencerDetailClick = () => {
    navigate(`/influencer-detail/${dataInfluencer.username}`);
    };

  return (
    <div>
      <Navbar />
      <MDBContainer>
        <h3 style={{ marginTop: "2rem" }}>Profile</h3>
        <MDBCard>
          <MDBCardBody>
            <MDBRow>
              <MDBCol md={1}>
                <img
                  src={process.env.PUBLIC_URL + "/images/avatar.png"}
                  alt="Avatar"
                  style={{ width: "100px", height: "100px" }}
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
                  style={{
                    background:
                      "linear-gradient(90deg, #555CF6 0%, #812DE2 91.76%)",
                    textTransform: "none",
                  }}
                  onClick={handleInfluencerDetailClick}
                >
                  Influencer Detail
                </MDBBtn>
              </MDBCol>
              <MDBCol md={3}>
                <MDBCard
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(255, 168, 0, 0.65) 0%, rgba(255, 138, 0, 0.87) 91.76%)",
                  }}
                >
                  <MDBCardBody>
                    <center>
                      <p
                        style={{
                          fontSize: "40px",
                          fontWeight: "700",
                          marginBottom: "0",
                        }}
                      >
                        {dataInfluencer.engagement_rate_influencer}%
                      </p>
                      <p style={{ marginBottom: "0", fontWeight: "bold" }}>
                        Engagement Rate
                      </p>
                    </center>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
            <MDBRow style={{ margin: "2rem auto" }}>
              <MDBCol>
                <p
                  className="text-center"
                  style={{
                    fontSize: "30px",
                    fontWeight: "700",
                    marginBottom: "0",
                  }}
                >
                  {formatNumber(dataInfluencer.total_followers)}
                </p>
                <p className="text-center" style={{ marginBottom: "0" }}>
                  Total Followers
                </p>
              </MDBCol>
              <MDBCol>
                <p
                  className="text-center"
                  style={{
                    fontSize: "30px",
                    fontWeight: "700",
                    marginBottom: "0",
                  }}
                >
                  {formatNumber(dataInfluencer.total_views)}
                </p>
                <p className="text-center" style={{ marginBottom: "0" }}>
                  Total Views
                </p>
              </MDBCol>
              <MDBCol>
                <p
                  className="text-center"
                  style={{
                    fontSize: "30px",
                    fontWeight: "700",
                    marginBottom: "0",
                  }}
                >
                  {formatNumber(dataInfluencer.total_likes)}
                </p>
                <p className="text-center" style={{ marginBottom: "0" }}>
                  Total Likes
                </p>
              </MDBCol>
              <MDBCol>
                <p
                  className="text-center"
                  style={{
                    fontSize: "30px",
                    fontWeight: "700",
                    marginBottom: "0",
                  }}
                >
                  {formatNumber(dataInfluencer.total_comments)}
                </p>
                <p className="text-center" style={{ marginBottom: "0" }}>
                  Total Comments
                </p>
              </MDBCol>
              <MDBCol>
                <p
                  className="text-center"
                  style={{
                    fontSize: "30px",
                    fontWeight: "700",
                    marginBottom: "0",
                  }}
                >
                  {formatNumber(dataInfluencer.total_save)}
                </p>
                <p className="text-center" style={{ marginBottom: "0" }}>
                  Total Saved
                </p>
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
        <h3 style={{ marginTop: "2rem" }}>Statistics</h3>
        <Chart />
      </MDBContainer>
    </div>
  );
}

export default PrediksiStatistik;
