

export const isEmpty = (value: string): boolean => {
    return value == null || value.trim() === "";
  }


export const validateCredentials = (...credentials : string[]): boolean => {
    if(credentials.some((credential : string) => isEmpty(credential))) {
    //   Alert.alert("Missing information", "Email address and/or password are missing");
      return false;
    }
    return true;
}