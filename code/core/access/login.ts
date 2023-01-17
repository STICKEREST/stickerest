
/**
 * Function that converts the given credentials into a form usable by the 'login' function.
 * Returns the form to be used by 'login'.
 */
export const prepareCredentials = (email: string, password: string) : string => {
    email = encodeURIComponent("email") + "=" + encodeURIComponent(email);
    password = encodeURIComponent("password") + "=" + encodeURIComponent(password);
    return email + "&" + password;
}

/**
 * Function that tries to log the user in.
 * Throws an error if the credentials are invalid or if something goes wrong.
 * Prints a message to the console if the login is successful.
 * Used when attempting login, the user should be set as logged in if this function does not throw an error.
 * The parameter 'form' is the value returned from the 'prepareCredentials' function.
 */
export const login = async (form: string): Promise<void> => {
    console.log(" FORM \n\n\n" + form);
    await fetch("https://stickerest.herokuapp.com/users/login", {
        method: 'POST',
        body: form,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(response => response.json()).then(response => {
        if (response === "Successfully logged in!") {
            console.log(response);
        } else {
            throw new Error(response.message);
        }
    });
}
