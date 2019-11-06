import { AppActions } from '..';
import { checkAuth } from '../../utils';
import { Client } from './types';

const headers = {
  headers: {
    'Content-Type': 'application/json',
    'X-CSRFToken': 'jjbk2dwaeC8fJEW0X5jmIM4in7g47xN5mGUJWDGZJ8pSGe7SFpyxN5RITStzRunn',
  },
};

const GET = Object.assign({}, headers, { method: 'GET', credentials: 'include' });

const addClients = function(data: any, actions: AppActions) {
  console.log(data);
  data.results.forEach((client: Client) => actions.upsertClient(client));
}

export const fetchClients = (actions: AppActions) =>
  fetch(`${process.env.REACT_APP_SQUARELET_API_URL}/clients`, GET)
    .then(checkAuth(actions))
    .then(response => response.json())
    .then(data => Promise.all([
      addClients(data, actions),
    ])).catch((error) => {
      console.error('API Error fetchClients', error, error.code);
    });
