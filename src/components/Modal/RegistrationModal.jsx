import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from '.';
import serverData from '../../const/serverData';

function RegistrationModal({
  className,
  show,
  setShow,
  setToken,
}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const enterBtnHandler = async () => {
    if (username.length > 4 && password.length > 4) {
      const body = {
        email: username,
        password,
      };
      const responseData = await fetch(`${serverData.serverLink}api/user/token/`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(body),
      }).then((response) => response.json());
      if (responseData.success) {
        const { data: { token } } = responseData;
        localStorage.setItem('whitenetWebToken', token);
        setShow(false);
        setToken(token);
      } else {
        alert('Данные введены неверно');
      }
    } else {
      alert('Данные введены неверно');
    }
  };

  return (
    <Modal
      show={show}
      setShow={setShow}
    >
      <div className={className}>
        <div>
          <label htmlFor="username">Логин</label>
          <input type="text" defaultValue="" id="username" onChange={({ target }) => setUsername(target.value)} />
          <label htmlFor="password">Пароль</label>
          <input type="password" defaultValue="" id="password" onChange={({ target }) => setPassword(target.value)} />
          <button onClick={() => enterBtnHandler()}>Войти</button>
        </div>
      </div>
    </Modal>
  );
}

export default styled(RegistrationModal)`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
    width: 100%;
    height: calc(100% - 120px);
    div{
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 460px;
      padding: 40px;
      background-color: @backgroundcolor;
      label, input{
        margin-top: 10px;
    }
      input{
        padding: 8px;
      }
      label{
        font-weight: bold;
        &:first-child{
          margin-top: 0;
        }
     }
      button{
        margin-top: 20px;
        border: 1px solid #FFFAFA;
        height: 40px;
        color: white;
        cursor: pointer;
        background-color: #4573d5;
        &:hover{
          background-color: #0627df;
        }
      }
    }
`;
