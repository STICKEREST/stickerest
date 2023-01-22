import { User } from "../types";

export const prepareCredentials = ( nickname : string, telegramId : string) : string => {
    nickname = encodeURIComponent("nickname") + "=" + encodeURIComponent(nickname);
    telegramId = encodeURIComponent("telegram") + "=" + encodeURIComponent(telegramId);

    return (nickname + "&" + telegramId);
}


export const update = async (form: string): Promise<boolean> => {
    
    return fetch("https://stickerest.herokuapp.com/auth/update-me", {
        method: 'POST',
        body: form,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        })
        .then(response => {
            console.log(response);
            console.log(response.status);
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
    
    return fetch("https://stickerest.herokuapp.com/auth/me")
    .then(response => response.json())
    .then(result => {

        return {
            email : result[0].email,
            nickname : result[0].nickname
        }

    })
    .catch(error => {console.log(error); return { email : "", nickname : ""}})
}