import { View, ScrollView, Text } from 'react-native';

import { styles } from './../../assets/style/styleHomepage';

import { SearchBar } from '../subcomponents/SearchBar';
import CarouselBigSticker from '../subcomponents/stickers-carousel/CarouselBigSticker';
import CarouselSticker from '../subcomponents/stickers-carousel/CarouselSticker';


// Homepage component. Used in TabNavigator.
export const Homepage = ({navigation}) => (
	<View style={styles.container}>
		<SearchBar/>
		<View style={styles.innerContainer}>
			<ScrollView fadingEdgeLength={40} keyboardDismissMode={"on-drag"} showsVerticalScrollIndicator={false} overScrollMode={"never"} >
				<Text style={styles.header}>
					Recommended for you
				</Text>
				<CarouselBigSticker onStickerPress={() => navigation.navigate("SingleSticker")} />
				<Text style={styles.header}>
					Trending
				</Text>
				<CarouselSticker onStickerPress={() => navigation.navigate("SingleSticker")} />
				<Text style={styles.header}>
					New
				</Text>
				<CarouselSticker onStickerPress={() => navigation.navigate("SingleSticker")} />
			</ScrollView>
		</View>
	</View>
);
