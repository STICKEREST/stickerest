
/**
 * Function that checks if a given string is null or empty.
 * Returns true if it is null or empty, otherwise false.
 */
export const isEmpty = (value: string): boolean => {
  return value == null || value.trim() === "";
}

/**
 * Function that checks if the given credentials are valid.
 * If any of the given credential is a null or an empty string this function will throw an error.
 * Used in login.
 */
export const validateCredentials = async (...credentials : string[]): Promise<void> => {
  if(credentials.some((credential: string) => isEmpty(credential))) {
    throw new Error("Some credentials are missing");
  }
}

export const postAccessFunction = async (query : string, message : string, form : string) : Promise<void> => {

  console.log(message);
  await fetch(query, {
    method: 'POST',
    body: form,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then(async response => {
    if(response.status.toString().charAt(0) !== '2')
      throw new Error("Error " + response.status + ". " + (await response.json()).message);
  }).catch(error => {throw new Error(error.message)});

} 
