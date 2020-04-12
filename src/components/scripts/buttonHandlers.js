import serverData from '../../const/serverData';


const deleteWire = async (id) => fetch(`${serverData.serverLink}api/wires/${id}`, {
  method: 'delete',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('whitenetWebToken')}`,
  },
});

const deletePoint = async (id) => fetch(`${serverData.serverLink}api/boxes/${id}`, {
  method: 'delete',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('whitenetWebToken')}`,
  },
});

export {
  deletePoint,
  deleteWire,
};
