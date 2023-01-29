

export const getState = async (stateType : string, id : number) : Promise<boolean> => {
    return await fetch(`https://stickerest.herokuapp.com/auth/is-${stateType}-${id}`)
        .then((result) => result.json())
        .catch(error => {throw new Error(error.message)});
}

export const changeState = async (isAlreadyState : boolean, stateType : string, id : number) : Promise<boolean> => {
    return await fetch(`https://stickerest.herokuapp.com/auth/${isAlreadyState ? 'remove' : 'add'}-${stateType}-${id}`)
        .then((result) => !isAlreadyState)
        .catch(error => {throw new Error(error.message)});
}

        