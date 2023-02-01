import { getData } from "../access/profile";
import { StickerImage, User } from "../types";
import * as Telegram from '../api/Telegram';

/**
 * Function that prepares information to be used by 'uploadPack', returning the form. 
 */
export const prepareCredentials = (name: string, tags: string[], images: string[]) : FormData => {

    let formdata : FormData = new FormData();

    formdata.append("name", name);

    for(let i = 0; i < tags.length; i++)
      formdata.append("tag",tags[i]);

    for(let i = 0; i < images.length; i++) {
      const uri = images[i];
      const name = uri.split('/').pop();
      const match = /\.(\w+)$/.exec(name);
      const type = match ? `image/${match[1]}` : `image`;
      //@ts-ignore
      formdata.append("image"+i, {uri: uri, name: name, type: type});
    }

    return formdata;
}

/**
 * Function that uploads a Sticker Pack
 */
export const uploadPack = async (form: FormData, name : string): Promise<void> => {
    
    await fetch("https://stickerest.herokuapp.com/auth/create-sticker-pack", {
        method: 'POST',
        body: form,
        headers: {//Header Defination
            'Content-Type': 'multipart/form-data',
        }
    }).then(async response => {
        
        if (response.status === 200 || response.status === 201) {

            try {
                await response.json().then(
                    async (answer) => await createTelegramPack(name, answer.ID)
                );
            } catch (error) {
                throw new Error(error.message);
            }

        } else {
            throw new Error("Something failed during the stickers upload");
        }
    })
    .catch(error => {console.log(error); throw new Error(error.message);});
}

/**
 * Function tthat converts sticker images in a sticker object usable by the Telegram API
 */
const prepareTelegramStickers = (stickers : StickerImage[]) : Telegram.Sticker[] =>{
    return stickers.map((sticker : StickerImage) : Telegram.Sticker => 
                { return {url: sticker.image_file, emoji: "😀"}; });
}

/**
 * Function that prepares an header as the Telegram API requires
 */
const prepareTelegramPackHeader = (idPack : number, name : string, userId : number) : Telegram.StickerPack => {

    const telegramName : string = "stickerest_" + idPack + "_" + name.replace(/\s/g, '');
      
    const stickerPackHeader : Telegram.StickerPack = {
        author: userId /*User id*/,
        name: telegramName /*Must be unique*/,
        title: name /*Generic title*/
    };

    return stickerPackHeader;
}

/**
 * Function that uploads the remaining stickers of a pack to its pack on Telegram through its API 
 *  (since through the API only one sticker at time can be uploaded)
 */
const uploadRestTelegramPack = async (idPack : number, telegramPackHeader : Telegram.StickerPack, restTelegramStickers : Telegram.Sticker[]) : Promise<void> => {

    const promisesTelUpload = restTelegramStickers.map((telStick : Telegram.Sticker) => Telegram.addStickerToPack(telegramPackHeader, telStick));

    await Promise.all(promisesTelUpload)
    .then(async () : Promise<void> => {

        const form : string = (encodeURIComponent("telegramName") + "=" + encodeURIComponent(telegramPackHeader.name));

        await fetch(`https://stickerest.herokuapp.com/auth/add-telegram-${idPack}`, {
            method: 'POST',
            body: form,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
            }).then(response => {
                if (response.status !== 200 && response.status !== 201)
                    throw new Error("Something went wrong while uploading stickers to Telegram");
            });

    })
    .catch(error => {throw new Error(error.message)});
}

/**
 * Function that uploads a sticker pack in telegram
 */
const createTelegramPack = async (name : string, idPack : number) : Promise<void> => {

    await getData()
        .then(async (result : User) : Promise<void> => {
        
        if(result.telegram === 0)
            throw new Error("Telegram Id is missing");

        const imagesQuery = `https://stickerest.herokuapp.com/stickers/images-${idPack}`;

        await fetch(imagesQuery)
            .then(response => response.json())
            .then(async (response : StickerImage[]) : Promise<void> => {

                const [stickerFront, ...restTelegramStickers] = prepareTelegramStickers(response);
        
                const telegramPackHeader : Telegram.StickerPack = prepareTelegramPackHeader(idPack, name, result.telegram);

                await Telegram.createStickerPack(telegramPackHeader, stickerFront)
                .then(async () : Promise<void> => {
                    await uploadRestTelegramPack(idPack, telegramPackHeader, restTelegramStickers);
                }).catch(error => {throw new Error(error.message)});

            });
    
    }).catch(error => {throw new Error(error.message)});

}
