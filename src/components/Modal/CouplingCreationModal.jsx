import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from '.';
import serverData from '../../const/serverData';

function CouplingCreactionModal({
  className,
  show,
  setShow,
  userCoupling,
  loadMap,
  closePopup,
  e,
}) {
  const [couplingName, setName] = useState('');
  const [couplingDescription, setDescription] = useState('');

  const postCoupling = async (data) => {
    const response = await fetch(
      `${serverData.serverLink}api/boxes/`, {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
          Authorization: `Bearer ${localStorage.getItem('whitenetWebToken')}`,
          'Content-Type': 'application/json;charset=utf-8',
        },
      },
    );
    if (response.ok) {
      loadMap();
      closePopup();
    } else {
      closePopup();
    }
  };

  const addUser = () => {
    const data = {
      name: couplingName,
      lat: e.lngLat.lat.toFixed(4),
      lng: e.lngLat.lng.toFixed(4),
      description: couplingDescription,
      type_of_box: 'client',
      is_available: true,
    };

    postCoupling(data);
  };

  const addBox = () => {
    if (couplingName.length > 1 && couplingDescription.length > 1) {
      const data = {
        name: couplingName,
        lat: e.lngLat.lat.toFixed(4),
        lng: e.lngLat.lng.toFixed(4),
        description: couplingDescription,
        type_of_box: 'regular',
      };

      postCoupling(data);
    }
  };


  return (
    <Modal setShow={setShow} show={show}>
      <div className={className}>
        <div>
          <div>
            <label htmlFor="couplingName">Название муфты</label>
          </div>
          <div>
            <input type="text" defaultValue="" id="couplingName" onChange={({ target }) => setName(target.value)} />
          </div>
          <div>
            <label htmlFor="couplingDescription">Описание муфты</label>
          </div>
          <div>
            <textarea defaultValue="" id="couplingDescription" onChange={({ target }) => setDescription(target.value)} />
          </div>
          <button onClick={() => (userCoupling ? addUser() : addBox())}>Создать муфту</button>
        </div>
      </div>
    </Modal>
  );
}

export default styled(CouplingCreactionModal)`
    button{
        width: 100%;
        border: 1px solid #FFFAFA;
        height: 40px;
        color: white;
        cursor: pointer;
        background-color: #4573d5;
        &:hover{
          background-color: #0627df;
        }
    }
    
    input,textarea{
        padding: 8px;
        width: 90%;
        border: 1px solid black;
      }
      label{
        font-weight: bold;
        &:first-child{
          margin-top: 0;
        }
     }
`;
