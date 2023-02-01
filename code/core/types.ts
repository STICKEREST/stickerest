import { NativeSyntheticEvent, TextInputChangeEventData, TextInputKeyPressEventData } from "react-native";

export interface StickerPack {
    ID : number,
    name : string,
    nr_downloads : number,
    logo : string, 
    Designer : string,
    dt_upload : string,
    n_stickers : number,
    telegram_name : string
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

export type SetString = React.Dispatch<React.SetStateAction<string>>;
export type SetStringArray = React.Dispatch<React.SetStateAction<string[]>>;
export type SetNumber = React.Dispatch<React.SetStateAction<number>>; 
export type SetBoolean = React.Dispatch<React.SetStateAction<boolean>>;
export type SetStickerPackArray = React.Dispatch<React.SetStateAction<StickerPack[]>>;
export type SetStickerPack = React.Dispatch<React.SetStateAction<StickerPack>>;
export type SetStickerImageArray = React.Dispatch<React.SetStateAction<StickerImage[]>>;

export type QueryStickerPack = () => Promise<StickerPack[]>;
export type VoidFunction = () => void;
export type OnStickerFunction = (id : number) => void;
export type OnStickerPackFunction = (sticker: StickerPack) => React.ReactNode;
export type OnStickerPackArrayFunction = (stickers: StickerPack[]) => React.ReactNode;

export type KeyPressedEvent = NativeSyntheticEvent<TextInputKeyPressEventData>;
export type InputChangeEvent = NativeSyntheticEvent<TextInputChangeEventData>;