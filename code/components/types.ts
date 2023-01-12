
export interface Sticker {
    ID : number,
    name : string,
    nr_downloads : number,
    logo : string, 
    Designer : string,
    dt_upload : string
}

export interface StickerImage {
    ID : number,
    ordinal_order: number,
    image_file : string
}