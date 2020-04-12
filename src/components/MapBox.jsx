import React, { useState } from 'react';
import ReactMapboxGl, { MapContext, Popup } from 'react-mapbox-gl';
import styled from 'styled-components';
// eslint-disable-next-line import/extensions
import mapLoadHandler from './scripts/mapLoadHandler.js';

const Map = ReactMapboxGl({
  accessToken: 'pk.eyJ1Ijoia2lsemQiLCJhIjoiY2p3Y3BrcGdlMHY4ZjQ5b2p4YWp1b3oyYiJ9.7e4nFGsZKigW54wKypPXFA',
});

const center = [40.174844, 55.131590];
const zoom = [9];

function MapBox({ token, className }) {
  const [popup, setPopup] = useState({});

  return (
    <Map
        /* eslint-disable-next-line react/style-prop-object */
      style="mapbox://styles/mapbox/streets-v11"
      className={className}
      center={center}
      zoom={zoom}
    >
      <MapContext.Consumer>
        {(map) => mapLoadHandler(map, token, setPopup)}
      </MapContext.Consumer>
      {!popup.coordinates ? null : (
        <Popup coordinates={popup.coordinates}>
          {popup.content}
        </Popup>
      )}
    </Map>
  );
}

export default styled(MapBox)`
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
`;
