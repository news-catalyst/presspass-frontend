import React, { useState, SyntheticEvent } from 'react';
import { AppActions } from '../store';
import { updatePassword } from '../store/auth/api';
import { Field } from '../common/field';

interface AccountEditPageProps {
    actions: AppActions
}

export const AccountEditPage: React.FC<AccountEditPageProps> = (props: AccountEditPageProps) => {
    let [errors, setErrors] = useState<any>({});
    let [oldPassword, setOldPassword] = useState("");
    let [newPassword, setNewPassword] = useState("");
    let [newPasswordConfirm, setNewPasswordConfirm] = useState("");
    let [saved, setSaved] = useState(false);
    
    function handlePasswordUpdateSubmit (event: SyntheticEvent) {
        event.preventDefault();
        updatePassword(props.actions, oldPassword, newPassword, newPasswordConfirm).then(status => {
            if (status.ok) {
                setSaved(true);
                setOldPassword("");
                setNewPassword("");
                setNewPasswordConfirm("");
                setErrors({});
            } else {
                setErrors(status.body);
            }
        });
    }

    let savedConfirmation = saved ? <div className="notification is-success limited-width">Your account settings have been updated.</div> : null;

    return (
        <section>
            <h1 className="title is-size-1">Manage Account</h1>
            {savedConfirmation}
            <form className="limited-width" onSubmit={handlePasswordUpdateSubmit}>
                <Field label="Old Password" errors={errors.old_password}>
                    <input type="password" className={errors.old_password ? "input is-danger" : "input"} value={oldPassword} onChange={event => setOldPassword(event.target.value)} />
                </Field>
                <Field label="New Password" errors={errors.new_password1}>
                    <input type="password" className={errors.new_password1 ? "input is-danger" : "input"} value={newPassword} onChange={event => setNewPassword(event.target.value)} />
                </Field>
                <Field label="Confirm New Password" errors={errors.new_password2}>
                    <input type="password" className={errors.new_password2 ? "input is-danger" : "input"} value={newPasswordConfirm} onChange={event => setNewPasswordConfirm(event.target.value)} />
                </Field>
                <button className="button is-link" type="submit">Update Password</button>
            </form>
        </section>
    )
}