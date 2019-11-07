import { AppActions } from '..';
import { checkAuth, cfetch } from '../../utils';
import { Client } from './types';

const headers = {
  headers: {
    'Content-Type': 'application/json',
  },
};

const GET = Object.assign({}, headers, { method: 'GET', credentials: 'include' });

const addClients = function(data: any, actions: AppActions) {
  console.log(data);
  data.results.forEach((client: Client) => actions.upsertClient(client));
}

export const fetchClients = (actions: AppActions) =>
  cfetch(`${process.env.REACT_APP_SQUARELET_API_URL}/clients`, {
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: "include"
  })
    .then(checkAuth(actions))
    .then(response => response.json())
    .then(data => Promise.all([
      addClients(data, actions),
    ])).catch((error) => {
      console.error('API Error fetchClients', error, error.code);
    });
