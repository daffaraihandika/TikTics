import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MDBContainer, MDBBtnGroup, MDBBtn } from "mdb-react-ui-kit";
import { useParams } from 'react-router';

export default function Topbar() {
  const [activeButton, setActiveButton] = useState("Influencer");
  const navigate = useNavigate()
  const { keyword } = useParams();

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
    navigate(`/${buttonName}/${keyword}`)
  };

  const buttonStyle = (buttonName) => ({
    color: "#000",
    textTransform: "none",
    textDecoration: activeButton === buttonName ? "underline" : "none",
    fontWeight: activeButton === buttonName ? "bold" : "normal",
  });

  return (
    <>
      <MDBContainer
        className="d-flex align-items-center justify-content-center"
        breakpoint="md"
        style={{paddingTop: "2rem"}}
      >
        <MDBBtnGroup shadow="0">
          <MDBBtn
            color="link"
            style={buttonStyle("Influencer")}
            onClick={() => handleButtonClick("search-influencer")}
          >
            Influencer
          </MDBBtn>
          <MDBBtn
            color="link"
            style={buttonStyle("Content")}
            onClick={() => handleButtonClick("search-content")}
          >
            Content
          </MDBBtn>
        </MDBBtnGroup>
      </MDBContainer>
    </>
  );
}
