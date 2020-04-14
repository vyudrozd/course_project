import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from '.';
import serverData from '../../const/serverData';

function CouplingDataChangeModal({
  className,
  show,
  setShow,
  coupling,
}) {
  const [couplingName, setName] = useState(coupling.name);
  const [couplingDescription, setDescription] = useState(coupling.description);

  const postCoupling = async (data) => {
    const response = await fetch(
      `${serverData.serverLink}api/boxes/${coupling.id}`, {
        method: 'put',
        body: JSON.stringify(data),
        headers: {
          Authorization: `Bearer ${localStorage.getItem('whitenetWebToken')}`,
          'Content-Type': 'application/json;charset=utf-8',
        },
      },
    );
    if (!response.ok) {
      alert('Произошла непредвиденная ошибка. Проверьте соединение и повторите операцию');
    }
  };

  const handleChangeBtn = () => {
    const data = {
      name: couplingName,
      description: couplingDescription,
    };

    postCoupling(data);
  };


  return (
    <Modal setShow={setShow} show={show}>
      <div className={className}>
        <div>
          <div>
            <label htmlFor="couplingName">Название муфты</label>
          </div>
          <div>
            <input type="text" defaultValue={coupling.name} id="couplingName" onChange={({ target }) => setName(target.value)} />
          </div>
          <div>
            <label htmlFor="couplingDescription">Описание муфты</label>
          </div>
          <div>
            <textarea defaultValue={coupling.description} id="couplingDescription" onChange={({ target }) => setDescription(target.value)} />
          </div>
          <button onClick={() => { handleChangeBtn(); setShow(false); }}>Изменить данные</button>
        </div>
      </div>
    </Modal>
  );
}

export default styled(CouplingDataChangeModal)`
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
