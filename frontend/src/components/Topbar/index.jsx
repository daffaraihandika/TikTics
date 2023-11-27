import React, { useState } from "react";
import { MDBContainer, MDBBtnGroup, MDBBtn } from "mdb-react-ui-kit";

export default function Topbar() {
  const [activeButton, setActiveButton] = useState("Influencer");

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
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
            onClick={() => handleButtonClick("Influencer")}
          >
            Influencer
          </MDBBtn>
          <MDBBtn
            color="link"
            style={buttonStyle("Content")}
            onClick={() => handleButtonClick("Content")}
          >
            Content
          </MDBBtn>
        </MDBBtnGroup>
      </MDBContainer>
    </>
  );
}
