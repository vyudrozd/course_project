import React, { useState } from 'react';
import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/all';
import CouplingCreationModal from '../Modal/CouplingCreationModal';

function MapClickPopup({
  className,
  e,
  reloadMap,
  setPopup,
}) {
  const [show, setShow] = useState(false);
  const [userCoupling, setUserCoupling] = useState(false);
  const closePopup = () => setPopup({});
  return (
    <>
      <div>
        <CrossPlace>
          <button onClick={() => closePopup()}>
            <AiOutlineClose size="1em" />
          </button>
        </CrossPlace>
        <div className={className}>
          <div>
            <button onClick={() => { setUserCoupling(false); setShow(true); }}>
              Добавить муфту
            </button>
          </div>
          <div>
            <button onClick={() => { setUserCoupling(true); setShow(true); }}>
              Добавить пользователя
            </button>
          </div>
        </div>
      </div>
      <CouplingCreationModal
        show={show}
        setShow={setShow}
        userCoupling={userCoupling}
        loadMap={reloadMap}
        closePopup={closePopup}
        e={e}
      />
    </>
  );
}

export default styled(MapClickPopup)`
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
`;

const CrossPlace = styled.div`
  display: flex;
  flex-direction: row-reverse;
  width: 100%;
  margin-bottom: 5px;
  button{
    border: 0;
    background-color: white;
    cursor: pointer;
  }
`;
