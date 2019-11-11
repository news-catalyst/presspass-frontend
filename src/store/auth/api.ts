import { cfetch, JSON_POST, checkAuth, validate, notify } from "../../utils"
import { AppActions } from ".."

export const updatePassword = (actions: AppActions, oldPassword, newPassword, newPasswordConfirm) => 
    cfetch(`${process.env.REACT_APP_SQUARELET_API_URL}/rest-auth/password/change/`, JSON_POST({
        old_password: oldPassword,
        new_password1: newPassword,
        new_password2: newPasswordConfirm,
    }))
    .then(checkAuth(actions))
    .then(response => validate(response, () => notify("Successfully updated your password.", "success")))