import React, {useState, useEffect} from "react";
import axios from "axios";
import {
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBContainer,
  MDBCard,
  MDBCardBody,
} from "mdb-react-ui-kit";
import Navbar from "../../../components/Navbar";
import SearchBar from "../../../components/SearchBar";
import Topbar from "../../../components/Topbar";

function TopInfluencer() {
    const [dataInfluencer, setDataInfluencer] = useState("");

    useEffect(() => {
      getTopInfluencer();
    }, []);

    const getTopInfluencer = async () => {
      try {
        const response = await axios.get("http://localhost:5000/influencers");
        console.log("Data Top Influencer: ", response.data);
        setDataInfluencer(response.data);
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <>
      <Navbar />
      <MDBContainer breakpoint="md">
        <SearchBar />
        <Topbar />
        <MDBCard style={{ marginTop: "2rem" }}>
          <MDBCardBody>
            <MDBTable responsive align="middle">
              <MDBTableHead light>
                <tr>
                  <th scope="col" style={{ fontSize: "1rem" }}>
                    No
                  </th>
                  <th scope="col" style={{ width: "60%", fontSize: "1rem" }}>
                    Influencer
                  </th>
                  <th scope="col" style={{ fontSize: "1rem" }}>
                    Engagement Rate
                  </th>
                  <th scope="col" style={{ fontSize: "1rem" }}>
                    <center>Actions</center>
                  </th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {dataInfluencer.length > 0 ? (
                  dataInfluencer.map((influencer, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td style={{ width: "60%" }}>
                        <div className="d-flex align-items-center">
                          <div>
                            <p className="fw-bold mb-1">
                              {influencer.nickname}
                            </p>
                            <p className="text-muted mb-0">
                              @{influencer.username}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td>{influencer.engagement_rate_influencer}%</td>
                      <td>
                        <center>
                          <MDBBtn
                            rounded
                            className="text-light px-3 py-2"
                            color="light"
                            size="sm"
                            style={{
                              backgroundColor: "#7A7CFF",
                              textTransform: "none",
                            }}
                          >
                            View Details
                          </MDBBtn>
                        </center>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center">
                      Loading...
                    </td>
                  </tr>
                )}
              </MDBTableBody>
            </MDBTable>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </>
  );
}

export default TopInfluencer