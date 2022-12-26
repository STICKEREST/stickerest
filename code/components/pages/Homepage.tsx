import { View, ScrollView, Text } from 'react-native';

import { styles } from './../../assets/style/styleHomepage';

import { SearchBar } from '../subcomponents/SearchBar';
import CarouselBigSticker from '../subcomponents/stickers-carousel/CarouselBigSticker';
import CarouselSticker from '../subcomponents/stickers-carousel/CarouselSticker';
import { useEffect } from 'react';

export default function Homepage() {

	useEffect(() => {
		
		fetch("https://stickerest.herokuapp.com/stickers/most-downloaded")
		.then((response) => response.json())

	  }, []);

	return (
		<View style={styles.container}>
			<SearchBar/>
			<View style={styles.innerContainer}>
				<ScrollView fadingEdgeLength={40} keyboardDismissMode={"on-drag"} showsVerticalScrollIndicator={false} overScrollMode={"never"} >
					<Text style={styles.header}>
						Recommended for you
					</Text>
					<CarouselBigSticker />
					<Text style={styles.header}>
						Trending
					</Text>
					<CarouselSticker />
					<Text style={styles.header}>
						New
					</Text>
					<CarouselSticker />
				</ScrollView>
			</View>
		</View>
	);
}
