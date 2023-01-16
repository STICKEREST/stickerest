
/**
 * Function that converts the given credentials into a form usable by the 'login' function.
 * Returns the form to be used by 'login'.
 */
export const prepareCredentials = (email : string, nickname : string, password : string) : string => {
    email = encodeURIComponent("email") + "=" + encodeURIComponent(email);
    nickname = encodeURIComponent("nickname") + "=" + encodeURIComponent(nickname);
    password = encodeURIComponent("password") + "=" + encodeURIComponent(password);
    return email + "&" + nickname + "&" + password;
}

/**
 * Function that tries to register the user.
 * Throws an error if the credentials are invalid or if something goes wrong.
 * Prints a message to the console if the registration is successful.
 * Used when attempting sign up, the user should be set as logged in if this function does not throw an error.
 * The parameter 'form' is the value returned from the 'prepareCredentials' function.
 */
export const registration = async (form: string): Promise<void> => {
    await fetch("https://stickerest.herokuapp.com/users/register", {
        method: 'POST',
        body: form,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(response => {
        if(response.status === 201) {
            console.log("Successful registration");
        } else {
            // TODO: Throw a more meaningful error
            throw new Error();
        }
    });
}
