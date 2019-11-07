import { AppActions } from '../store/';
import cookie from 'js-cookie';

export function checkAuth(actions: AppActions) {
  return (response: Response): Response => {
    console.log(response);
    if (response.status === 403) {
      actions.logout();
      throw new Error("Not logged in");
    }
    return response;
  }
}

function updateOptions(options: RequestInit) {
  const update = { ...options };
  console.log(cookie.get())
  if (cookie.get("csrftoken") !== undefined) {
    update.headers = {
      ...update.headers,
      "X-CSRFToken": cookie.get("csrftoken") || "",
    };
  }
  return update;
}

// Drop-in replacement for `fetch(...)` that adds a CSRF token
// from the CSRF cookie
export function cfetch(url: string, options: RequestInit) {
  return fetch(url, updateOptions(options));
}