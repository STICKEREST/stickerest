import { View, ScrollView, Text, Dimensions, ImageBackground } from 'react-native';

import { styles } from './../../../assets/style/styleHomepage';

import SearchBar from '../../SearchBar';

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

const RecentlyAdded = () => {
    return (
        <View>
            <Text style={styles.header}>
                Recently
            </Text>
            <CarouselSticker />
        </View>
    )
}

export default function Favorites() {
	return (
		<View style= {{alignContent: 'center'}}>
			<View>
                <View>
                    <ImageBackground source={ImagesAssets.rectangleTop} resizeMode="stretch" style={{width: windowWidth, height: windowtHeight/8}}/>
                </View>
				<Text style={{fontSize: 25, alignContent: 'stretch', fontFamily: "popblack"}}>Favorites page</Text>
				<View style={[{}]}>
                    <RecentlyAdded/>
					<Text style={styles.header}>
						More that you liked
					</Text>
				</View>
                <View style={[{}]}>
                <View style={{height: windowtHeight*0.525, alignContent: 'center'}}>                    
                    <FlexibleAlbum images={imagesTemplate} addImages={false} onPress={function (): void {} }/>
                </View>
                </View>
			</View>
		</View>
	);
}
