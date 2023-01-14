

export const prepareCredentials = (email : string, nickname : string, password : string) : string => {
    email = encodeURIComponent("email") + "=" + encodeURIComponent(email);
    nickname = encodeURIComponent("nickname") + "=" + encodeURIComponent(nickname);
    password = encodeURIComponent("password") + "=" + encodeURIComponent(password);

    return (email + "&" + nickname + "&" + password);
}

export const registration = async (form: string): Promise<boolean> => {

    console.log(form);
    
    return fetch("https://stickerest.herokuapp.com/users/register", {
        method: 'POST',
        body: form,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        })
        .then(response => {
            console.log(response);
            console.log(response.status);
            if(response.status === 201) {
                console.log("Successful registration");
                return true;
            } else {
                return false;
            }
        }).catch(error => {
            console.log("Error: " + error);
            return false;
        });
}