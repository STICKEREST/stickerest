import { View, ScrollView, Text } from 'react-native';

import { styles } from './../../assets/style/styleHomepage';

import SearchBar from '../SearchBar';

import CarouselBigSticker from '../subcomponents/stickers-carousel/CarouselBigSticker';
import CarouselSticker from '../subcomponents/stickers-carousel/CarouselSticker';
import CarouselVertical from '../subcomponents/stickers-carousel/CarouselVertical';

export default function Homepage() {
	return (
		<View style={styles.container}>
            <Text style={{fontFamily: "popblack", fontSize: 25, paddingTop: 20, paddingBottom:5}}>Favorites page</Text>
			<View style={styles.innerContainer}>
				<ScrollView fadingEdgeLength={40} keyboardDismissMode={"on-drag"} showsVerticalScrollIndicator={false} overScrollMode={"never"} >
					<Text style={styles.header}>
						Recently
					</Text>
					<CarouselSticker />
				</ScrollView>
                <Text style={styles.header}>
						More that you liked
				</Text>
				<CarouselVertical/>
			</View>
		</View>
	);
}
