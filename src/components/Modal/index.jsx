import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

const modalRoot = document.getElementById('modal');

function Modal({
  className,
  show,
  setShow,
  children,
} = {}) {
  const [modalEl] = useState(document.createElement('div'));

  useEffect(() => {
    modalRoot.appendChild(modalEl);

    return () => modalRoot.removeChild(modalEl);
  }, [show, modalEl]);

  if (!show) return null;
  return createPortal(
    <>
      <div className={className}>
        {children}
      </div>
      <CloseField onClick={() => setShow(!show)} />
    </>, modalEl,
  );
}

const CloseField = styled.div`
    z-index: 9998;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.3);
`;

export default styled(Modal)`
    z-index: 9999;
    position: absolute;
    top: 50%;
    left: 50%;
    min-width: 300px;
    padding: 15px;
    border-radius: 10px;
    transform: translate(-50%, -50%);
    background: #fff;
`;
