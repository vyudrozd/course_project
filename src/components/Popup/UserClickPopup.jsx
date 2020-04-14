import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { AiOutlineClose, AiOutlineUser } from 'react-icons/all';
import CouplingDataChangeModal from '../Modal/CouplingDataChangeModal';
import serverData from '../../const/serverData';
import { deletePoint } from '../scripts/buttonHandlers';

function intervalManager() {
  let interval;

  function startInterval(setUserData, id) {
    interval = setInterval(async () => {
      const dataInterval = await fetch(`${serverData.serverLink}api/boxes/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('whitenetWebToken')}`,
        },
      }).then((response) => response.json());

      if (dataInterval.success) {
        const { data: { properties } } = dataInterval;
        console.log(properties);
        setUserData([{
          label: 'Name',
          data: properties.name,
        },
        {
          label: 'ID',
          data: id,
        }, {
          label: 'Description',
          data: properties.description,
        },
        {
          label: 'Status',
          data: properties.online ? 'Online' : 'Offline',
        },
        {
          label: 'IP',
          data: properties.ip,
        },
        {
          label: 'MAC',
          data: properties.mac,
        }]);
      }
    }, 2000);
  }
  function killInterval() {
    clearInterval(interval);
  }

  return {
    startInterval,
    killInterval,
  };
}

function UserClickPopup({
  className,
  id,
  setParent,
  reloadMap,
  e = {
    features: [{
      properties: {

      },
    }],
  },
  setPopup,
}) {
  const closePopup = () => setPopup({});
  const [show, setShow] = useState(false);
  const [coupling, setCoupling] = useState({});
  const handleChangeDataBtn = async () => {
    const couplingData = await fetch(`${serverData.serverLink}api/boxes/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('whitenetWebToken')}`,
      },
    }).then((response) => response.json());

    const { data: { properties } } = couplingData;

    setCoupling(properties);
    setShow(true);
  };

  const data = fetch(`${serverData.serverLink}api/boxes/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('whitenetWebToken')}`,
    },
  }).then((response) => response.json());

  const [userData, setUserData] = useState([{
    label: 'Name',
    data: e.features ? e.features[0].properties.name : '',
  },
  {
    label: 'ID',
    data: id,
  }, {
    label: 'Description',
    data: e.features ? e.features[0].properties.description : '',
  },
  {
    label: 'Status',
    data: '',
  },
  {
    label: 'IP',
    data: '',
  },
  {
    label: 'MAC',
    data: '',
  }]);

  if (data.success) {
    const { data: { properties } } = data;
    setUserData([{
      label: 'Name',
      data: properties.name,
    },
    {
      label: 'ID',
      data: id,
    }, {
      label: 'Description',
      data: properties.description,
    },
    {
      label: 'Status',
      data: properties.online ? 'Online' : 'Offline',
    },
    {
      label: 'IP',
      data: properties.ip,
    },
    {
      label: 'MAC',
      data: properties.mac,
    }]);
  }

  const [dataUpdate] = useState(intervalManager);

  useEffect(() => {
    dataUpdate.startInterval(setUserData, id);

    return () => dataUpdate.killInterval();
  }, [dataUpdate, id]);

  return (
    <>
      <div className={className}>
        <CrossPlace>
          <button onClick={() => closePopup()}>
            <AiOutlineClose size="1em" />
          </button>
        </CrossPlace>
        <UserIconPlace>
          <AiOutlineUser size="3em" />
        </UserIconPlace>
        <TablePlace>
          <tbody>
            {userData.map((element, index) => (
              <tr key={`keyArray${index}`}>
                <th>
                  {element.label}
                </th>
                <td>
                  {element.data}
                </td>
              </tr>
            ))}
          </tbody>
        </TablePlace>
        <div>
          <div>
            <button
              className="control"
              onClick={() => {
                setParent();
                closePopup();
              }}
            >
              Соединить пользователя
            </button>
          </div>
          <div>
            <button className="control" onClick={async () => { await deletePoint(id).then(() => { closePopup(); setTimeout(() => reloadMap(), 1000); }); }}>
              Удалить муфту
            </button>
          </div>
          <div>
            <button className="control" onClick={() => handleChangeDataBtn()}>
              Изменить данные
            </button>
          </div>
        </div>
      </div>
      <CouplingDataChangeModal
        show={show}
        setShow={setShow}
        coupling={coupling}
      />
    </>
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

const UserIconPlace = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 5px;
  border-bottom: 1px solid black;
`;

const TablePlace = styled.table`
    th, td{
        padding: 6px 12px;
        border: 1px solid #e3ecf3;
    }
    td{
        width: 100%;
    }
    tbody{
        width: 100%;
    }
`;

export default styled(UserClickPopup)`
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
    min-width: 300px;
`;
