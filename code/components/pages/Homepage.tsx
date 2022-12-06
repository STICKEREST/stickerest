import { View, ScrollView, Text, Button } from 'react-native';

import { styles } from './../../assets/style/styleHomepage';

import SearchBar from '../SearchBar';

import CarouselBigSticker from '../subcomponents/stickers-carousel/CarouselBigSticker';
import CarouselSticker from '../subcomponents/stickers-carousel/CarouselSticker';

import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export const Homepage = () => (
	<Stack.Navigator>
		<Stack.Screen name="Home" component={Home} />
		<Stack.Screen name="Test" component={View} />
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
				<CarouselBigSticker />
				<Text style={styles.header}>
					Trending
				</Text>
				<CarouselSticker />
				<Text style={styles.header}>
					New
				</Text>
				<CarouselSticker />
				<Button title="Test" onPress={() => navigation.navigate("Test")} />
			</ScrollView>
		</View>
	</View>
);
