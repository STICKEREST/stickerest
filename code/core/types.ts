
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

export interface SimpleStickerPack {
    ID: number,
    name : string,
    logo : string
}

export interface User {
    email : string,
    nickname : string,
    telegram : number
}

//{ cancelled: false, type: 'image', uri, width, height, exif, base64 }

export interface ImageType { 
    
}