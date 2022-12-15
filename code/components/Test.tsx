import React, { useCallback } from "react";
import { Alert, Button, Linking, View } from "react-native";

//const API_TOKEN = '';

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

/*
const fetchAPI = () => {
	return fetch('https://api.telegram.org/botTOKEN/getMe').then((response) => response.json()).then((json) => {
		console.log(json)
	}).catch((error) => {
		console.error(error);
	});
};*/

export const Test = () => (
	<View style={{paddingTop: 300}}>
		<AddStickersButton packName="NekoHD" />
		<AddStickersButton packName="Kiritsu" />
		<AddStickersButton packName="Kurolily" />
		<AddStickersButton packName="thehuskies" />
	</View>
);
