import React, { useState } from 'react';
import styled from 'styled-components';
import { FaDoorOpen, FaDoorClosed, FaSignOutAlt } from 'react-icons/all';
import RegistrationModal from './Modal/RegistrationModal';

const exitBtnHandler = (setToken) => {
  localStorage.setItem('whitenetWebToken', 'null');
  setToken('null');
};

function Header({ className, token, setToken }) {
  const [door, setDoor] = useState(<FaDoorClosed size="3em" />);
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <div className={className}>
        <div>
          {token !== 'null' ? (
            <button
              onClick={() => exitBtnHandler(setToken)}
            >
              <FaSignOutAlt size="3em" />
            </button>
          ) : (
            <button
              onClick={() => setModalShow(true)}
              onMouseEnter={() => setDoor(<FaDoorOpen size="3em" />)}
              onMouseLeave={() => setDoor(<FaDoorClosed size="3em" />)}
            >
              {door}
            </button>
          )}
        </div>
      </div>
      <RegistrationModal
        show={modalShow}
        setShow={setModalShow}
        setToken={setToken}
      />
    </>
  );
}

export default styled(Header)`
    background-color: rgba(0,0,0,0);
    margin-left: auto;
    position: absolute;
    top: 10px;
    right: 10px;
    float: right;
    z-index: 9;
    button{
        padding: 5px;
        border: 0;
        height: 100%;
        background-color: rgba(255,255,255,0.3);
        cursor: pointer;
        margin: 10px 10px 0 0;
    }
`;
