import React, { useCallback, useState } from "react";
import { Alert, Button, Linking, View, TextInput } from "react-native";

// TODO: I tried to make this work using .env but kept getting 'undefined'
import { TelegramApiKey } from "../api_keys";

// Button that can add an existing sticker pack to your telegram given the name of the pack. See examples below.
// This does not use Telegram API, but needs the pack to be uploaded on telegram.
const AddStickersButton = ({packName}: {packName: string}) => {
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

const getBotInfo = () => {
	return fetch('https://api.telegram.org/bot' + TelegramApiKey + '/getMe')
		.then(response => response.json())
		.then(response => {
			if(response.ok)
				return response.result;
			throw new Error(response);
		});
};

interface Sticker {
	url: string,
	emoji: string
}

const createStickerPack = (name: string, title: string, sticker: Sticker) => {
	getBotInfo().then(botInfo => {
		fetch('https://api.telegram.org/bot' + TelegramApiKey + '/createNewStickerSet?user_id=' + botInfo.id + "&name=" + name + "&title=" + title + "&png_sticker=" + sticker.url + "&emojis=" + sticker.emoji)
			.then(response => response.json())
			.then(json => console.log(json))
			.catch(error => console.error(error));
	}).catch(error => console.error(error));
}

// This is just a test
export const Test = () => (
	<View>
		<View style={{paddingTop: 100}}>
			<AddStickersButton packName="NekoHD" />
			<AddStickersButton packName="Kiritsu" />
			<AddStickersButton packName="Kurolily" />
			<AddStickersButton packName="thehuskies" />
			<AddStickersButton packName="RedShibaInu" />
		</View>
		<View style={{paddingTop: 100}}>
			<Button title="Print bot info" onPress={() => getBotInfo().then(info => console.log(info)).catch(error => console.error(error))} />
		</View>
	</View>
);
