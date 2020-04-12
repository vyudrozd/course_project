import React from 'react';
import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/all';
import { deletePoint } from '../scripts/buttonHandlers';

function CouplingClickPopup({
  className,
  id,
  setParent,
  reloadMap,
  setPopup,
}) {
  const closePopup = () => setPopup({});
  return (
    <div>
      <CrossPlace>
        <button onClick={() => closePopup()}>
          <AiOutlineClose size="1em" />
        </button>
      </CrossPlace>
      <div className={className}>
        <div>
          <button onClick={() => {
            setParent();
            closePopup();
          }}
          >
            Соединить муфту
          </button>
        </div>
        <div>
          <button onClick={() => { deletePoint(id); closePopup(); reloadMap(); }}>
            Удалить муфту
          </button>
        </div>
      </div>
    </div>
  );
}

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

export default styled(CouplingClickPopup)`
    
`;
