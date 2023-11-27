import React, { useState } from 'react';
import { MDBInputGroup, MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    
    const handleSearch = () => {
        // Redirect to the search-influencer route with the keyword as a query parameter
        navigate(`/search-influencer/${searchTerm}`);
        console.log("button di klik")
      };

  return (
    <MDBInputGroup className='mb-3' style={{ width: '30%', marginLeft: 'auto', paddingTop: '2rem' }}>
      <input
        className='form-control'
        placeholder="Search"
        type='text'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <MDBBtn outline onClick={handleSearch}>
        <MDBIcon icon='search' />
      </MDBBtn>
    </MDBInputGroup>
  );
}
