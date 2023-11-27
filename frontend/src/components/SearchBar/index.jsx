import React, { useState } from 'react';
import { MDBInputGroup, MDBBtn, MDBIcon } from 'mdb-react-ui-kit';

export default function SearchBar() {
  return (
    <MDBInputGroup className='mb-3' style={{ width: '30%', marginLeft: 'auto', paddingTop: '2rem' }}>
      <input className='form-control' placeholder="Search" type='text' />
      <MDBBtn outline>
        <MDBIcon icon='search' />
      </MDBBtn>
    </MDBInputGroup>
  );
}
