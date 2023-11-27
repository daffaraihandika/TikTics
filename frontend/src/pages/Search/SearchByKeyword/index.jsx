import React from "react";

import { MDBContainer, MDBInputGroup, MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import Navbar from "../../../components/Navbar";

function SearchByKeyword() {
    
    return (
      <>
        <Navbar />
        <MDBContainer style={{marginTop:"13rem"}}>
          <h1 className="title text-center">
            Easily find influencers and content that meets your desires
          </h1>
          <MDBInputGroup
            className="mb-3"
            style={{ width: "100%", margin: "0 auto", paddingTop: "3rem" }}
          >
            <input
              className="form-control"
              placeholder="Search"
              type="text"
              style={{ height: "50px" }}
            />
            <MDBBtn outline style={{ height: "50px", width:"5%" }}>
              <MDBIcon icon="search" />
            </MDBBtn>
          </MDBInputGroup>
        </MDBContainer>
      </>
    );
}

export default SearchByKeyword