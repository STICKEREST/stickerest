import { User } from "../types";

export const prepareCredentials = ( nickname : string, telegramId : number) : string => {
    nickname = encodeURIComponent("nickname") + "=" + encodeURIComponent(nickname);
    const tel : string = encodeURIComponent("telegram") + "=" + encodeURIComponent(telegramId);

    return (nickname + "&" + tel);
}


export const update = async (form: string): Promise<boolean> => {
    console.log("Updating user data...");
    return fetch("https://stickerest.herokuapp.com/auth/update-me", {
        method: 'POST',
        body: form,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        })
        .then(response => {
            if(response.status === 200) {
                console.log("Successful update");
                return true;
            } else {
                return false;
            }
        }).catch(error => {
            console.log("Error: " + error);
            return false;
        })
        .catch(error => {console.log(error); return false;});
}

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
