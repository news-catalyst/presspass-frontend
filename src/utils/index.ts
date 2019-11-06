import { AppActions } from '../store/';

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
