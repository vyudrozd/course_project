import React, { useState, StrictMode } from 'react';
import MapBox from '../components/MapBox';
import Header from '../components/Header';


export default function MapPage() {
  const [token, setToken] = useState(localStorage.getItem('whitenetWebToken'));
  return (
    <StrictMode>
      <Header
        token={token}
        setToken={setToken}
      />
      <MapBox
        token={token}
      />
    </StrictMode>
  );
}
