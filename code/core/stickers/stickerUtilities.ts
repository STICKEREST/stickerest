import { SimpleStickerPack, StickerPack, StickerImage } from "../types";

export const getStickerFromId = async (id : number) : Promise<StickerPack>=> {
    return await fetch(`https://stickerest.herokuapp.com/stickers/${id}`)
        .then((result) => result.json())
        .then((result) => result[0]);
}

export const getStickerImagesFromId = async (id : number) : Promise<StickerImage[]> => {
    return await fetch(`https://stickerest.herokuapp.com/stickers/images-${id}`)
        .then((result) => result.json())
        .then((result) => result.slice(1));
}

export const addDownload = async (id : number) : Promise<void> => {
    await fetch(`https://stickerest.herokuapp.com/stickers/download-${id}`)
      .catch(error => {throw new Error(error.message)});
  }

export const getRandomSticker = async () : Promise<SimpleStickerPack> => {
    return await fetch("https://stickerest.herokuapp.com/stickers/random")
        .then(result => result.json())
        .then((stickerResults: SimpleStickerPack[]) => stickerResults[0])
        .catch(error => {throw new Error(error.message)});
}

export const getSavedStickers = async () : Promise<StickerPack[]> => {
    return await fetch("https://stickerest.herokuapp.com/auth/my-saved")
            .then((response) => response.json())
            .catch(error => {throw new Error});
}


// fetch("https://stickerest.herokuapp.com/auth/my-saved")
//       .then((response) => response.json())
//       .then((result) => setQueriedStickers(result))
//       .catch(error => console.log(error));