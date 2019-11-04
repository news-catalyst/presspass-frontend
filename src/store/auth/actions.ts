import { LOGIN } from "./types";

export function loginWithKey(key: string) {
    return {
        type: LOGIN,
        key: key,
    }
}