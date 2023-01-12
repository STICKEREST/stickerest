import { View, ScrollView, Text, Dimensions, ImageBackground, SafeAreaView } from 'react-native';

import { styles } from './../../../assets/style/styleHomepage';

import SearchBar from '../../SearchBar';

import { useFonts } from 'expo-font';

import CarouselBigSticker from '../../subcomponents/stickers-carousel/CarouselBigSticker';
import CarouselSticker from '../../subcomponents/stickers-carousel/CarouselSticker';
import {FlexibleAlbum} from '../../subcomponents/stickers-carousel/FlexibleAlbum';
import { SmallStickerPackBox } from '../../subcomponents/SmallStickerPack';
import { ImagesAssets } from '../../../assets/ImagesAssets';

const windowWidth = Dimensions.get('window').width;
const windowtHeight = Dimensions.get('window').height;

const imagesTemplate = [ 	// Will be replaced with backend call
   	ImagesAssets.computer,
	ImagesAssets.computer,
	ImagesAssets.computer,
	ImagesAssets.computer,
	ImagesAssets.computer,
	ImagesAssets.computer,
	ImagesAssets.computer,
	ImagesAssets.computer,
	ImagesAssets.computer,
	ImagesAssets.computer,
	ImagesAssets.computer,
	ImagesAssets.computer,
	ImagesAssets.computer,
	ImagesAssets.computer,
	ImagesAssets.computer,
];

/*
<Text style={{fontSize: 25, alignContent: 'stretch', fontFamily: "popblack"}}>Favorites</Text>
*/

export default function Favorites() {
	return (
		<SafeAreaView style= {{backgroundColor: 'white', height: windowtHeight}}>
			<View>
				<ImageBackground source={ImagesAssets.rectangleTop} resizeMode="stretch" style={{width: windowWidth, height: windowtHeight/8}}/>
			</View>
			<View>
				<Text style= {{fontSize: 19, alignContent: 'stretch', fontFamily: "popblack"}}>Recently added</Text>
				<CarouselSticker />
				<Text style= {{fontSize: 19, alignContent: 'stretch', fontFamily: "popblack"}}>
					More that you liked
				</Text>
			</View>
			<View style={{height: windowtHeight*0.525, alignContent: 'center'}}>                    
				<FlexibleAlbum images={imagesTemplate} addImages={false} addPress={function (): void {}} onPress={function (): void {} }/>
			</View>
			
		</SafeAreaView>
	);
}
