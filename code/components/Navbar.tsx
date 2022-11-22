import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import { ImagesAssets } from "../assets/ImagesAssets";
import {styles} from "../style";


// This function defines the appearance of the tab navigator.
export default function Navbar({state, descriptors, navigation}) {
	return (
		<View style={[navbarStyles.background, styles.flexRow]}>
			{
				state.routes.map((route, index) => {
					const buttons = state.routes.length;
					const middleButton = (buttons % 2 === 0 ? buttons : buttons - 1) / 2;
					const navigate = () => {
						navigation.navigate({
							name: route.name,
							merge: true
						});
					}
					return index === middleButton ? (
						<View style={[navbarStyles.circleButton, styles.shadow]} key={index}>
							<TouchableOpacity onPress={navigate}>
								<Image source={route.params.icon} style={styles.centered} />
							</TouchableOpacity>
						</View>
					) : (
						<TouchableOpacity style={styles.expand} onPress={navigate} key={index}>
							<Image source={route.params.icon} style={styles.centered} />
						</TouchableOpacity>
					);
				})
			}
		</View>
	);
}

const navbarStyles = StyleSheet.create({
	background: {
		backgroundColor: "#f5cb08",
		paddingBottom: 15,
		paddingTop: 10,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20
	},
	circleButton: {
		backgroundColor: "#f5cb08",
		paddingTop: 15,
		marginTop: -60,
		height: 90,
		width: 90,
		borderRadius: 90,
	}
});
