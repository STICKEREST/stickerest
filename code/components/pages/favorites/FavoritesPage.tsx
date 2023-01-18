import { View, ScrollView, Text, Dimensions, ImageBackground, SafeAreaView } from 'react-native';

// import { useFonts } from 'expo-font';

// Favorites
import CarouselSticker from '../../subcomponents/stickers-carousel/CarouselSticker';
import {FlexibleAlbum, FlexibleAlbumRedirect} from '../../subcomponents/stickers-carousel/FlexibleAlbum';
import { ImagesAssets } from '../../../assets/ImagesAssets';
import React, { useEffect, useState } from 'react';
import { Sticker, StickerImage } from '../../../core/types';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Favorites() {

	const [queriedStickers, setQueriedStickers] = useState<Sticker[]>([]);

	useEffect(() => {
		
		fetch("https://stickerest.herokuapp.com/auth/my-saved")
		.then((response) => response.json())
		.then((result) => setQueriedStickers(result));

	  } );

	return (
		<View style= {{backgroundColor: 'white', height: windowHeight}}>
			<View>
				<ImageBackground source={ImagesAssets.rectangleTop} resizeMode="stretch" style={{width: windowWidth, height: windowHeight/8}}/>
			</View>
			<View style={{paddingTop : 50}}>
				<Text style= {{fontSize: 29, alignContent: 'stretch', fontFamily: "popblack", marginLeft: windowHeight/20, marginBottom : 30}}>
					Favorites
				</Text>
			</View>
			<View style={{height: windowHeight*0.525, alignContent: 'center', marginLeft: windowHeight/22}}>                    
				<FlexibleAlbumRedirect 
					stickers={
						queriedStickers.map((image : Sticker, order : number) : StickerImage => 
             			({ID : image.ID, ordinal_order: order, image_file : image.logo}))} 
					/>
			</View>
			
		</View>
	);
}
