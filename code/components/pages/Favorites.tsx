import { View, ScrollView, Text, Dimensions } from 'react-native';

import { styles } from './../../assets/style/styleHomepage';

import SearchBar from '../SearchBar';

import CarouselBigSticker from '../subcomponents/stickers-carousel/CarouselBigSticker';
import CarouselSticker from '../subcomponents/stickers-carousel/CarouselSticker';
import {FlexibleAlbum} from '../subcomponents/stickers-carousel/FlexibleAlbum';
import { SmallStickerPackBox } from '../subcomponents/SmallStickerPack';
import { ImagesAssets } from '../../assets/ImagesAssets';

const windowHeight = Dimensions.get('window').height;

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
];

export default function Homepage() {
	return (
		<View>
			<View style={[styles.container,  {height: windowHeight/2.2}]}>
				<Text style={{fontFamily: "popblack", fontSize: 25, paddingTop: 20, paddingBottom:5}}>Favorites page</Text>
				<View style={styles.innerContainer}>
					<Text style={styles.header}>
						Recently
					</Text>
					<CarouselSticker />
					<Text style={styles.header}>
						More that you liked
					</Text>
				</View>
			</View>
			<FlexibleAlbum images={imagesTemplate} addImages={false} onPress={function (): void {} }/>
		</View>
	);
}
