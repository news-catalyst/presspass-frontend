import { AppActions } from '../store/';
import cookie from 'js-cookie';

export function checkAuth(actions: AppActions) {
  return (response: Response): Response => {
    if (response.status === 403) {
      actions.logout();
      throw new Error("Not logged in");
    }
    return response;
  }
}

function updateOptions(options: RequestInit) {
  const update = { ...options };
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

export type ItemizedResponse = {
  ok: boolean;
  body: any;
}

export async function validate(response: Response, ok: Function): Promise<ItemizedResponse> {
  let itemizedResponse: ItemizedResponse = {
    ok: response.ok,
    body: await response.json()
  };
  if (response.ok) {
    ok(itemizedResponse);
  }
  return itemizedResponse;
}
