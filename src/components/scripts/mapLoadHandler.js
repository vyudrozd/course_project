import React from 'react';
import MapClickPopup from '../Popup/MapClickPopup';
import UserClickPopup from '../Popup/UserClickPopup';
import CouplingClickPopup from '../Popup/CouplingClickPopup';
import WireClickPopup from '../Popup/WireClickPopup';
import serverData from '../../const/serverData';

const removeLayers = (map) => {
  let mapLayer = map.getSource('lines-source');
  if (mapLayer) {
    map.removeLayer('lines');
    map.removeSource('lines-source');
  }
  mapLayer = map.getSource('points-source');
  if (mapLayer) {
    map.removeLayer('points');
    map.removeSource('points-source');
  }
  mapLayer = map.getSource('user-points-source');
  if (mapLayer) {
    map.removeLayer('user-points');
    map.removeSource('user-points-source');
  }
};

const addMapClickEvent = ({
  map, token, setPopup, reloadMap,
}) => {
  let doNotDelete = false;
  localStorage.setItem('whitenetWebCoupling', null);

  map.on('click', async (e) => {
    const parent = JSON.parse(localStorage.getItem('whitenetWebCoupling'));
    if (parent !== null) {
      setTimeout(() => {
        if (!doNotDelete) {
          localStorage.setItem('whitenetWebCoupling', null);
          doNotDelete = false;
        }
      }, 50);
    } else {
      setPopup({
        coordinates: e.lngLat,
        content: <MapClickPopup
          e={e}
          reloadMap={reloadMap}
          setPopup={setPopup}
        />,
      });
    }
  });

  map.on('click', 'lines', (e) => {
    const { properties: { id } } = e.features[0];
    setPopup({
      coordinates: e.lngLat,
      content: <WireClickPopup
        id={id}
        reloadMap={reloadMap}
        setPopup={setPopup}
      />,
    });
  });

  const handlePointClick = async (e, isUser) => {
    const parent = JSON.parse(localStorage.getItem('whitenetWebCoupling'));
    if (parent !== null) {
      doNotDelete = true;
      const dataFree = {
        description: 'meme',
        start_id: parent.id,
        end_id: e.features[0].properties.id,
        path: [[parent.lng, parent.lat], [e.features[0].geometry.coordinates[0], e.features[0].geometry.coordinates[1]]],
      };

      const response = await fetch(
        `${serverData.serverLink}api/wires/`,
        {
          method: 'post',
          body: JSON.stringify(dataFree),
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.ok) {
        setPopup({});
        reloadMap();
      } else {
        setPopup({});
      }
    } else {
      const { properties: { id }, geometry: { coordinates } } = e.features[0];
      const setParent = () => {
        localStorage.setItem('whitenetWebCoupling', JSON.stringify({
          id,
          lng: coordinates[0],
          lat: coordinates[1],
        }));
      };
      setPopup({
        coordinates,
        content: isUser ? (
          <UserClickPopup
            id={id}
            e={e}
            setParent={setParent}
            reloadMap={reloadMap}
            setPopup={setPopup}
          />
        ) : (
          <CouplingClickPopup
            id={id}
            e={e}
            setParent={setParent}
            reloadMap={reloadMap}
            setPopup={setPopup}
          />
        ),
      });
    }
  };

  map.on('click', 'points', async (e) => {
    handlePointClick(e);
  });

  map.on('click', 'user-points', async (e) => {
    handlePointClick(e, true);
  });
};

const loadMap = async ({
  map, token, setPopup,
}) => {
  let responseData = await fetch(`${serverData.serverLink}api/wires/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    if (response.status !== 200) {
      alert('Произошла ошибка! Повторите запрос');
    }
    return response.json();
  });

  const { data: linesData } = responseData;

  let mapLayer = map.getSource('lines-source');
  if (mapLayer) {
    map.removeLayer('lines');
    map.removeSource('lines-source');
  }

  map.addSource('lines-source', {
    type: 'geojson',
    data: linesData,
  });
  map.addLayer({
    id: 'lines',
    type: 'line',
    source: 'lines-source',
    layout: {
      'line-cap': 'round',
      'line-join': 'round',
    },
    paint: {
      'line-color': '#0000ff',
      'line-width': 2.5,
    },
    filter: ['in', '$type', 'LineString'],
  });
  responseData = await fetch(`${serverData.serverLink}api/boxes/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    if (response.status !== 200) {
      alert('Произошла ошибка! Повторите запрос');
    }
    return response.json();
  });

  const { data: dotsData } = responseData;

  const regularData = {
    type: 'FeatureCollection',
    features: dotsData.features.filter((point) => point.properties.type_of_box === 'regular'),
  };

  mapLayer = map.getSource('points-source');
  if (mapLayer) {
    map.removeLayer('points');
    map.removeSource('points-source');
  }

  map.addSource('points-source', {
    type: 'geojson',
    data: regularData,
  });
  map.addLayer({
    id: 'points',
    type: 'circle',
    source: 'points-source',
    paint: {
      'circle-radius': 5,
      'circle-color': '#ff0000',
    },
    filter: ['in', '$type', 'Point'],
  });

  const userData = {
    type: 'FeatureCollection',
    features: dotsData.features.filter((point) => point.properties.type_of_box === 'client'),
  };

  mapLayer = map.getSource('user-points-source');
  if (mapLayer) {
    map.removeLayer('user-points');
    map.removeSource('user-points-source');
  }

  map.addSource('user-points-source', {
    type: 'geojson',
    data: userData,
  });

  map.loadImage(
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Noun_Project_house_icon_475319_cc.svg/251px-Noun_Project_house_icon_475319_cc.svg.png',
    (error, image) => {
      if (error) {
        map.addLayer({
          id: 'user-points',
          type: 'circle',
          source: 'user-points-source',
          paint: {
            'circle-radius': 5,
            'circle-color': '#00ff00',
          },
          filter: ['in', '$type', 'Point'],
        });
      } else {
        map.addImage('cat', image);

        map.addLayer({
          id: 'user-points',
          type: 'symbol',
          source: 'user-points-source',
          layout: {
            'icon-image': 'cat',
            'icon-size': 0.12,
          },
        });
      }
    },
  );

  map.on('mouseenter', 'points', () => {
    map.getCanvas().style.cursor = 'pointer';
  });

  map.on('mouseenter', 'lines', () => {
    map.getCanvas().style.cursor = 'pointer';
  });

  map.on('mouseenter', 'user-points', () => {
    map.getCanvas().style.cursor = 'pointer';
  });

  map.on('mouseleave', 'points', () => {
    map.getCanvas().style.cursor = '';
  });

  map.on('mouseleave', 'lines', () => {
    map.getCanvas().style.cursor = '';
  });

  map.on('mouseleave', 'user-points', () => {
    map.getCanvas().style.cursor = '';
  });

  const reloadMap = () => loadMap({
    map, token, setPopup,
  });
  addMapClickEvent({
    map, token, setPopup, reloadMap,
  });
};

export default (map, token, setPopup) => {
  if (token !== 'null') {
    loadMap({
      map, token, setPopup,
    });
  } else {
    removeLayers(map);
  }
};
