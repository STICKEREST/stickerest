import { View, ScrollView, Text } from 'react-native';

import { styles } from './../../assets/style/styleHomepage';

import SearchBar from '../SearchBar';

import CarouselBigSticker from '../subcomponents/stickers-carousel/CarouselBigSticker';
import CarouselSticker from '../subcomponents/stickers-carousel/CarouselSticker';

import SingleSticker from './stickers/SingleSticker';

import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export const Homepage = () => (
	<Stack.Navigator screenOptions={{headerShown: false}} >
		<Stack.Screen name="Home" component={Home} />
		<Stack.Screen name="SingleSticker" component={SingleSticker} />
	</Stack.Navigator>
);

const Home = ({navigation}) => (
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
