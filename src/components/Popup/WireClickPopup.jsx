import React from 'react';
import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/all';
import { deleteWire } from '../scripts/buttonHandlers';

function WireClickPopup({
  className,
  id,
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
        <button onClick={async () => { await deleteWire(id); reloadMap(); closePopup(); }}>
          Удалить линию
        </button>
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

export default styled(WireClickPopup)`
    
`;
