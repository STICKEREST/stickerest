import React, { useCallback, useState } from "react";
import { Alert, Button, Linking, View, TextInput } from "react-native";

import { TELEGRAM_API_KEY } from "@env";

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

// Button that can add an existing sticker pack to your Telegram given the name of the pack.
// After a sticker pack author has created the Telegram sticker pack,
// every user will be able to add it to their Telegram with this button.
// 'packName' is the name of the sticker pack.
// Packs created with the stickerest bot need to append "_by_StickerestBot" at the end of their name.
export const AddStickersButton = ({packName}: {packName: string}) => {
	const url = 'https://telegram.me/addstickers/' + packName;
	const onPress = useCallback(async() => {
		const supported = await Linking.canOpenURL(url);
		if(supported) {
			await Linking.openURL(url);
		} else {
			Alert.alert('URL cannot be opened');
		}
	}, [url]);
	return (
		<Button title={'Add pack ' + packName} onPress={onPress} />
	);
}

// Helper function to fetch something from the Telegram api.
export const fetchApi = (method: string) => {
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
export const createStickerPack = (stickerPack: StickerPack, sticker: Sticker) => {
	fetchApi('createNewStickerSet?user_id=' + stickerPack.author + '&name=' + stickerPack.name + '_by_StickerestBot&title=' + stickerPack.title + '&png_sticker=' + sticker.url + '&emojis=' + sticker.emoji)
		.then(result => console.log(result))
		.catch(error => console.error(error));
}

// Uses the Telegram API to add a sticker to an existing pack.
// Users that already have that pack will need to add it again.
export const addStickerToPack = (stickerPack: StickerPack, sticker: Sticker) => {
	fetchApi('addStickerToSet?user_id=' + stickerPack.author + '&name=' + stickerPack.name + '_by_StickerestBot&png_sticker=' + sticker.url + '&emojis=' + sticker.emoji)
		.then(result => console.log(result))
		.catch(error => console.error(error));
}

// Everything below this line is just a test

// TODO: Find a way to get the author's user id

const exampleStickerPack1: StickerPack = {
	author: 427889331,
	name: "example_one",
	title: "Stickerest Example 1"
}

const exampleStickerPack2: StickerPack = {
	author: 427889331,
	name: "ExampleTwo",
	title: "Stickerest Example 2"
}

const exampleSticker1: Sticker = {
	url: "https://raw.githubusercontent.com/STICKEREST/stickerest/telegram-api/code/test/example_sticker_1.png",
	emoji: "😀"
}

const exampleSticker2: Sticker = {
	url: "https://raw.githubusercontent.com/STICKEREST/stickerest/telegram-api/code/test/example_sticker_2.png",
	emoji: "😃"
}

const exampleSticker3: Sticker = {
	url: "https://raw.githubusercontent.com/STICKEREST/stickerest/telegram-api/code/test/example_sticker_3.png",
	emoji: "😄😂"
}

export const Test = () => (
	<View>
		<View style={{paddingTop: 100}}>
			<AddStickersButton packName="NekoHD" />
			<AddStickersButton packName="Kiritsu" />
			<AddStickersButton packName="Kurolily" />
			<AddStickersButton packName="thehuskies" />
			<AddStickersButton packName="RedShibaInu" />
			<AddStickersButton packName="example_one_by_StickerestBot" />
			<AddStickersButton packName="ExampleTwo_by_StickerestBot" />
		</View>
		<View style={{paddingTop: 100}}>
			<Button title="Print bot info" onPress={logBotInfo} />
		</View>
		<View style={{paddingTop: 50}}>
			<Button title="Create test" onPress={() => createStickerPack(exampleStickerPack2, exampleSticker1)} />
			<Button title="Add test" onPress={() => addStickerToPack(exampleStickerPack2, exampleSticker2)} />
			<Button title="Add test" onPress={() => addStickerToPack(exampleStickerPack2, exampleSticker3)} />
		</View>
	</View>
);