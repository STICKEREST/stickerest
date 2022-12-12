import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import { styles } from "../../assets/style/styleNavbar";

// This function defines the appearance of the tab navigator.
export default function Navbar({state, descriptors, navigation}) {
	return (
		<View style={navbarStyles.background}>
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
						<View style={navbarStyles.circleButton} key={index}>
							<TouchableOpacity onPress={navigate}>
								<Image source={route.params.icon} style={{alignSelf: "center"}} />
							</TouchableOpacity>
						</View>
					) : (
						<TouchableOpacity style={navbarStyles.expand} onPress={navigate} key={index}>
							<Image source={route.params.icon} style={{alignSelf: "center"}} />
						</TouchableOpacity>
					);
				})
			}
		</View>
	);
}

const navbarStyles = StyleSheet.create({
	background: {
		position: "absolute",
		bottom: 0,
		flexDirection: "row",
		backgroundColor: "#f5cb08",
		paddingBottom: 15,
		paddingTop: 10,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20
	},
	expand: {
		flexBasis: "auto",
		flexGrow: 1,
		flexShrink: 0
	},
	circleButton: {
		backgroundColor: "#f5cb08",
		paddingTop: 15,
		marginTop: -60,
		height: 90,
		width: 90,
		borderRadius: 90,
		shadowOffset: {
			width: 0,
			height: 2
		},
		elevation: 5
	}
});
