
export const prepareCredentials = (email : string, password : string) : string => {
    email = encodeURIComponent("email") + "=" + encodeURIComponent(email);
    password = encodeURIComponent("password") + "=" + encodeURIComponent(password);

    return (email + "&" + password);
}

export const login = async (form: string): Promise<boolean> => {
    
    return fetch("https://stickerest.herokuapp.com/users/login", {
        method: 'POST',
        body: form,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(response => response.json()).then(response => {
        if (response === "Successfully logged in!") {
            console.log(response);
            return true;
        } else if (response.message === "username or password is not matched") {
            return false;
        }
    }).catch(error => {
        console.log("Error: " + error);
        return false;
    });
    
}