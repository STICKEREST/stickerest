import { SimpleStickerPack, Sticker, StickerImage } from "../types";

export const getStickerFromId = async (id : number) : Promise<Sticker>=> {
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

// fetch("https://stickerest.herokuapp.com/stickers/random")
//             .then(result => result.json())
//             .then((stickerResults: SimpleStickerPack[]) => setRandomPack(stickerResults[0]))
//             .catch(error => console.log(error));