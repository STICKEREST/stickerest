import React from "react";
import { Linking } from "react-native";

// import { TELEGRAM_API_KEY } from "@env";

// Interface for sticker pack object
export interface StickerPack {
	// User id of the author of the sticker pack (cannot be a bot)
	author: number,
	// Name id of the sticker pack. Must be unique. Packs created by the Stickerest bot have "_by_StickerestBot" appended to their name.
	name: string,
	// Display title of the sticker pack
	title: string
}

// Inteface for sticker object
export interface Sticker {
	// URL to a png image of the sticker. Must be a png of max size 512x512 pixels
	url: string,
	// One or more emojis that go with the sticker
	emoji: string
}

/**
 * Function to call to import a sticker pack to Telegram.
 * The pack must be uploaded on telegram for this to work.
 * 'packName' is the name with which the pack was uploaded on Telegram.
 */
export const importPack = async (packName: string): Promise<void> => {
  const url = 'https://telegram.me/addstickers/' + packName + "_by_StickerestBot";
  const supported = await Linking.canOpenURL(url);
  if(supported) {
    await Linking.openURL(url);
  } else {
    throw new Error('URL ' + url + ' cannot be opened');
  }
}

// Helper function to fetch something from the Telegram api.
export const fetchApi = async (method: string): Promise<any> => {
	const TELEGRAM_API_KEY : string = "5761953881:AAHskbztZWPSX4KBX0KnnBCYze_qepI2ekI";
  return fetch('https://api.telegram.org/bot' + TELEGRAM_API_KEY + '/' + method)
    .then(response => response.json())
    .then(json => {
      if(json.ok)
        return json.result;
      throw new Error(json.error_code + ' ' + json.description);
    });
}

// Prints information about the bot to the console.
export const logBotInfo = () => {
  fetchApi('getMe')
    .then(result => console.log(result))
    .catch(error => console.error(error));
}

// Uses the Telegram API to create a new sticker pack.
export const createStickerPack = async (stickerPack: StickerPack, sticker: Sticker): Promise<void> => {
  await fetchApi('createNewStickerSet?user_id=' + stickerPack.author + '&name=' + stickerPack.name + '_by_StickerestBot&title=' + stickerPack.title + '&png_sticker=' + sticker.url + '&emojis=' + sticker.emoji)
    .then(result => console.log(result))
    .catch(error => console.error(error));
}

// Uses the Telegram API to add a sticker to an existing pack.
// Users that already have that pack will need to add it again.
export const addStickerToPack = async (stickerPack: StickerPack, sticker: Sticker): Promise<void> => {
  await fetchApi('addStickerToSet?user_id=' + stickerPack.author + '&name=' + stickerPack.name + '_by_StickerestBot&png_sticker=' + sticker.url + '&emojis=' + sticker.emoji)
    .then(result => console.log(result))
    .catch(error => console.error(error));
}
