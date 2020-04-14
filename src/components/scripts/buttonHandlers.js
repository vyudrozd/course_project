import serverData from '../../const/serverData';


const deleteWire = async (id) => fetch(`${serverData.serverLink}api/wires/${id}`, {
  method: 'delete',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('whitenetWebToken')}`,
  },
}).then((response) => {
  if (response.status !== 200) {
    alert('Произошла ошибка! Повторите запрос');
    return;
  }
  return response.json();
});

const deletePoint = async (id) => fetch(`${serverData.serverLink}api/boxes/${id}`, {
  method: 'delete',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('whitenetWebToken')}`,
  },
}).then((response) => {
  if (response.status !== 200) {
    alert('Произошла ошибка! Повторите запрос');
    return;
  }
  return response.json();
});

export {
  deletePoint,
  deleteWire,
};
