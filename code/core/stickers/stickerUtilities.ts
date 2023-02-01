import { SimpleStickerPack, StickerPack, StickerImage } from "../types";

/**
 * Functions that returns a stickerpack from its id
 */
export const getStickerFromId = async (id : number) : Promise<StickerPack>=> {
    return await fetch(`https://stickerest.herokuapp.com/stickers/${id}`)
        .then((result) => result.json())
        .then((result) => result[0]);
}

/**
 * Functions that returns a images of a stickerpack from its id
 */
export const getStickerImagesFromId = async (id : number) : Promise<StickerImage[]> => {
    return await fetch(`https://stickerest.herokuapp.com/stickers/images-${id}`)
        .then((result) => result.json())
        .then((result) => result.slice(1));
}

/**
 * Functions that increments the number of donwload of a certain sticker pack from its id
 */
export const addDownload = async (id : number) : Promise<void> => {
    await fetch(`https://stickerest.herokuapp.com/stickers/download-${id}`)
      .catch(error => {throw new Error(error.message)});
  }

/**
 * Functions that returns a random sticker pack
 */
export const getRandomSticker = async () : Promise<SimpleStickerPack> => {
    return await fetch("https://stickerest.herokuapp.com/stickers/random")
        .then(result => result.json())
        .then((stickerResults: SimpleStickerPack[]) => stickerResults[0])
        .catch(error => {throw new Error(error.message)});
}

/**
 * General function to be used to get arrays of sticker packs using a specific query always of the type
 *  query => StickerPack[]
 */
const getGenericToStickerPacks = async (link : string) : Promise<StickerPack[]> => {
    return await fetch(link)
            .then((response) => response.json())
            .catch(error => {throw new Error(error.message)});
}

/**
 * Function that returns sticker pack saved by the user
 */
export const getSavedStickers = async () : Promise<StickerPack[]> => {
    return await getGenericToStickerPacks("https://stickerest.herokuapp.com/auth/my-saved");
}

/**
 * Function that returns the most downloaded sticker packs in a decreasing order
 */
export const getMostDownloaded = async () : Promise<StickerPack[]> => {
    return await getGenericToStickerPacks("https://stickerest.herokuapp.com/stickers/most-downloaded");
}

/**
 * Function that returns the most saved sticker packs in a decreasing order
 */
export const getMostSaved = async () : Promise<StickerPack[]> => {
    return await getGenericToStickerPacks("https://stickerest.herokuapp.com/stickers/most-saved");
}

/**
 * Function that returns the most favorited sticker packs by the users in a decreasing order
 */
export const getMostFavorited = async () : Promise<StickerPack[]> => {
    return await getGenericToStickerPacks("https://stickerest.herokuapp.com/stickers/most-favorited");
}

/**
 * Function that returns sticker packs that have a similar name to the name requested
 */
export const getByName = async (name : string) : Promise<StickerPack[]> => {
    return await getGenericToStickerPacks(`https://stickerest.herokuapp.com/stickers/name-${name}`);
}

/**
 * Function that returns sticker packs that have at least one similar tag to the tag requested
 */
export const getByTags = async (tags : string) : Promise<StickerPack[]> => {
    return await getGenericToStickerPacks(`https://stickerest.herokuapp.com/stickers/tags-${tags}`);
}