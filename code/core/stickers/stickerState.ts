
/**
 * Function that returns a certain type of state (chosen) of a pack, that could be state of being saved, being liked..
 */
export const getState = async (stateType : string, id : number) : Promise<boolean> => {
    return await fetch(`https://stickerest.herokuapp.com/auth/is-${stateType}-${id}`)
        .then((result) => result.json())
        .catch(error => {throw new Error(error.message)});
}

/**
 * Function that inverts a certain type of state (chosen) of a pack, from like to dislike, from dislike to like, ...
 */
export const changeState = async (isAlreadyState : boolean, stateType : string, id : number) : Promise<boolean> => {
    return await fetch(`https://stickerest.herokuapp.com/auth/${isAlreadyState ? 'remove' : 'add'}-${stateType}-${id}`)
        .then((result) => !isAlreadyState)
        .catch(error => {throw new Error(error.message)});
}

        