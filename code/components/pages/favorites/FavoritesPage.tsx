import { View, ScrollView, Text, Dimensions, ImageBackground, SafeAreaView } from 'react-native';

// import { useFonts } from 'expo-font';

// Favorites
import CarouselSticker from '../../subcomponents/stickers-carousel/CarouselSticker';
import {FlexibleAlbum} from '../../subcomponents/stickers-carousel/FlexibleAlbum';
import { ImagesAssets } from '../../../assets/ImagesAssets';
import React from 'react';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const imagesTemplate = [ 	// To be replaced with backend call
	ImagesAssets.computer.uri,
	ImagesAssets.computer.uri,
	ImagesAssets.computer.uri,
	ImagesAssets.computer.uri,
	ImagesAssets.computer.uri,
	ImagesAssets.computer.uri,
	ImagesAssets.computer.uri,
	
];

/*
<Text style={{fontSize: 25, alignContent: 'stretch', fontFamily: "popblack"}}>Favorites</Text>
*/

export default function Favorites() {
	return (
		<SafeAreaView style= {{backgroundColor: 'white', height: windowHeight}}>
			<View>
				<ImageBackground source={ImagesAssets.rectangleTop} resizeMode="stretch" style={{width: windowWidth, height: windowHeight/8}}/>
			</View>
			<View>
				<Text style= {{fontSize: 19, alignContent: 'stretch', fontFamily: "popblack", marginLeft: windowHeight/20}}>Recently added</Text>
				<CarouselSticker stickers={[]} type = 'small'/>
				<Text style= {{fontSize: 19, alignContent: 'stretch', fontFamily: "popblack", marginLeft: windowHeight/20}}>
					More that you liked
				</Text>
			</View>
			<View style={{height: windowHeight*0.525, alignContent: 'center'}}>                    
				<FlexibleAlbum images={imagesTemplate} addImages={false} addPress={function (): void {}} onPress={function (): void {} }/>
			</View>
			
		</SafeAreaView>
	);
}
