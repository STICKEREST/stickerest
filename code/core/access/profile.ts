import { User } from "../types";
import { postAccessFunction } from "./accessUtilities";

/**
 * Function that converts the given credentials into a form usable by the 'update' function.
 * Returns the form to be used by 'update'.
 */
export const prepareCredentials = ( nickname : string, telegramId : number) : string => {
    nickname = encodeURIComponent("nickname") + "=" + encodeURIComponent(nickname);
    const tel : string = encodeURIComponent("telegram") + "=" + encodeURIComponent(telegramId);

    return (nickname + "&" + tel);
}

/**
 * Function that tries to update user information.
 * Throws an error if the credentials are invalid or if something goes wrong.
 */
export const update = async (form: string): Promise<void> => {
    await postAccessFunction("https://stickerest.herokuapp.com/auth/update-me", "Updating user data...", form);
}

/**
 * Function that takes information from the Backend about the user
 */
export const getData = async (): Promise<User> => {
    console.log("Getting user data...");
    return fetch("https://stickerest.herokuapp.com/auth/me")
    .then(response => response.json())
    .then(result => {

        return {
            email : result[0].email,
            nickname : result[0].nickname,
            telegram : (Number.isNaN(+result[0].telegram) ? 0 : +result[0].telegram)
        }

    })
    .catch(error => {console.log(error); return { email : "", nickname : "", telegram : 0}})
}
