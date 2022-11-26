import { View, ScrollView, Text } from 'react-native';

import { styles } from './../../assets/style/styleHomepage';

import SearchBar from '../SearchBar';

export default function Homepage() {
	return (
		<View style={styles.container}>
			<SearchBar/>
			<View style={styles.innerContainer}>
				<ScrollView fadingEdgeLength={40} keyboardDismissMode={"on-drag"} showsVerticalScrollIndicator={false} overScrollMode={"never"} >
					<Text style={styles.header}>
						Recommended for you
					</Text>
					<Text style={styles.header}>
						Trending
					</Text>
					<Text style={styles.header}>
						New
					</Text>
					{
					    /*This only exists for testing purposes*/
						Array.from(Array(20).keys()).map(() => (
							<Text style={styles.header}>
								Header added for testing purposes
							</Text>
						))
					}
				</ScrollView>
			</View>
		</View>
	);
}
