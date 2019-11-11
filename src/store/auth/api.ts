import { cfetch, JSON_POST, checkAuth, validate, notify, GET } from "../../utils"
import { AppActions } from ".."

export const updatePassword = (actions: AppActions, oldPassword: string, newPassword: string, newPasswordConfirm: string) => 
    cfetch(`${process.env.REACT_APP_SQUARELET_API_URL}/rest-auth/password/change/`, JSON_POST({
        old_password: oldPassword,
        new_password1: newPassword,
        new_password2: newPasswordConfirm,
    }))
    .then(checkAuth(actions))
    .then(response => validate(response, () => notify("Successfully updated your password.", "success")))

export const registerAccount = (actions: AppActions, username: string, email: string, password: string, passwordConfirm: string) => 
    cfetch(`${process.env.REACT_APP_SQUARELET_API_URL}/rest-auth/registration/`, JSON_POST({
        username,
        email,
        password1: password,
        password2: passwordConfirm,
    }))
    .then(checkAuth(actions))
    .then(response => validate(response, () => notify("Successfully registered your account.", "success")))

export const forceCheckAuth = (actions: AppActions) =>
    cfetch(`${process.env.REACT_APP_SQUARELET_API_URL}/authstatus/check/`, GET).then(async response => {
        let data = await response.json();
        if (!data.authenticated) {
            actions.logout();
        }
    })