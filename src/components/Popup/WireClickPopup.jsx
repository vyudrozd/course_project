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
        <button className="control" onClick={async () => { await deleteWire(id).then(() => { closePopup(); setTimeout(() => reloadMap(), 1000); }); }}>
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
    .control{
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
