
export interface Sticker {
    ID : number,
    name : string,
    nr_downloads : number,
    logo : string, 
    Designer : string,
    dt_upload : string,
    n_stickers : number
}

export interface StickerImage {
    ID : number,
    ordinal_order: number,
    image_file : string
}

export interface User {
    email : string,
    nickname : string
}