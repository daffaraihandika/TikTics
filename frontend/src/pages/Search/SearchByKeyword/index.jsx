// Import the useState and useNavigate hooks
import React, { useState } from "react";
import { MDBContainer, MDBInputGroup, MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import Navbar from "../../../components/Navbar";
import { useNavigate } from 'react-router-dom';

function SearchByKeyword() {
  // Add a state for the search term
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Modify the handleSearch function to navigate with the search term
  const handleSearch = () => {
    // Redirect to the correct route with the keyword as a query parameter
    navigate(`/search-influencer/${searchTerm}`);
  };
    
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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <MDBBtn outline style={{ height: "50px", width:"5%" }} onClick={handleSearch}>
            <MDBIcon icon="search" />
          </MDBBtn>
        </MDBInputGroup>
      </MDBContainer>
    </>
  );
}

export default SearchByKeyword;
